import { createSlice } from "@reduxjs/toolkit";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const initialState: AuthUser = {
  id: 0,
  name: "",
  email: "",
  avatar: "",
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action) => action.payload,
  },
});

export const { setAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
