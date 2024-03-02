import { createSlice } from "@reduxjs/toolkit";
import { User } from "../authUser/slice";

export interface LeaderboardInterface {
  user: User;
  score: number;
}

const initialState: LeaderboardInterface[] = [];

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    receiveLeaderboard: (state, action) => action.payload,
  },
});

export const { receiveLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice;
