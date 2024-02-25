import { AppDispatch } from "@/app/states/index";
import { getOwnProfile } from "@/app/utils/api";
import { setAuthUser } from "../authUser/slice";
import { setIsPreload } from "./slice";

function asyncPreloadProcess() {
  return async (dispatch: AppDispatch) => {
    try {
      const authUser = await getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (err) {
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
  };
}

export default asyncPreloadProcess;
