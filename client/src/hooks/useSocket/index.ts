import { getAccessToken } from "@/lib/axios";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";

import { TUser } from "@/lib/redux/authSlice";
import { TSendMessage } from "@/validators/chat";
import SocketEmit from "./callback/emit.callback";
import SocketListeningCallback from "./callback/listening.callback";
import { TFetchMessageFromApi } from "@/api/chat.api";
import ReceiveSound from "@/assets/receive.mp3";
import { updateCurrChat } from "@/lib/redux/chatSlice";
import { addNewMessage } from "@/lib/redux/messageSlice";

const transformMessage = ({
  chatId,
  content,
  id,
  sentAt,
  user,
}: ReceiveMessage): TFetchMessageFromApi => ({
  chatId,
  content,
  id,
  sentAt,
  reactions: [],
  readers: [],
  user,
});

export type ReceiveMessage = {
  user: {
    id: number;
    username: string;
    imageURL: string | null;
  };
} & {
  content: string;
  chatId: number;
  sentAt: Date;
  id: number;
  userId: number;
};

type SocketEvent = {
  connect: () => void;
  "message:receive": (message: ReceiveMessage) => Promise<void>;
};

type SocketEmitEvent = {
  "user:add": (user: TUser) => void;
  "message:send": (message: TSendMessage) => void;
};

export type MySocket = Socket<SocketEvent, SocketEmitEvent>;

export const useSocket = () => {
  const dispatch = useDispatch();
  const cb = new SocketListeningCallback(dispatch);

  const accessToken = getAccessToken();

  const socketRef = useRef<MySocket | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    const socket: MySocket = io(`${import.meta.env.VITE_SERVER_URL}/user`, {
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
      autoConnect: true,
      auth: {
        token: accessToken, // Add authentication
      },
    });

    socketRef.current = socket;

    SocketEmit.init(socket);

    // Connection handlers
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
      if (err.message.includes("auth")) {
        // Handle token expiration
      }
    });

    const handleReceiveMessage = async (message: ReceiveMessage) => {
      console.log("received message : ", message);

      try {
        const audio = new Audio(ReceiveSound);
        await audio.play().catch((e) => console.warn("Audio play failed:", e));
        dispatch(addNewMessage(transformMessage(message)));
        dispatch(updateCurrChat(transformMessage(message)));
      } catch (err) {
        console.error("Message handling error:", err);
      }
    };

    socket.on("message:receive", handleReceiveMessage);

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return {
    socket: socketRef.current,
  };
};
