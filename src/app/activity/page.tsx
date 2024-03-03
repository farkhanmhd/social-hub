"use client";

import React from "react";
import useReduxSelector from "../hooks/useReduxSelector";
import ListOfThread from "../components/Thread/ListOfThread";

export default function ActivityPage() {
  const { authUser, threads } = useReduxSelector();
  return (
    <>
      <h1 className="mb-3 px-4 pt-4 text-2xl font-semibold md:px-0 md:text-3xl">{`${authUser?.name} Liked Threads`}</h1>
      <ListOfThread
        threads={threads.filter((thread) =>
          thread.upVotesBy.includes(authUser?.id),
        )}
      />
    </>
  );
}
