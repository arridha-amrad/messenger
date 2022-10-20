import { Message } from '@prisma/client';

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  receiveMessage: (data: Message) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  addUser: (data: SocketUser) => void;
  sendMessage: (data: ISendMessage) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface SocketUser {
  username: string;
  userId: string;
}

export interface ISendMessage {
  message: Message;
  toId: string;
}

export type StoredSocketUser = SocketUser & { socketId: string };
