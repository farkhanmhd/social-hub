"use client";

import React from "react";
import useReduxSelector from "../hooks/useReduxSelector";
import ListOfThread from "../components/Thread/ListOfThread";

export default function ActivityPage() {
  const { authUser, threads } = useReduxSelector();
  return (
    <>
      <h1 className="mb-3 pt-4 text-3xl font-semibold">{`${authUser?.name} Liked Posts`}</h1>
      <ListOfThread
        threads={threads.filter((thread) =>
          thread.upVotesBy.includes(authUser?.id),
        )}
      />
    </>
  );
}
