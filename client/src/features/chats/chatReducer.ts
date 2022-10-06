import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IChat, ISearchUser } from './chat.types';

interface CounterState {
  chats: IChat[];
}

const initialState: CounterState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNewChat: (state, action: PayloadAction<ISearchUser>) => {
      const { imageURL, username } = action.payload;
      const data: IChat = {
        imageURL,
        username,
      };
      state.chats.splice(0, 0, data);
    },
  },
});

export const { addNewChat } = chatSlice.actions;

export const chatState = (state: RootState) => state.chat;

export default chatSlice.reducer;
