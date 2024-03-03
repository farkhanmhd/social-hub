"use client";

import React, { useRef, useState } from "react";
import { IoReorderTwoOutline } from "react-icons/io5";
import { useAppDispatch } from "@/app/states/hooks";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { setDropDownMode } from "@/app/states/dropDownMode/slice";
import useClickOutside from "@/app/hooks/useClickOutside";
import NavHeader from "../Navigation/NavHeader";
import Dropdown from "../Dropdown/Dropdown";
import MainDropdownItems from "../Dropdown/MainDropdownItems";
import ThemeDropDownItems from "../Dropdown/ThemeDropDownItems";
import LanguageDropdownItems from "../Dropdown/LanguageDropdownItems";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const dropdownBtn = useRef<HTMLButtonElement>(null);
  const { dropDownMode } = useReduxSelector();
  const dispatch = useAppDispatch();
  const itemClass: string =
    "px-3 py-2 font-semibold dark:text-white text-sm hover:bg-gray-200 dark:hover:bg-gray-700 block w-full h-full text-left rounded-lg flex items-center gap-x-3";

  const toggleDropdown = () => {
    dispatch(setDropDownMode("main"));
    setIsDropdownOpen(!isDropdownOpen);
  };

  useClickOutside(dropdownRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  return (
    <header className="fixed top-0 z-[9999] flex h-[74px] w-screen  items-center text-[#959494] backdrop-blur-md dark:bg-[rgba(10,_10,_10,_.9)]">
      <div
        id="header-contents"
        className="mx-auto flex h-full w-full max-w-[1280px] flex-row-reverse items-center px-5 sm:px-10 md:relative md:flex-row md:justify-between"
      >
        <div
          id="logo"
          className="absolute left-1/2 -translate-x-1/2 text-xl md:static md:left-0 md:translate-x-0"
        >
          <span className="text-black dark:text-white">Social</span>
          <span className="font-semibold text-blue-500">Hub</span>
        </div>
        <NavHeader />
        <div id="dropdown" className="relative text-blue-300 ">
          <button
            type="button"
            id="menu-btn-icon"
            className={`text-4xl duration-200 hover:text-blue-500 ${isDropdownOpen && "text-blue-500"}`}
            onClick={toggleDropdown}
            ref={dropdownBtn}
          >
            {}
            <IoReorderTwoOutline />
          </button>
          {isDropdownOpen && (
            <Dropdown ref={dropdownRef}>
              {dropDownMode === "main" && (
                <MainDropdownItems itemClass={itemClass} />
              )}
              {dropDownMode === "theme" && (
                <ThemeDropDownItems itemClass={itemClass} />
              )}
              {dropDownMode === "language" && (
                <LanguageDropdownItems itemClass={itemClass} />
              )}
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}
