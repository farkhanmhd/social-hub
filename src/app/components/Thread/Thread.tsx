"use client";

import React from "react";
import "../../styles/Thread.css";
import Image from "next/image";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import Link from "next/link";
import {
  IoHeartOutline,
  IoHeartDislikeOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";

interface ThreadProps {
  id: number;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: number;
  upVotesBy: number[];
  downVotesBy: number[];
  totalComments: number;
  ownerName: string;
  ownerProfilePicture: string;
}

export default function Thread({
  id,
  title,
  body,
  category,
  createdAt,
  ownerId,
  upVotesBy,
  downVotesBy,
  totalComments,
  ownerName,
  ownerProfilePicture,
}: ThreadProps) {
  const { authUser } = useReduxSelector();
  return (
    <li>
      <Link href={`/${ownerId}/post/${id}`}>
        <div className="thread-container grid gap-1 p-3 text-[15px]">
          <div className="thread-owner-photo mt-1 flex">
            <div id="avatar-start-thread" className="w-[36px]">
              <Image
                src={ownerProfilePicture}
                alt="profile"
                className="mx-auto w-full rounded-full object-cover"
                width={36}
                height={36}
              />
            </div>
          </div>
          <div className="thread-author ml-2">
            <p className="font-semibold">{ownerName}</p>
          </div>
          <div className="thread-title ml-2">
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
          <div className="thread-category">
            <button
              type="button"
              className="ml-2 rounded-lg border px-2 py-1 text-xs"
            >
              {category}
            </button>
          </div>
          <div className="thread-posting-time">
            <p className="text-[#ababab]">{createdAt}</p>
          </div>
          <div className="thread-body ml-2 py-2">
            <p className="">{body}</p>
          </div>
          <div className="thread-line mx-auto h-full w-[2px] bg-[#ababab]" />
          <div className="thread-commenter-photos mt-2 flex content-center items-center justify-center">
            <div
              id="avatar-start-thread"
              className="w-[18px] overflow-hidden rounded-full"
            >
              <Image
                src={authUser?.avatar}
                alt="profile"
                className="mx-auto w-full rounded-full object-cover"
                width={18}
                height={18}
              />
            </div>
          </div>
          <div className="thread-interaction ml-2 flex gap-2 text-xl">
            <button type="button" className="like-btn">
              {}
              <IoHeartOutline />
            </button>
            <button type="button" className="dislike-btn">
              {}
              <IoHeartDislikeOutline />
            </button>
            <button type="button" className="comment-btn">
              {}
              <IoChatbubbleOutline />
            </button>
          </div>
          <div className="thread-footer ml-2 mt-2 flex  items-center text-[#ababab]">
            <span>{totalComments} replies</span>
            <span className="mx-2 mb-2">.</span>
            <span>{upVotesBy.length} likes</span>
            <span>{downVotesBy.length} dislikes</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
