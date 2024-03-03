"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncSetThread } from "@/app/states/threads/thunk";
import { ThreadInterface } from "@/app/states/threads/slice";
import ListOfThread from "@/app/components/Thread/ListOfThread";
import Profile from "@/app/components/Profile/Profile";
import asyncSetProfile from "@/app/states/profile/thunk";

export default function ProfilePage() {
  const { threads }: { threads: ThreadInterface[] } = useReduxSelector();
  const { profile } = useReduxSelector();

  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const id = pathname?.split("/").pop() || "";
  const filteredThreads = threads.filter((thread) => thread.ownerId === id);

  useEffect(() => {
    dispatch(asyncSetProfile(id));
    dispatch(asyncSetThread());
    const intervalID = setInterval(() => {
      dispatch(asyncSetThread());
    }, 10000);

    return () => clearInterval(intervalID);
  }, [dispatch, id]);

  return (
    <>
      <div className="mx-3">
        <Profile name={profile.name} avatar={profile.avatar} />
      </div>
      <div className="flex h-full w-full flex-grow">
        <ListOfThread threads={filteredThreads} />
      </div>
    </>
  );
}
