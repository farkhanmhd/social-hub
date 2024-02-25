import { putAccessToken, login, getOwnProfile } from "@/app/utils/api";
import { AppDispatch } from "@/app/states/index";
import { setAuthUser } from "./slice";

function asyncSetAuthUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return async (dispatch: AppDispatch) => {
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
  };
}

function asyncUnsetAuthUser() {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthUser(null));
    putAccessToken("");
  };
}

export { asyncSetAuthUser, asyncUnsetAuthUser };
