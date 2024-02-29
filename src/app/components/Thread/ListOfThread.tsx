"use client";

import React from "react";
import { ThreadInterface } from "@/app/states/threads/slice";
import { usePathname } from "next/navigation";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import openModal from "@/app/states/postModal/thunk";
import ThreadLink from "./ThreadLink";

export default function ListOfThread({
  threads,
}: {
  threads: ThreadInterface[];
}) {
  const { authUser } = useReduxSelector();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  return (
    <>
      <ul>
        {threads.length > 0 &&
          threads.map((thread: ThreadInterface) => (
            <ThreadLink key={thread.id} threadWithOwner={thread} />
          ))}
      </ul>
      {id === authUser?.id && threads.length === 0 && (
        <div className="flex flex-grow items-center justify-center">
          <button
            type="button"
            className="rounded-lg border px-5 py-2 text-sm font-semibold"
            onClick={() => dispatch(openModal())}
          >
            Start your first thread
          </button>
        </div>
      )}
      {threads.length === 0 && id !== authUser?.id && (
        <div className="flex flex-grow items-center justify-center">
          <h1 className="font-semibold">There are no threads</h1>
        </div>
      )}
    </>
  );
}
