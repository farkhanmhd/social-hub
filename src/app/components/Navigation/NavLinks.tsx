import React from "react";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoCreateOutline,
  IoHeartOutline,
  IoPersonOutline,
} from "react-icons/io5";
import NavLink from "./NavLink";

export default function NavLinks() {
  return (
    <>
      <NavLink href="/">
        <IoHomeOutline />
      </NavLink>
      <NavLink href="/search">
        <IoSearchOutline />
      </NavLink>
      <NavLink href="/">
        <IoCreateOutline />
      </NavLink>
      <NavLink href="/">
        <IoHeartOutline />
      </NavLink>
      <NavLink href="/">
        <IoPersonOutline />
      </NavLink>
    </>
  );
}
