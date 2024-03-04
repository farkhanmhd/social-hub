"use client";

import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Profile from "../components/Profile/Profile";
import useReduxSelector from "../hooks/useReduxSelector";
import { useAppDispatch } from "../states/hooks";
import asyncReceiveAllUsers from "../states/allUsers/thunk";

export default function SearchPage() {
  const [usersLimit, setUsersLimit] = useState(20);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const { allUsers, language } = useReduxSelector();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    setSearchValue(search || "");
    setUsersLimit(20);
  }, [search, searchParams, setSearchValue, setUsersLimit]);

  useEffect(() => {
    dispatch(asyncReceiveAllUsers());
  }, [dispatch]);

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      setUsersLimit((prev) => prev + 20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [usersLimit]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", newSearchValue);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return (
    <div className="mt-20 h-[60px] w-full px-5 md:px-0">
      <label htmlFor="search" className="relative block h-full w-full">
        <IoSearch className="absolute top-1/2 z-[999] ml-5 -translate-y-1/2 text-[#A0A0A0]" />
        {}
        <input
          id="search"
          type="text"
          className="absolute h-full w-full rounded-2xl border bg-gray-100 pl-12 text-[15px] font-light outline-none duration-200 focus:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:bg-black dark:text-white"
          placeholder={language === "id" ? "Cari..." : "Search..."}
          value={searchValue}
          onChange={(e) => onSearchChange(e)}
        />
      </label>
      <ul id="all-users-container" className="mt-10 flex flex-col gap-y-5">
        {allUsers
          .filter((user) =>
            user.name.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .slice(0, usersLimit)
          .map((user) => (
            <li className="rounded-lg duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:border">
              <Link href={`/${user.id}`}>
                <div className="p-3">
                  <Profile name={user.name} avatar={user.avatar} />
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
