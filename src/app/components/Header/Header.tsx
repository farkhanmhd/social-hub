import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import NavHeader from "../Navigation/NavHeader";

export default function Header() {
  return (
    <header className="fixed top-0 flex h-16 w-screen items-center bg-[rgba(10,_10,_10,_.9)] text-white backdrop-blur-md">
      <div
        id="header-contents"
        className="mx-auto flex w-full max-w-[1280px] flex-row-reverse items-center px-10 md:flex-row md:justify-between"
      >
        <div id="logo" className="absolute left-1/2 -translate-x-1/2 md:static">
          <div id="logo-container" className="trackig-wider text-xl">
            <span className="font-thin">Social</span>
            <span className="font-semibold text-blue-500">Hub</span>
          </div>
        </div>
        <NavHeader />
        <button id="menu-button" type="button" className="text-5xl">
          <IoMenuOutline />
          {}
        </button>
      </div>
    </header>
  );
}
