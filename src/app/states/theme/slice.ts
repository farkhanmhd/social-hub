import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "light";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice;
