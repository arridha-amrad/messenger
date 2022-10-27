import { IMessage } from '@features/chats/chat.types';
import { IUser } from '@features/user/user.types';

export interface ServerToClientEvents {
    noArg: () => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    receiveMessage: (data: ReceiveMessage) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
    addUser: (data: SocketUser) => void;
    sendMessage: (data: SendMessage) => void;
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

export interface SendMessage {
    message: IMessage;
    toId: string;
    sender: Sender;
}

export type ReceiveMessage = Omit<SendMessage, 'toId'>;

export type Sender = Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>;

export type StoredSocketUser = SocketUser & { socketId: string };
