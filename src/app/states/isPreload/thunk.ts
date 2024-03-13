import { AppDispatch } from "@/app/states/index";
import api from "../../api/api";
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
    } catch (error) {
      dispatch(setAuthUser(null));
      throw new Error("Failed to get profile data: " + error);
    } finally {
      dispatch(setIsPreload(false));
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

export default asyncPreloadProcess;
