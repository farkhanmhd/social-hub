"use client";

import React, { useEffect } from "react";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncSetThread } from "@/app/states/threads/thunk";
import { ThreadInterface } from "@/app/states/threads/slice";
import Thread from "./Thread";

export default function ListOfThread() {
  const { threads }: { threads: ThreadInterface[] } = useReduxSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSetThread());

    // const intervalID = setInterval(() => {
    //   dispatch(asyncSetThread());
    // }, 10000);

    // return () => clearInterval(intervalID);
  }, [dispatch]);

  return (
    <ul>
      {threads.map((thread: ThreadInterface) => (
        <Thread
          key={thread.id}
          id={thread.id}
          title={thread.title}
          body={thread.body}
          category={thread.category}
          createdAt={thread.createdAt}
          ownerId={thread.ownerId}
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          totalComments={thread.totalComments}
          ownerName={thread.ownerName}
          ownerProfilePicture={thread.ownerProfilePicture}
        />
      ))}
    </ul>
  );
}
