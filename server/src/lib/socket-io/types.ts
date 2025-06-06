import { SendMessageInput } from "@/middleware/validator/sendMessage.validator";
import ChatService from "@/services/ChatService";
import { Prisma } from "@prisma/client";
import { Socket } from "socket.io";

type ReceiveMessage = Awaited<
  ReturnType<typeof ChatService.prototype.storeMessage>
>;

export type MySocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export interface ServerToClientEvents {
  checkIsOlineOrLastSeen: (data: string) => void;
  typingAlert: (data: boolean) => void;
  "message:receive": (message: ReceiveMessage) => void;
}

type TMessageSend = {
  content: string;
  chatId: number | null;
  receiverIds: number[];
};
export interface ClientToServerEvents {
  "message:send": (message: SendMessageInput) => void;
  hello: () => void;
  "user:add": (
    chats: {
      isGroup: boolean;
      id: string;
      name: string | null;
    }[]
  ) => void;
  setChat: (receiverIds: number[], senderId: number, isGroup: boolean) => void;
  typing: (receiverIds: number[], senderId: number) => void;
  noTyping: (receiverIds: number[], senderId: number) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface Typing {
  toId: string;
  roomId: string;
}

export interface SocketData {
  user: {
    id: number;
  };
}

export interface SocketUser {
  username: string;
  id: number;
}

export type StoredSocketUser = SocketUser & { socketId: string };
