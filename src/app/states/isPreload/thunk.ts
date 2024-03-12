import { AppDispatch } from "@/app/states/index";
import api from "@/app/api/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { setAuthUser } from "../authUser/slice";
import { setIsPreload } from "./slice";
import { asyncSetThread } from "../threads/thunk";

function asyncPreloadProcess() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (err) {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

export default asyncPreloadProcess;
