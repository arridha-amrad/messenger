import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TSearchUserResultFromApi } from "@/api/user.api";
import { TMessage } from "./messageSlice";

export type TInitNewChat = {
  id: string;
  users: TSearchUserResultFromApi[];
  isGroup: boolean;
  name: string | null;
};

type TChatUser = {
  id: number;
  username: string;
  imageURL: string | null;
};

type TChatMessage = {
  id: number;
  content: string | null;
  sentAt: Date | null;
  user: TChatUser | null;
};

export type TChat = {
  id: string;
  name: string | null;
  isGroup: boolean;
  participants: TChatUser[];
  message: TChatMessage | null;
};

export interface ChatState {
  chats: TChat[];
  currChat: TChat | null;
}

export const transformInitNewChatToChat = ({
  id,
  isGroup,
  users,
  name,
}: TInitNewChat): TChat => {
  return {
    id,
    name,
    isGroup,
    message: null,
    participants: users,
  };
};

const initialState: ChatState = {
  chats: [],
  currChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrChat: (state, action: PayloadAction<TChat>) => {
      state.currChat = action.payload;
    },
    setChats: (state, action: PayloadAction<TChat[]>) => {
      state.chats = action.payload.sort(
        (a, b) =>
          new Date(b.message?.sentAt ?? new Date()).getTime() -
          new Date(a.message?.sentAt ?? new Date()).getTime()
      );
    },
    initNewChat: (state, action: PayloadAction<TInitNewChat>) => {
      const newChat = transformInitNewChatToChat(action.payload);
      state.chats.unshift(newChat);
      state.currChat = newChat;
    },
    updateCurrChat: (state, action: PayloadAction<TMessage>) => {
      const {
        id,
        sentAt,
        chat: { id: chatId },
        content,
        user,
      } = action.payload;
      const idx = state.chats.findIndex((c) => c.id === chatId);
      if (idx < 0) return;
      const currChat = state.chats[idx];
      currChat.id = chatId;
      currChat.message = {
        id,
        sentAt,
        content,
        user,
      };
      state.chats.splice(idx, 1);
      state.chats.unshift(currChat);
    },
  },
});

export const { setChats, setCurrChat, updateCurrChat, initNewChat } =
  chatSlice.actions;

export const chatReducer = chatSlice.reducer;
