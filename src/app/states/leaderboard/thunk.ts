import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "@/app/api/api";
import { AppDispatch } from "..";
import { receiveLeaderboard } from "./slice";

export default function asyncReceiveLeaderboard() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const leaderboard = await api.getLeaderBoards();
      if (leaderboard) {
        dispatch(receiveLeaderboard(leaderboard));
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(receiveLeaderboard([]));
    }
    dispatch(hideLoading());
  };
}
