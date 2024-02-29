import { getSingleUser } from "@/app/api/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { AppDispatch } from "..";
import { setProfile } from "./slice";

export default function asyncSetProfile(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    const profile = await getSingleUser({ id });
    dispatch(setProfile(profile));
    dispatch(hideLoading());
  };
}
