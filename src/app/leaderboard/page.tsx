"use client";

import React, { useEffect } from "react";
import useReduxSelector from "../hooks/useReduxSelector";
import ListOfProfileWithScore from "../components/Profile/ListOfProfileWithScore";
import asyncReceiveLeaderboard from "../states/leaderboard/thunk";
import { useAppDispatch } from "../states/hooks";

export default function LeaderboardPage() {
  const { leaderboard, language } = useReduxSelector();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);
  return (
    <div>
      <h1 className="mb-5 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text p-1 pt-5 text-center text-4xl font-semibold text-transparent">
        {language === "id" ? "Top 10 Pengguna SocialHub" : "Top 10 SocialHub Users"}
      </h1>
      <div className="flex justify-between px-3 font-semibold">
        <h1 className="ml-[87px]">{language === "id" ? "Nama" : "Name"}</h1>
        <h1 className="mr-5">Score</h1>
      </div>
      <ListOfProfileWithScore leaderboard={leaderboard} />
    </div>
  );
}
