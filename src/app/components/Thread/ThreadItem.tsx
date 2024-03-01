"use client";

import React from "react";
import Image from "next/image";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import parse from "html-react-parser";
import {
  IoHeart,
  IoHeartOutline,
  IoHeartDislikeOutline,
  IoChatbubbleOutline,
  IoHeartDislike,
} from "react-icons/io5";
import { getTimeDifference } from "@/app/utils/util";
import { ThreadInterface } from "@/app/states/threads/slice";
import {
  asyncLikeThread,
  asyncDisLikeThread,
  asyncNeutralizeThreadLike,
} from "@/app/states/threads/thunk";
import { useAppDispatch } from "@/app/states/hooks";
import { setCommentModal } from "@/app/states/modal/slice";
import ThreadButton from "./ThreadButton";
import StartCommentModal from "./StartCommentModal";

export default function ThreadItem({
  threadItemProps,
  mode,
}: {
  threadItemProps: ThreadInterface;
  mode: "detail" | "thumb";
}) {
  const { authUser, commentModal } = useReduxSelector();
  const dispatch = useAppDispatch();

  const onLikeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!threadItemProps.upVotesBy.includes(authUser.id)) {
      dispatch(
        asyncLikeThread({ threadId: threadItemProps.id, userId: authUser.id }),
      );
    } else {
      dispatch(
        asyncNeutralizeThreadLike({
          threadId: threadItemProps.id,
          userId: authUser.id,
        }),
      );
    }
  };
  const onDislikeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!threadItemProps.downVotesBy.includes(authUser.id)) {
      dispatch(
        asyncDisLikeThread({
          threadId: threadItemProps.id,
          userId: authUser.id,
        }),
      );
    } else {
      dispatch(
        asyncNeutralizeThreadLike({
          threadId: threadItemProps.id,
          userId: authUser.id,
        }),
      );
    }
  };

  const onCommentHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setCommentModal(!commentModal));
  };

  return (
    <>
      {commentModal && <StartCommentModal threadItemProps={threadItemProps} />}
      <div className="thread-container grid gap-1 p-3 text-[15px]">
        <div className="thread-owner-photo flex items-center">
          <div id="avatar-start-thread" className="w-[36px]">
            <Image
              src={threadItemProps?.avatar}
              alt="profile"
              className="mx-auto w-full rounded-full object-cover"
              width={36}
              height={36}
            />
          </div>
        </div>
        <div className="thread-author ml-4 flex items-center">
          <p className="font-semibold">{threadItemProps?.ownerName}</p>
        </div>
        <div
          className={`thread-title ${mode === "detail" ? "mb-5 ml-0 mt-3" : "mb-2 ml-4"}`}
        >
          <h1 className="text-xl font-semibold sm:text-2xl">
            {threadItemProps?.title}
          </h1>
        </div>
        <div className="thread-category">
          <button
            type="button"
            className={`${mode === "detail" ? "mb-2 ml-0" : "ml-4"} rounded-lg border px-2 py-1 text-xs`}
          >
            #{threadItemProps?.category}
          </button>
        </div>
        <div className="thread-posting-time flex items-center">
          <p className="text-[#ababab]">
            {getTimeDifference(threadItemProps?.createdAt)}
          </p>
        </div>
        <div
          className={`thread-body ${mode === "detail" ? "ml-1" : "ml-4"} py-2`}
        >
          <div>{parse(threadItemProps?.body)}</div>
        </div>
        {mode !== "detail" && (
          <>
            <div
              className={`thread-line mx-auto mt-2 h-full w-[2px] bg-[#ababab] ${threadItemProps?.totalComments === 0 && "hidden"}`}
            />
            <div
              className={`thread-commenter-photos mt-2 flex content-center items-center justify-center ${threadItemProps?.totalComments === 0 && "hidden"}`}
            >
              <div className="w-[18px] overflow-hidden rounded-full">
                <Image
                  src={threadItemProps?.comments[0]?.owner.avatar}
                  alt="profile"
                  className="mx-auto w-full rounded-full object-cover"
                  width={18}
                  height={18}
                />
              </div>
            </div>
          </>
        )}
        <div
          className={`thread-interaction ${mode === "detail" ? "ml-0" : "ml-2"} flex items-center gap-x-4`}
        >
          <div className="likes-interaction flex items-center">
            <ThreadButton onClick={onLikeHandler}>
              {threadItemProps?.upVotesBy.includes(authUser?.id) ? (
                <IoHeart className="text-red-500" />
              ) : (
                <IoHeartOutline />
              )}
            </ThreadButton>
            {threadItemProps?.upVotesBy.length > 0 && (
              <span>{threadItemProps?.upVotesBy.length}</span>
            )}
          </div>
          <div className="dislikes-interaction flex items-center">
            <ThreadButton onClick={onDislikeHandler}>
              {threadItemProps?.downVotesBy.includes(authUser?.id) ? (
                <IoHeartDislike className="text-red-500" />
              ) : (
                <IoHeartDislikeOutline />
              )}
            </ThreadButton>
            {threadItemProps?.downVotesBy.length > 0 && (
              <span>{threadItemProps?.downVotesBy.length}</span>
            )}
          </div>
          <div className="dislikes-interaction flex items-center">
            <ThreadButton onClick={onCommentHandler}>
              <IoChatbubbleOutline />
            </ThreadButton>
            {threadItemProps?.totalComments > 0 && (
              <span>{threadItemProps?.totalComments}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
