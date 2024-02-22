import React from "react";
import NavLinks from "./NavLinks";

export default function NavBottom() {
  return (
    <nav className="fixed bottom-0 flex h-16 w-screen items-center bg-[rgba(10,_10,_10,_.9)] text-white backdrop-blur-md md:hidden">
      <ul className="flex w-full justify-evenly gap-x-5">
        <NavLinks />
      </ul>
    </nav>
  );
}
