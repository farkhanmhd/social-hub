import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../api/api";
import { AppDispatch } from "../index";
import { setAuthUser } from "./slice";

function asyncSetAuthUser({ email, password }: { email: string; password: string }) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      dispatch(setAuthUser({ email, password }));
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
      dispatch(hideLoading());
      return { status: "success", message: "Login success" };
    } catch (error) {
      dispatch(setAuthUser(null));
      dispatch(hideLoading());
      return { status: "error", message: error };
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthUser(null));
    api.putAccessToken("");
  };
}

function asyncRegister({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.register({ name, email, password });
      dispatch(hideLoading());
      return { status: response.status, message: response.message };
    } catch (error) {
      dispatch(hideLoading());
      return { status: "error", message: error };
    }
  };
}

export { asyncSetAuthUser, asyncUnsetAuthUser, asyncRegister };
