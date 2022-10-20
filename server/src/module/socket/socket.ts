import { config } from '@utils/config';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import {
  ClientToServerEvents,
  InterServerEvents,
  ISendMessage,
  ServerToClientEvents,
  SocketData,
  SocketUser,
  StoredSocketUser,
} from './socket.types';

let users: StoredSocketUser[] = [];

const add = (data: StoredSocketUser): void => {
  const index = users.findIndex((user) => user.userId === data.userId);

  console.log(index);

  if (index >= 0) {
    users.splice(index, 1, data);
  } else {
    users.push(data);
  }
};

const findSocketId = (userId: string): string | undefined => {
  return users.find((user) => user.userId === userId)?.socketId;
};

const removeUser = (socketId: string): void => {
  const remainingUser = users.filter((user) => user.socketId !== socketId);
  users = remainingUser;
};

export const initSocket = (
  httpServer: Server<typeof IncomingMessage, typeof ServerResponse>
): void => {
  const io = new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      credentials: true,
      origin: config.CLIENT_ORIGIN,
    },
  });

  io.on('connection', (socket) => {
    socket.on('addUser', (data: SocketUser) => {
      add({ ...data, socketId: socket.id });
      console.log(users);
    });
    socket.on('sendMessage', (data: ISendMessage) => {
      console.log('sent mesage : ', data);
      const toSocketId = findSocketId(data.toId);
      if (toSocketId !== undefined) {
        console.log('sending to : ', toSocketId);
        io.to(toSocketId).emit('receiveMessage', data.message);
      }
    });
    socket.on('disconnect', () => {
      removeUser(socket.id);
      console.log('user disconnected : ', users);
    });
  });
};
