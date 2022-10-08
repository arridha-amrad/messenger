import { createSlice } from '@reduxjs/toolkit';

import { IMessage, IRoom, IUserChat } from './chat.types';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
interface ChatState {
  rooms: IRoom[];
  selectedRoom: IRoom | null;
}

const initialState: ChatState = {
  rooms: [],
  selectedRoom: null,
};

export const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addNewChat: (state, action: PayloadAction<IUserChat>) => {
      const data: IRoom = {
        user: action.payload,
      };
      state.rooms.splice(0, 0, data);
    },
    setChats: (state, action: PayloadAction<IRoom[]>) => {
      state.rooms = action.payload;
    },
    selectRoom: (state, action: PayloadAction<IRoom>) => {
      state.selectedRoom = action.payload;
    },
    // it will run when user send mesage without room id (room's first message)
    updateOneRoom: (state, action: PayloadAction<IMessage>) => {
      const index = state.rooms.findIndex(
        (room) => room.user.id === state.selectedRoom?.user.id
      );
      state.rooms[index].message = action.payload;
    },
  },
});

export const chatReducers = chatSlice.actions;

export const chatState = (state: RootState) => state.chat;

export default chatSlice.reducer;
