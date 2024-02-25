import { createSlice } from "@reduxjs/toolkit";

const initialState: object | null = null;

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action) => action.payload,
  },
});

export const { setAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
