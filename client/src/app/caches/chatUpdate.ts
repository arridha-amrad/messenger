import { TAppDispatch } from '@app/hooks';
import { IMessage, IRoom, IUserChat } from '@features/chats/chat.types';
import { chatApiSlice } from '@features/chats/chatApiSlice';

export const updateTotalUnreadMessagesToZero = (dispatch: TAppDispatch, data: IMessage) => {
    dispatch(
        chatApiSlice.util.updateQueryData('getRooms', undefined, (rooms) => {
            const idx = rooms.findIndex((r) => r.id === data.roomId);
            if (idx >= 0) {
                rooms[idx].sum = 0;
            }
        })
    );
};

export const updateRoomCache = (dispatch: TAppDispatch, message: IMessage, sender: IUserChat) => {
    dispatch(
        chatApiSlice.util.updateQueryData('getRooms', undefined, (rooms) => {
            const idx = rooms.findIndex((r) => r.id === message.roomId);
            if (idx >= 0) {
                rooms[idx].message = message;
                rooms[idx].sum += 1;
            } else {
                rooms.splice(0, 0, {
                    sum: 1,
                    user: sender,
                    createdAt: message.createdAt,
                    id: message.roomId,
                    message,
                    isGroup: false,
                    updatedAt: message.updatedAt,
                });
            }
        })
    );
};

export const addNewMessageToRoomCache = (dispatch: TAppDispatch, roomId: string, message: IMessage) => {
    dispatch(
        chatApiSlice.util.updateQueryData('getMessages', roomId, (messages) => {
            messages.push(message);
        })
    );
};

export const setRoomIsTyping = (dispatch: TAppDispatch, roomId: string) => {
    dispatch(
        chatApiSlice.util.updateQueryData('getRooms', undefined, (rooms) => {
            const room = rooms.find((room) => room.id === parseInt(roomId));
            if (room && room.message) {
                room.message.body = 'typing...';
            }
        })
    );
};
