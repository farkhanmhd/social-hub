import { createSlice } from "@reduxjs/toolkit";

const intialState: boolean = false;

const postModalSlice = createSlice({
  name: "postModal",
  initialState: intialState,
  reducers: {
    setPostModal: (state, action) => action.payload,
  },
});

export const { setPostModal } = postModalSlice.actions;

export default postModalSlice.reducer;
