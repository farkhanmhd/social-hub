"use client";

import React from "react";
import Image from "next/image";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import parse from "html-react-parser";
import {
  IoHeart,
  IoHeartOutline,
  IoHeartDislikeOutline,
  IoHeartDislike,
} from "react-icons/io5";
import { getTimeDifference } from "@/app/utils/util";
import {
  ThreadCommentOwnerInterface,
  ThreadCommentsInterface,
} from "@/app/states/threads/slice";
import {
  asyncLikeComment,
  asyncDisLikeComment,
  asyncNeutralizeCommentLike,
} from "@/app/states/threads/thunk";
import { useAppDispatch } from "@/app/states/hooks";
import ThreadButton from "./ThreadButton";

export default function ThreadComment({
  avatar,
  name,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  id,
  threadId,
}: {
  id: string;
  avatar: string;
  name: string;
  content: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
  threadId: string;
}) {
  const { authUser } = useReduxSelector();
  const dispatch = useAppDispatch();

  const onLikeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!upVotesBy.includes(authUser.id)) {
      dispatch(asyncLikeComment(threadId, id, authUser.id));
    } else {
      dispatch(asyncNeutralizeCommentLike(threadId, id, authUser.id));
    }
  };
  const onDislikeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!downVotesBy.includes(authUser.id)) {
      dispatch(asyncDisLikeComment(threadId, id, authUser.id));
    } else {
      dispatch(asyncNeutralizeCommentLike(threadId, id, authUser.id));
    }
  };
  return (
    <div className="comment-container grid border-t p-3 text-[15px]" id={id}>
      <div className="comment-owner-photo mr-4 mt-1 flex self-start">
        <div id="avatar-start-comment" className="w-[36px] ">
          <Image
            src={avatar}
            alt="profile"
            className="mx-auto w-full rounded-full object-cover"
            width={36}
            height={36}
          />
        </div>
      </div>
      <div className="comment-author flex items-center">
        <p className="font-semibold">{name}</p>
      </div>
      <div className="comment-posting-time flex items-center">
        <p className="text-[#ababab]">{getTimeDifference(createdAt)}</p>
      </div>
      <div className="comment-body">
        <div>{parse(content)}</div>
      </div>
      <div className="comment-interaction flex items-center gap-x-4">
        <div className="likes-interaction flex items-center">
          <ThreadButton onClick={onLikeHandler}>
            {upVotesBy.includes(authUser.id) ? (
              <IoHeart className="text-red-500" />
            ) : (
              <IoHeartOutline />
            )}
          </ThreadButton>
          {upVotesBy.length > 0 && <span>{upVotesBy.length}</span>}
        </div>
        <div className="dislikes-interaction flex items-center">
          <ThreadButton onClick={onDislikeHandler}>
            {downVotesBy.includes(authUser.id) ? (
              <IoHeartDislike className="text-red-500" />
            ) : (
              <IoHeartDislikeOutline />
            )}
          </ThreadButton>
          {downVotesBy.length > 0 && <span>{downVotesBy.length}</span>}
        </div>
      </div>
    </div>
  );
}
