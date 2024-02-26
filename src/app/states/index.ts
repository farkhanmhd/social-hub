import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserSlice from "./authUser/slice";
import isPreloadSlice from "./isPreload/slice";
import dropDownModeSlice from "./dropDownMode/slice";

const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    isPreload: isPreloadSlice,
    dropDownMode: dropDownModeSlice,
    loadingBar: loadingBarReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
