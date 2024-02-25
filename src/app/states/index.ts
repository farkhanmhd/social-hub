import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./authUser/slice";
import isPreloadSlice from "./isPreload/slice";

const store = configureStore({
  reducer: {
    authUser: authUserSlice,
    isPreload: isPreloadSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
