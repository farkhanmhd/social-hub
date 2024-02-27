"use client";

import React from "react";
import Image from "next/image";
import useReduxSelector from "@/app/hooks/useReduxSelector";

export default function StartThread() {
  const { authUser } = useReduxSelector();
  return (
    <div className="flex h-[70px] items-center gap-2 border-b px-3">
      <div
        id="avatar-start-thread"
        className="w-[36px] overflow-hidden rounded-full"
      >
        <Image
          src={authUser?.avatar}
          alt="profile"
          className="w-full object-cover"
          width={36}
          height={36}
        />
      </div>
      <h1 className="flex-[3] cursor-text pl-1 text-[14px] font-light text-[#959494]">
        Start a Thread...
      </h1>
      <button
        type="button"
        className="h-[36px] w-16 cursor-not-allowed rounded-full bg-[#b1b1b1] px-4 py-[6px] text-[15px] font-medium text-white"
        disabled
      >
        Post
      </button>
    </div>
  );
}
