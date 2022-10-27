import { TAppDispatch } from '@app/hooks';
import { chatApiSlice } from '@features/chats/chatApiSlice';

export const invalidateRoomMessages = (dispatch: TAppDispatch, roomId: number) => {
    dispatch(chatApiSlice.util.invalidateTags([{ type: 'Messages', id: roomId }]));
};
