"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useReduxSelector from "../../hooks/useReduxSelector";
import { useAppDispatch } from "../../states/hooks";
import { setPostModal } from "../../states/commentModal/slice";
import Button from "../Button/Button";

export default function StartThread() {
  const dispatch = useAppDispatch();
  const { authUser, postModal, language } = useReduxSelector();
  return (
    <div className="hidden h-[70px] items-center gap-2 border-b px-3 sm:flex">
      <div id="avatar-start-thread" className="w-[36px] overflow-hidden rounded-full">
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
      <Button type="button" disabled onClick={(e) => e}>
        Post
      </Button>
    </div>
  );
}
