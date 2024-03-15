import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../api/api";
import { AppDispatch } from "..";
import { setProfile } from "./slice";

export default function asyncSetProfile(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    const profile = await api.getSingleUser({ id });
    dispatch(setProfile(profile));
    dispatch(hideLoading());
  };
}
