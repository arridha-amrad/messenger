import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IRoom, IUserChat } from './chat.types';

interface CounterState {
  chats: IRoom[];
  selectedRoom: IRoom | null;
}

const initialState: CounterState = {
  chats: [],
  selectedRoom: null,
};

export const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNewChat: (state, action: PayloadAction<IUserChat>) => {
      const data: IRoom = {
        users: [action.payload],
      };
      state.chats.splice(0, 0, data);
    },
    setChats: (state, action: PayloadAction<IRoom[]>) => {
      state.chats = action.payload;
    },
    selectRoom: (state, action: PayloadAction<IRoom>) => {
      state.selectedRoom = action.payload;
    },
  },
});

export const { addNewChat, selectRoom, setChats } = chatSlice.actions;

export const chatState = (state: RootState) => state.chat;

export default chatSlice.reducer;
