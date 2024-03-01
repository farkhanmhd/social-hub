import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserSlice from "./authUser/slice";
import isPreloadSlice from "./isPreload/slice";
import dropDownModeSlice from "./dropDownMode/slice";
import threadSlice from "./threads/slice";
import modalSlice from "./modal/slice";
import profileSlice from "./profile/slice";

const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    isPreload: isPreloadSlice,
    dropDownMode: dropDownModeSlice,
    loadingBar: loadingBarReducer,
    threads: threadSlice,
    modal: modalSlice,
    profile: profileSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
