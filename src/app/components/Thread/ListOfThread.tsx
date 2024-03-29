"use client";

import React from "react";
import { ThreadInterface } from "@/app/states/threads/slice";
import { usePathname } from "next/navigation";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import { setPostModal } from "@/app/states/commentModal/slice";
import ThreadLink from "./ThreadLink";

export default function ListOfThread({
  threads,
}: {
  threads: ThreadInterface[];
}) {
  const { authUser, postModal, language } = useReduxSelector();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  return (
    <>
      {threads.length > 0 && (
        <ul className="flex-grow">
          {threads.length > 0 &&
            threads.map((thread: ThreadInterface) => (
              <ThreadLink key={thread.id} threadWithOwner={thread} />
            ))}
        </ul>
      )}
      {id === authUser?.id && threads.length === 0 && (
        <div className="flex flex-grow items-center justify-center">
          <button
            type="button"
            className="rounded-lg border px-5 py-2 text-sm font-semibold"
            onClick={() => dispatch(setPostModal(!postModal))}
          >
            {language === "id" ? "Buat thread baru" : "Start your first thread"}
          </button>
        </div>
      )}
      {threads.length === 0 && id !== authUser?.id && (
        <div className="flex flex-grow items-center justify-center">
          <h1 className="font-semibold">
            {language === "id" ? "Tidak ada thread" : "There are no threads"}
          </h1>
        </div>
      )}
    </>
  );
}
