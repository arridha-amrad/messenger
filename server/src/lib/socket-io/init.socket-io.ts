import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as SocketIOServer } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  MySocket,
  ServerToClientEvents,
  SocketData,
  SocketUser,
  StoredSocketUser,
} from "./types";
import { formatDistanceToNowStrict } from "date-fns";
import ChatService from "@/services/ChatService";
import { env } from "@/env";
import TokenService from "@/services/TokenService";
import UserService from "@/services/UserService";
import RedisRepository from "@/repositories/RedisRepo";
import { SendMessageInput } from "@/middleware/validator/sendMessage.validator";

let users: StoredSocketUser[] = [];

interface UserPresence {
  userId: number;
  socketId: string;
  lastActive: Date;
}

const addNewUserSocket = (data: StoredSocketUser): void => {
  const index = users.findIndex((user) => user.id === data.id);
  if (index >= 0) {
    users[index].socketId = data.socketId;
  } else {
    users.push(data);
  }
};

const getUserSocketIdByUserId = (userId: number) => {
  const user = users.find((u) => u.id === userId);
  return user?.socketId;
};

const removeUser = (socketId: string): void => {
  users = users.filter((user) => user.socketId !== socketId);
};

const registerChatEvent = async (socket: MySocket) => {
  const authUserId = socket.data.user.id;
  const redis = new RedisRepository();
  const chatService = new ChatService();

  socket.on("message:send", async (message: SendMessageInput) => {
    const newMessage = await chatService.storeMessage(message, authUserId);
    const receiverSocketIds: string[] = [socket.id];
    for (const id of message.receiverIds) {
      const userPresenceStr = await redis.findOne(`userId:${id}`);
      if (userPresenceStr) {
        const userPresence = JSON.parse(userPresenceStr) as UserPresence;
        receiverSocketIds.push(userPresence.socketId);
      }
    }
    console.log({ receiverSocketIds });

    socket.to(receiverSocketIds).emit("message:receive", newMessage);
  });
};

const registerPresenceEvent = async (socket: MySocket) => {
  const redis = new RedisRepository();
  const userId = socket.data.user.id;

  const userPresence: UserPresence = {
    userId,
    socketId: socket.id,
    lastActive: new Date(),
  };

  const heartbeatInterval = setInterval(() => {
    userPresence.lastActive = new Date();
    // Optional: Store in Redis for cross-server sync
    redis.createOne(`userId:${userId}`, JSON.stringify(userPresence));
  }, 30000); // 30 seconds

  socket.on("user:add", async (user) => {
    await redis.createOne(`userId:${userId}`, JSON.stringify(userPresence));
  });

  socket.on("disconnect", async () => {
    clearInterval(heartbeatInterval);
    await redis.deleteOne(`userId:${userId}`);
  });
};

export const initSocket = (
  httpServer: Server<typeof IncomingMessage, typeof ServerResponse>
): void => {
  //
  const io = new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: [env.CLIENT_ORIGIN, env.CLIENT_ORIGIN2],
      methods: ["GET", "POST"],
    },
    // Enable HTTP long-polling as fallback
    transports: ["websocket", "polling"],
    // Optional: Enable compression
    perMessageDeflate: {
      threshold: 1024, // Size threshold (bytes) for compression
      zlibDeflateOptions: {
        level: 3, // Compression level (1-9)
      },
    },
  });

  // Namespace for authenticated users
  const userIo = io.of("/user");

  // JWT Authentication Middleware
  userIo.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const tokenService = new TokenService();
    try {
      const { id } = tokenService.decodeAccessToken(token) as { id: number };
      socket.data.user = {
        id,
      };
      next();
    } catch (err: any) {
      console.log(err.message);
      next(new Error("Unauthorized"));
    }
  });

  userIo.on("connection", (socket) => {
    console.log(`User ${socket.data.user.id} connected`);
    registerChatEvent(socket);
    registerPresenceEvent(socket);
  });

  // io.on("connection", (socket) => {
  //   const chatService = new ChatService();

  //   socket.on("addUser", async (data: SocketUser) => {
  //     add({ ...data, socketId: socket.id });
  //     console.log({ users });
  //     const lastSeenRecord = await chatService.findLastSeenByUserId(
  //       data.userId
  //     );
  //     if (!lastSeenRecord) {
  //       await chatService.saveLastSeen(data.userId, new Date());
  //     } else {
  //       await chatService.updateLastSeen(lastSeenRecord.id, new Date());
  //     }
  //   });

  //   /**
  //    * To show user's last seen (like whatsapp)
  //    * if group chat show nothing
  //    * if not group chat, show lastSeen or empty string(user signup but doesn't user the app yet)
  //    */
  //   socket.on("setChat", async (receiverIds, senderId, isGroup) => {
  //     console.log({ receiverIds, senderId });
  //     const toSocketIds = findSocketId(receiverIds);
  //     const sender = findSocketId([senderId]);
  //     if (sender.length === 0) return;
  //     if (isGroup) return;

  //     if (toSocketIds.length > 0) {
  //       io.to(sender).emit("checkIsOlineOrLastSeen", "online");
  //     } else {
  //       const lastSeen = await chatService.findLastSeenByUserId(receiverIds[0]);
  //       const lastSeenAt = lastSeen
  //         ? formatDistanceToNowStrict(lastSeen.lastSeenAt, {
  //             addSuffix: true,
  //           })
  //         : "";
  //       io.to(sender).emit("checkIsOlineOrLastSeen", lastSeenAt);
  //     }
  //   });

  //   socket.on("sendMessage", async (receiverIds, message) => {
  //     const toSocketIds = findSocketId(receiverIds);
  //     if (toSocketIds.length > 0) {
  //       io.to(toSocketIds).emit("receiveMessage", message);
  //     }
  //   });

  //   socket.on("typing", (receiverIds) => {
  //     const toSocketIds = findSocketId(receiverIds);
  //     if (toSocketIds.length > 0) {
  //       io.to(toSocketIds).emit("typingAlert", true);
  //     }
  //   });

  //   socket.on("noTyping", (receiverIds) => {
  //     const toSocketIds = findSocketId(receiverIds);
  //     if (toSocketIds.length > 0) {
  //       io.to(toSocketIds).emit("typingAlert", false);
  //     }
  //   });

  //   socket.on("disconnect", async () => {
  //     const user = users.find((u) => u.socketId === socket.id);
  //     if (user) {
  //       await chatService.updateLastSeen(user.userId, new Date());
  //     }
  //     removeUser(socket.id);
  //     console.log("One user disconnect. After removing user", { users });
  //   });
  // });
};
