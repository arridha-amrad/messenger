import { RootState } from '@app/store';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@hooks/useSocket/socket.types';
import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

const initialState: Socket<ServerToClientEvents, ClientToServerEvents> | null =
  null;

const socketSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export const socket = (state: RootState) => state.socket;

export default socketSlice.reducer;
