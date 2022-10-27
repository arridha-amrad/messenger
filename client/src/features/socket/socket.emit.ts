import { IUser } from '@features/user/user.types';
import { getSocket } from '@utils/socket';

const socket = getSocket();

export const socketEmitAddUser = (user: IUser) => {
  socket?.emit('addUser', {
    userId: user.id,
    username: user.username,
  });
};
