"use client";

import React from "react";
import Image from "next/image";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import Link from "next/link";
import { useAppDispatch } from "@/app/states/hooks";
import { setPostModal } from "@/app/states/commentModal/slice";

export default function StartThread() {
  const dispatch = useAppDispatch();
  const { authUser, postModal, language } = useReduxSelector();
  return (
    <div className="hidden h-[70px] items-center gap-2 border-b px-3 sm:flex">
      <div
        id="avatar-start-thread"
        className="w-[36px] overflow-hidden rounded-full"
      >
        <Link href={`/${authUser?.id}`}>
          <Image
            src={authUser?.avatar}
            alt="profile"
            className="w-full object-cover"
            width={36}
            height={36}
          />
        </Link>
      </div>
      <button
        type="button"
        className="flex-[3] cursor-text pl-1 text-left text-[14px] font-light text-[#959494]"
        onClick={() => dispatch(setPostModal(!postModal))}
      >
        {language === "id" ? "Buat thread baru..." : "Start a thread..."}
      </button>
      <button
        type="button"
        className="h-[36px] w-16 cursor-not-allowed rounded-full bg-[#b1b1b1] px-4 py-[6px] text-[12px] font-medium text-white sm:text-[15px]"
        disabled
      >
        Post
      </button>
    </div>
  );
}
