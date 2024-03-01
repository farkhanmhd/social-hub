"use client";

import React from "react";
import { ThreadCommentsInterface } from "@/app/states/threads/slice";
import ThreadComment from "./ThreadComment";

export default function ListOfComments({
  comments,
  threadId,
}: {
  comments: ThreadCommentsInterface[];
  threadId: string;
}) {
  return (
    <ul>
      {comments.length > 0 &&
        comments.map((comment: ThreadCommentsInterface) => (
          <li key={comment.id}>
            <ThreadComment
              id={comment.id}
              avatar={comment.owner.avatar}
              name={comment.owner.name}
              content={comment.content}
              createdAt={comment.createdAt}
              upVotesBy={comment.upVotesBy}
              downVotesBy={comment.downVotesBy}
              threadId={threadId}
            />
          </li>
        ))}
    </ul>
  );
}
