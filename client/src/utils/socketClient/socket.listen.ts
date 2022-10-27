import { invalidateRoomMessages } from '@app/caches/chatCacheInvalidate';
import { addNewMessageToRoomCache, setRoomIsTyping, updateRoomCache } from '@app/caches/chatUpdate';
import { TAppDispatch } from '@app/hooks';
import { MySocket } from '@context/SocketContext';
import ReceiveMp3 from '@assets/receive.mp3';
import SendMp3 from '@assets/send.mp3';

export const socketListenReceiveMessage = (socket: MySocket, dispatch: TAppDispatch, roomId: string) => {
    socket?.on('receiveMessage', async ({ message, sender }) => {
        updateRoomCache(dispatch, message, sender);
        if (parseInt(roomId) === message.roomId) {
            addNewMessageToRoomCache(dispatch, roomId, message);
            await new Audio(SendMp3).play();
        } else {
            invalidateRoomMessages(dispatch, message.roomId);
            await new Audio(ReceiveMp3).play();
        }
    });
};

export const socketListenTypingAlert = (socket: MySocket, dispatch: TAppDispatch, body: string) => {
    socket?.on('typingAlert', (data) => {
        setRoomIsTyping(dispatch, data, body);
    });
};
