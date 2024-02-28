import { AppDispatch } from "@/app/states/index";
import { getOwnProfile } from "@/app/api/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { setAuthUser } from "../authUser/slice";
import { setIsPreload } from "./slice";

function asyncPreloadProcess() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (err) {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
    dispatch(hideLoading());
  };
}

export default asyncPreloadProcess;
