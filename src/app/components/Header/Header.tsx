"use client";

import React from "react";
import { IoReorderTwoOutline } from "react-icons/io5";
import NavHeader from "../Navigation/NavHeader";
// import Dropdown from "../Dropdown/Dropdown";

export default function Header() {
  return (
    <header className="fixed top-0 flex h-16 w-screen items-center  text-[#959494] backdrop-blur-md dark:bg-[rgba(10,_10,_10,_.9)]">
      <div
        id="header-contents"
        className="mx-auto flex w-full max-w-[1280px] flex-row-reverse items-center px-5 sm:px-10 md:relative md:flex-row md:justify-between"
      >
        <div
          id="logo"
          className="absolute left-1/2 -translate-x-1/2 text-xl md:static md:left-0 md:translate-x-0"
        >
          <span className="text-black dark:text-white">Social</span>
          <span className="font-semibold text-blue-500">Hub</span>
        </div>
        <NavHeader />
        <div id="dropdown-menu" className="dropdown dropdown-end">
          <button
            id="menu-button"
            type="button"
            className="text-4xl duration-200 hover:text-black"
          >
            <IoReorderTwoOutline />
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <li>
                <span className="text-black dark:text-white">Switch Theme</span>
              </li>
              <li>
                <span className="text-black dark:text-white">Logout</span>
              </li>
            </ul>
          </button>
        </div>
      </div>
    </header>
  );
}
