import { createSlice } from "@reduxjs/toolkit";
import { User } from "../authUser/slice";

const iniitialState: User[] = [];

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: iniitialState,
  reducers: {
    setAllUsers: (state, action) => action.payload,
  },
});

export const { setAllUsers } = allUsersSlice.actions;

export default allUsersSlice;
