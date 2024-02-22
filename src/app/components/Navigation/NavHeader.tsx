import React from "react";
import NavLinks from "./NavLinks";

export default function NavHeader() {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-x-5">
        <NavLinks />
      </ul>
    </nav>
  );
}
