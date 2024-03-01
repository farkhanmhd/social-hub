"use client";

import React, { useEffect } from "react";
import ThreadItem from "@/app/components/Thread/ThreadItem";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncSetThread } from "@/app/states/threads/thunk";
import ListOfComments from "@/app/components/Thread/ListOfComments";

export default function PostPage() {
  const { threads, isPreload } = useReduxSelector();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(asyncSetThread());
    const intervalID = setInterval(() => {
      dispatch(asyncSetThread());
    }, 10000);

    return () => clearInterval(intervalID);
  }, [dispatch]);

  if (isPreload || !threads) return <div>Loading...</div>;
  const threadId: string = pathname?.split("/").pop() || "";
  const filteredThread = threads.find((thread) => thread.id === threadId);

  if (!filteredThread) return <div>Thread not found</div>;

  return (
    <div className="thread-detail flex h-full w-full flex-grow flex-col">
      <ThreadItem threadItemProps={filteredThread} mode="detail" />
      <ListOfComments comments={filteredThread.comments} threadId={threadId} />
    </div>
  );
}
