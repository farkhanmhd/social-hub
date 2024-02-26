import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "main";

const dropDownModeSlice = createSlice({
  name: "dropDownMode",
  initialState,
  reducers: {
    setDropDownMode: (state, action) => action.payload,
  },
});

export const { setDropDownMode } = dropDownModeSlice.actions;

export default dropDownModeSlice.reducer;
