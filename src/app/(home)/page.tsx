"use client";

import React, { useEffect, useState, useRef } from "react";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncSetThread } from "@/app/states/threads/thunk";
import StartThread from "../components/Thread/StartThread";
import ListOfThread from "../components/Thread/ListOfThread";
import { ThreadInterface } from "../states/threads/slice";

export default function HomePage() {
  const { threads }: { threads: ThreadInterface[] } = useReduxSelector();
  const [filteredThreads, setFilteredThreads] = useState<ThreadInterface[]>([]);
  const dispatch = useAppDispatch();
  const categoryRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (categoryRef.current?.value !== "All Categories") {
      setFilteredThreads(
        threads.filter(
          (thread) => thread.category === categoryRef.current?.value,
        ),
      );
    } else {
      setFilteredThreads(threads);
    }
  }, [threads]);

  useEffect(() => {
    dispatch(asyncSetThread());
    const intervalID = setInterval(() => {
      dispatch(asyncSetThread());
    }, 10000);

    return () => clearInterval(intervalID);
  }, [dispatch]);

  const onFilterThread = () => {
    const selectedCategory = categoryRef.current?.value;
    if (selectedCategory) {
      setFilteredThreads(
        threads.filter((thread) => thread.category === selectedCategory),
      );
    }
  };
  return (
    <>
      <StartThread />
      <div
        id="categories-container"
        className="flex items-center justify-end gap-x-5"
      >
        <h2 className="ml-4 font-semibold">Filter Threads by Category</h2>
        <select
          id="categories"
          className="my-5 mr-3 rounded-lg border px-5 py-2 text-sm font-semibold "
          ref={categoryRef}
          onChange={onFilterThread}
        >
          <option onClick={() => setFilteredThreads(threads)}>
            All Categories
          </option>
          {Array.from(new Set(threads.map((thread) => thread.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ),
          )}
        </select>
      </div>
      <ListOfThread threads={filteredThreads} />
    </>
  );
}
