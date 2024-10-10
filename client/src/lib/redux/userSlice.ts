import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  createdAt: Date;
  email: string;
  id: string;
  imageURL: string;
  updatedAt: Date;
  username: string;
};

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
