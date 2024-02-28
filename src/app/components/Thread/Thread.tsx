"use client";

import React from "react";
import "../../styles/Thread.css";
import Image from "next/image";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import Link from "next/link";
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
} from "@/app/states/threads/thunk";
import { useAppDispatch } from "@/app/states/hooks";
import ThreadButton from "./ThreadButton";

export default function Thread({ ...threadWithOwner }: ThreadInterface) {
  const { authUser } = useReduxSelector();
  const dispatch = useAppDispatch();

  const onLikeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      asyncLikeThread({ threadId: threadWithOwner.id, userId: authUser.id }),
    );
  };
  const onDislikeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      asyncDisLikeThread({ threadId: threadWithOwner.id, userId: authUser.id }),
    );
  };
  return (
    <li className="border-t first:border-none">
      <Link href={`/${threadWithOwner.ownerId}/post/${threadWithOwner.id}`}>
        <div className="thread-container grid gap-1 p-3 text-[12px] sm:text-[15px]">
          <div className="thread-owner-photo flex items-center">
            <div id="avatar-start-thread" className="w-[36px]">
              <Image
                src={threadWithOwner.ownerProfilePicture}
                alt="profile"
                className="mx-auto w-full rounded-full object-cover"
                width={36}
                height={36}
              />
            </div>
          </div>
          <div className="thread-author ml-4 flex items-center">
            <p className="font-semibold">{threadWithOwner.ownerName}</p>
          </div>
          <div className="thread-title mb-2 ml-4">
            <h1 className="text-xl font-semibold sm:text-2xl">
              {threadWithOwner.title}
            </h1>
          </div>
          <div className="thread-category">
            <button
              type="button"
              className="ml-4 rounded-lg border px-2 py-1 text-xs"
            >
              #{threadWithOwner.category}
            </button>
          </div>
          <div className="thread-posting-time flex items-center">
            <p className="text-[#ababab]">
              {getTimeDifference(threadWithOwner.createdAt)}
            </p>
          </div>
          <div className="thread-body ml-4 py-2">
            <div>{parse(threadWithOwner.body)}</div>
          </div>
          <div
            className={`thread-line mx-auto mt-2 h-full w-[2px] bg-[#ababab] ${threadWithOwner.totalComments === 0 && "hidden"}`}
          />
          <div
            className={`thread-commenter-photos mt-2 flex content-center items-center justify-center ${threadWithOwner.totalComments === 0 && "hidden"}`}
          >
            <div className="w-[18px] overflow-hidden rounded-full">
              <Image
                src={authUser?.avatar}
                alt="profile"
                className="mx-auto w-full rounded-full object-cover"
                width={18}
                height={18}
              />
            </div>
          </div>
          <div className="thread-interaction ml-2 flex items-center gap-x-4">
            <div className="likes-interaction flex items-center">
              <ThreadButton onClick={(e) => onLikeHandler(e)}>
                {threadWithOwner.upVotesBy.includes(authUser?.id) ? (
                  <IoHeart className="text-red-500" />
                ) : (
                  <IoHeartOutline />
                )}
              </ThreadButton>
              {threadWithOwner.upVotesBy.length > 0 && (
                <span>{threadWithOwner.upVotesBy.length}</span>
              )}
            </div>
            <div className="dislikes-interaction flex items-center">
              <ThreadButton
                onClick={(e) => {
                  onDislikeHandler(e);
                }}
              >
                {threadWithOwner.downVotesBy.includes(authUser?.id) ? (
                  <IoHeartDislike className="text-red-500" />
                ) : (
                  <IoHeartDislikeOutline />
                )}
              </ThreadButton>
              {threadWithOwner.downVotesBy.length > 0 && (
                <span>{threadWithOwner.downVotesBy.length}</span>
              )}
            </div>
            <div className="dislikes-interaction flex items-center">
              <ThreadButton onClick={() => {}}>
                <IoChatbubbleOutline />
              </ThreadButton>
              {threadWithOwner.totalComments > 0 && (
                <span>{threadWithOwner.totalComments}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
