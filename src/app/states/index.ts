import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserSlice from "./authUser/slice";
import isPreloadSlice from "./isPreload/slice";
import dropDownModeSlice from "./dropDownMode/slice";
import threadSlice from "./threads/slice";
import modalSlice from "./modal/slice";
import profileSlice from "./profile/slice";
import commentModalStateSlice from "./commentStates/slice";

const store = configureStore({
  reducer: {
    authUser: authUserSlice.reducer,
    isPreload: isPreloadSlice.reducer,
    dropDownMode: dropDownModeSlice.reducer,
    loadingBar: loadingBarReducer,
    threads: threadSlice.reducer,
    modal: modalSlice.reducer,
    profile: profileSlice.reducer,
    commentModalState: commentModalStateSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
