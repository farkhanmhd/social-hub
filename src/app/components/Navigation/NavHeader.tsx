import React from "react";
import NavLinks from "./NavLinks";

export default function NavHeader() {
  return (
    <nav className="absolute left-1/2 hidden -translate-x-1/2 md:block">
      <ul className="flex gap-x-5">
        <NavLinks />
      </ul>
    </nav>
  );
}
