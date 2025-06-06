import { getAccessToken } from "@/lib/axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import ReceiveSound from "@/assets/receive.mp3";
import { TChat, updateCurrChat } from "@/lib/redux/chatSlice";
import { addNewMessage, TMessage } from "@/lib/redux/messageSlice";
import { TSendMessage } from "@/validators/chat";
import SocketEmit from "./callback/emit.callback";
import SocketListeningCallback from "./callback/listening.callback";
import { RootState } from "@/lib/redux/store";

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
  "message:receive": (message: TMessage) => Promise<void>;
};

export type TSocketAddUser = Pick<TChat, "id" | "isGroup" | "name">;
type SocketEmitEvent = {
  "user:add": (user: TSocketAddUser[]) => void;
  "message:send": (message: TSendMessage) => void;
};

export type MySocket = Socket<SocketEvent, SocketEmitEvent>;

export const useSocket = () => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const cb = new SocketListeningCallback(dispatch);

  const accessToken = getAccessToken();

  const socketRef = useRef<MySocket | null>(null);

  useEffect(() => {
    if (!accessToken || !authUser) return;
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

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    const handleReceiveMessage = async (message: TMessage) => {
      console.log("received message : ", message);
      try {
        const audio = new Audio(ReceiveSound);
        if (message.user.id !== authUser.id) {
          await audio
            .play()
            .catch((e) => console.warn("Audio play failed:", e));
        }
        dispatch(addNewMessage(message));
        dispatch(updateCurrChat(message));
      } catch (err) {
        console.error("Message handling error:", err);
      }
    };

    socket.on("message:receive", handleReceiveMessage);

    return () => {
      socket.disconnect();
    };
  }, [dispatch, authUser]);

  return {
    socket: socketRef.current,
  };
};
