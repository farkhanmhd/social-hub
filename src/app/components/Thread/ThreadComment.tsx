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
// import {
//   asyncLikeThread,
//   asyncDisLikeThread,
//   asyncNeutralizeThreadLike,
// } from "@/app/states/threads/thunk";
import { useAppDispatch } from "@/app/states/hooks";
import ThreadButton from "./ThreadButton";

export default function ThreadComment({
  avatar,
  name,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
}: ThreadCommentOwnerInterface & ThreadCommentsInterface) {
  const { authUser } = useReduxSelector();
  const dispatch = useAppDispatch();

  const onLikeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    // if (!threadItemProps.upVotesBy.includes(authUser.id)) {
    //   dispatch(
    //     asyncLikeThread({ threadId: threadItemProps.id, userId: authUser.id }),
    //   );
    // } else {
    //   dispatch(
    //     asyncNeutralizeThreadLike({
    //       threadId: threadItemProps.id,
    //       userId: authUser.id,
    //     }),
    //   );
    // }
  };
  const onDislikeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    // if (!threadItemProps.downVotesBy.includes(authUser.id)) {
    //   dispatch(
    //     asyncDisLikeThread({
    //       threadId: threadItemProps.id,
    //       userId: authUser.id,
    //     }),
    //   );
    // } else {
    //   dispatch(
    //     asyncNeutralizeThreadLike({
    //       threadId: threadItemProps.id,
    //       userId: authUser.id,
    //     }),
    //   );
    // }
  };
  return (
    <div className="comment-container grid border-t p-3 text-[15px]">
      <div className="thread-owner-photo -mt-14 mr-4 flex self-start md:mt-1">
        <div id="avatar-start-thread" className="w-[36px] ">
          <Image
            src={avatar}
            alt="profile"
            className="mx-auto w-full rounded-full object-cover"
            width={36}
            height={36}
          />
        </div>
      </div>
      <div className="thread-author flex items-center">
        <p className="font-semibold">{name}</p>
      </div>
      <div className="thread-posting-time flex items-center">
        <p className="text-[#ababab]">{getTimeDifference(createdAt)}</p>
      </div>
      <div className="thread-body">
        <div>{parse(content)}</div>
      </div>
      <div className="thread-interaction flex items-center gap-x-4">
        <div className="likes-interaction flex items-center">
          <ThreadButton onClick={onLikeHandler}>
            <IoHeartOutline />
          </ThreadButton>
          <span>{upVotesBy.length}</span>
        </div>
        <div className="dislikes-interaction flex items-center">
          <ThreadButton onClick={onDislikeHandler}>
            <IoHeartDislikeOutline />
          </ThreadButton>
          <span>{downVotesBy.length}</span>
        </div>
      </div>
    </div>
  );
}
