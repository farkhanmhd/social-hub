"use client";

import React, { useEffect } from "react";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncSetThread } from "@/app/states/threads/thunk";
import StartThread from "../components/Thread/StartThread";
import ListOfThread from "../components/Thread/ListOfThread";
import { ThreadInterface } from "../states/threads/slice";

export default function HomePage() {
  const { threads }: { threads: ThreadInterface[] } = useReduxSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSetThread());
    const intervalID = setInterval(() => {
      dispatch(asyncSetThread());
    }, 10000);

    return () => clearInterval(intervalID);
  }, [dispatch]);
  return (
    <>
      <StartThread />
      <ListOfThread threads={threads} />
    </>
  );
}
