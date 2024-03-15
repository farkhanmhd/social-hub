import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../api/api";
import { setAllUsers } from "./slice";

export default function asyncReceiveAllUsers() {
  return async (dispatch: any) => {
    dispatch(showLoading());
    const users = await api.getAllUsers();
    dispatch(setAllUsers(users));
    dispatch(hideLoading());
  };
}
