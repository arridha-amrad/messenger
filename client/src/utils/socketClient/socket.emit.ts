import { MySocket } from '@context/SocketContext';
import { IMessage, IUserChat } from '@features/chats/chat.types';

export const socketEmitSendMessage = (socket: MySocket, message: IMessage, sender: IUserChat, toUserId: string) => {
    socket?.emit('sendMessage', {
        message,
        sender: sender,
        toId: toUserId,
    });
};

export const socketEmitTyping = (socket: MySocket, toId: string, roomId: string) => {
    socket?.emit('typing', { roomId, toId });
};
