"use client";

import React from "react";
import { ThreadInterface } from "@/app/states/threads/slice";
import Thread from "./Thread";

export default function ListOfThread({
  threads,
}: {
  threads: ThreadInterface[];
}) {
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
