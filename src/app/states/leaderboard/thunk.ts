import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getLeaderBoards } from "@/app/api/api";
import { AppDispatch } from "..";
import { receiveLeaderboard } from "./slice";

export default function asyncReceiveLeaderboard() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const leaderboard = await getLeaderBoards();
      if (leaderboard) {
        dispatch(receiveLeaderboard(leaderboard));
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(receiveLeaderboard([]));
      dispatch(hideLoading());
    }
  };
}
