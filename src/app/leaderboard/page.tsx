"use client";

import React, { useEffect } from "react";
import useReduxSelector from "../hooks/useReduxSelector";
import ListOfProfileWithScore from "../components/Profile/ListOfProfileWithScore";
import asyncReceiveLeaderboard from "../states/leaderboard/thunk";
import { useAppDispatch } from "../states/hooks";

export default function LeaderboardPage() {
  const { leaderboard } = useReduxSelector();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);
  return (
    <div>
      <h1 className="mb-5 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text pt-5 text-center text-4xl font-semibold text-transparent">
        Top 10 SocialHub Users
      </h1>
      <ListOfProfileWithScore leaderboard={leaderboard} />
    </div>
  );
}
