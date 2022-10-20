import { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const setSocket = (currSocket: Socket) => (socket = currSocket);

export const getSocket = () => socket;
