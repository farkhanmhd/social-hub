import { putAccessToken, login, getOwnProfile, register } from "@/app/api/api";
import { AppDispatch } from "@/app/states/index";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { setAuthUser } from "./slice";

function asyncSetAuthUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const token = await login({ email, password });
      putAccessToken(token);
      dispatch(setAuthUser({ email, password }));
      const authUser = await getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (err) {
      // gotta change this
      JSON.stringify(err);
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthUser(null));
    putAccessToken("");
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
  return async () => {
    try {
      const response = await register({ name, email, password });
      return { status: response.status, message: response.message };
    } catch (error) {
      return { status: "error", message: error };
    }
  };
}

export { asyncSetAuthUser, asyncUnsetAuthUser, asyncRegister };
