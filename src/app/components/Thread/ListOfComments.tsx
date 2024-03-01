"use client";

import React from "react";
import { ThreadCommentsInterface } from "@/app/states/threads/slice";
// import { usePathname } from "next/navigation";
// import useReduxSelector from "@/app/hooks/useReduxSelector";
// import { useAppDispatch } from "@/app/states/hooks";
// import openModal from "@/app/states/postModal/thunk";
import ThreadComment from "./ThreadComment";

export default function ListOfComments({
  comments,
}: {
  comments: ThreadCommentsInterface[];
}) {
  // const { authUser } = useReduxSelector();
  // const dispatch = useAppDispatch();
  // const pathname = usePathname();
  // const id = pathname?.split("/").pop();
  return (
    <ul>
      {comments.length > 0 &&
        comments.map((comment: ThreadCommentsInterface) => (
          <li key={comment.id}>
            <ThreadComment
              id={comment.owner.id}
              avatar={comment.owner.avatar}
              name={comment.owner.name}
              content={comment.content}
              createdAt={comment.createdAt}
              upVotesBy={comment.upVotesBy}
              downVotesBy={comment.downVotesBy}
            />
          </li>
        ))}
    </ul>
  );
}
