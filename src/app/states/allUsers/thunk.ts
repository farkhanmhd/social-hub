import api from "@/app/api/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { setAllUsers } from "./slice";

export default function asyncReceiveAllUsers() {
  return async (dispatch: any) => {
    dispatch(showLoading());
    const users = await api.getAllUsers();
    dispatch(setAllUsers(users));
    dispatch(hideLoading());
  };
}
