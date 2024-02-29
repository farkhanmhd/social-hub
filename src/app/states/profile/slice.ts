import { createSlice } from "@reduxjs/toolkit";
import { User } from "../authUser/slice";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  avatar: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => action.payload,
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
