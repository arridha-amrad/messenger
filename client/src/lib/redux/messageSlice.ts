import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "./authSlice";

export type TMessageReaction = {
  id: number;
  value: string;
  users: [
    {
      id: number;
      username: string;
      imageURL: string | null;
    }
  ];
};

export type TMessage = {
  id: number;
  content: string;
  sentAt: Date;
  chat: {
    id: string;
    name: string | null;
    isGroup: boolean;
    createdAt: Date;
  };
  user: {
    id: number;
    username: string;
    imageURL: string | null;
  };
  readers: {
    id: number;
    username: string;
    email: string;
    imageURL: string | null;
    createdAt: Date;
  }[];
  reactions: TMessageReaction[];
};

export interface MessageState {
  messages: TMessage[];
  justReadMessageIds: number[];
}

const initialState: MessageState = {
  messages: [],
  justReadMessageIds: [],
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<TMessage[]>) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<TMessage>) => {
      state.messages.push(action.payload);
    },
    addJustReadMessageIds: (state, action: PayloadAction<number>) => {
      state.justReadMessageIds.push(action.payload);
    },
    resetJustReadMessageIds: (state) => {
      state.justReadMessageIds = [];
    },
    addReactionToMessage: (
      state,
      action: PayloadAction<{
        id: number;
        messageId: number;
        emoji: string;
        user: TUser;
      }>
    ) => {
      const { id, emoji, messageId, user } = action.payload;
      const message = state.messages.find((m) => m.id === messageId);
      if (!message) return;
      const reaction = message.reactions.find((r) => r.value === emoji);
      if (!reaction) {
        message.reactions.push({
          id,
          users: [user],
          value: emoji,
        });
      } else {
        const hasUserGiveSameReactionIndex = reaction.users.findIndex(
          (u) => u.id === user?.id
        );
        if (hasUserGiveSameReactionIndex >= 0) {
          reaction.users.splice(hasUserGiveSameReactionIndex, 1);
          // @ts-ignore
          if (reaction.users.length === 0) {
            message.reactions = [];
          }
        } else {
          reaction.users.push(user);
        }
      }
    },
  },
});

export const {
  addNewMessage,
  addReactionToMessage,
  setMessages,
  addJustReadMessageIds,
} = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
