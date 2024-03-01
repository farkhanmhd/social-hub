import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const initialState: User = {
  id: "",
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

export default authUserSlice;
