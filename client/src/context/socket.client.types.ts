import { IMessage, IUserChat } from "@/features/chats/chat.types";

export interface ServerToClientEvents {
  noArg: () => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  receiveMessage: (data: ReceiveMessage) => void;
  typingAlert: (data: Typing) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  addUser: (data: SocketUser) => void;
  sendMessage: (data: SendMessage) => void;
  typing: (data: Typing) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface Typing {
  toId: string;
  roomId: string;
  isTyping: boolean;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface SocketUser {
  username: string;
  userId: string;
}

export interface SendMessage {
  message: IMessage;
  toId: string;
  sender: Sender;
}

export type ReceiveMessage = Omit<SendMessage, "toId">;

export type Sender = IUserChat;

export type StoredSocketUser = SocketUser & { socketId: string };
