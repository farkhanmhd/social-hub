"use client";

import React, { useEffect, useState, useRef } from "react";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import { IoChevronDownOutline } from "react-icons/io5";
import { asyncSetThread } from "@/app/states/threads/thunk";
import StartThread from "../components/Thread/StartThread";
import ListOfThread from "../components/Thread/ListOfThread";
import { ThreadInterface } from "../states/threads/slice";
import Dropdown from "../components/Dropdown/Dropdown";
import useClickOutside from "../hooks/useClickOutside";

export default function HomePage() {
  const { threads }: { threads: ThreadInterface[] } = useReduxSelector();
  const [filteredThreads, setFilteredThreads] = useState<ThreadInterface[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const dispatch = useAppDispatch();
  const dropDownRef = useRef<HTMLUListElement>(null);
  const itemClass: string =
    "px-3 py-2 font-semibold dark:text-white text-sm hover:bg-gray-200 dark:hover:bg-gray-700 block w-full h-full text-left rounded-lg flex items-center gap-x-3";

  useEffect(() => {
    if (selectedCategory === "All Categories") {
      setFilteredThreads(threads);
    } else {
      setFilteredThreads(
        threads.filter((thread) => thread.category === selectedCategory),
      );
    }
  }, [threads, selectedCategory]);

  useEffect(() => {
    dispatch(asyncSetThread());
    const intervalID = setInterval(() => {
      dispatch(asyncSetThread());
    }, 10000);

    return () => clearInterval(intervalID);
  }, [dispatch]);

  useClickOutside(dropDownRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  const onResetCategory = () => {
    setSelectedCategory("All Categories");
    setFilteredThreads(threads);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <StartThread />
      <div
        id="categories-container"
        className="flex items-center justify-between gap-x-5 sm:justify-end"
      >
        <h2 className="ml-4 font-semibold">Filter Threads by Category</h2>
        <div id="categories" className="relative">
          <button
            type="button"
            className="my-5 mr-3 flex w-[150px] items-center justify-between gap-x-2 rounded-lg border px-3 py-2 text-sm font-semibold"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedCategory}</span>
            <span>
              <IoChevronDownOutline />
            </span>
          </button>
          {isDropdownOpen && (
            <div className="item-downs top- absolute right-3 top-16">
              <Dropdown ref={dropDownRef}>
                <button
                  type="button"
                  className={itemClass}
                  onClick={onResetCategory}
                >
                  All Categories
                </button>
                {Array.from(
                  new Set(threads.map((thread) => thread.category)),
                ).map((category) => (
                  <button
                    type="button"
                    key={category}
                    value={category}
                    className={itemClass}
                    onClick={() => {
                      setSelectedCategory(category);
                      setFilteredThreads(
                        threads.filter(
                          (thread) => thread.category === category,
                        ),
                      );
                      setIsDropdownOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </Dropdown>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <ListOfThread threads={filteredThreads} />
      </div>
    </>
  );
}
