"use client";

import React from "react";
import "../../styles/Thread.css";
import Image from "next/image";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import Link from "next/link";
import parse from "html-react-parser";
import {
  IoHeartOutline,
  IoHeartDislikeOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import { getTimeDifference } from "@/app/utils/util";
import { ThreadInterface } from "@/app/states/threads/slice";
import ThreadButton from "./ThreadButton";

export default function Thread({ ...threadWithOwner }: ThreadInterface) {
  const { authUser } = useReduxSelector();
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
          <div className="thread-author ml-2 flex items-center">
            <p className="font-semibold">{threadWithOwner.ownerName}</p>
          </div>
          <div className="thread-title mb-2 ml-2">
            <h1 className="text-xl font-semibold sm:text-2xl">
              {threadWithOwner.title}
            </h1>
          </div>
          <div className="thread-category">
            <button
              type="button"
              className="ml-2 rounded-lg border px-2 py-1 text-xs"
            >
              #{threadWithOwner.category}
            </button>
          </div>
          <div className="thread-posting-time flex items-center">
            <p className="text-[#ababab]">
              {getTimeDifference(threadWithOwner.createdAt)}
            </p>
          </div>
          <div className="thread-body ml-2 py-2">
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
          <div className="thread-interaction ml-2 flex text-xl">
            <ThreadButton onClick={() => {}}>
              <IoHeartOutline />
            </ThreadButton>
            <ThreadButton onClick={() => {}}>
              <IoHeartDislikeOutline />
            </ThreadButton>
            <ThreadButton onClick={() => {}}>
              <IoChatbubbleOutline />
            </ThreadButton>
          </div>
          <div className="thread-footer ml-2 mt-2 flex items-center gap-x-2 text-[#ababab]">
            {threadWithOwner.totalComments > 0 && (
              <>
                <span>{threadWithOwner.totalComments} replies</span>
                <span className="mx-1 mb-2">.</span>
              </>
            )}
            <span>{threadWithOwner.upVotesBy.length} likes</span>
            <span className="mb-2">.</span>
            <span>{threadWithOwner.downVotesBy.length} dislikes</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
