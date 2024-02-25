import { createSlice } from "@reduxjs/toolkit";

const intialState: boolean = true;

const isPreloadSlice = createSlice({
  name: "isPreload",
  initialState: intialState,
  reducers: {
    setIsPreload: (state, action) => action.payload,
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export default isPreloadSlice.reducer;
