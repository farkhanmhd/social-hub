import React from "react";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoCreateOutline,
  IoHeartOutline,
  IoPersonOutline,
} from "react-icons/io5";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import NavLink from "./NavLink";
import NavButton from "./NavButton";

export default function NavLinks() {
  const { authUser } = useReduxSelector();
  return (
    <>
      <NavLink href="/">
        <IoHomeOutline />
      </NavLink>
      <NavLink href="/search">
        <IoSearchOutline />
      </NavLink>
      <NavButton>
        <IoCreateOutline />
      </NavButton>
      <NavLink href="/activity">
        <IoHeartOutline />
      </NavLink>
      <NavLink href={`/${authUser?.id}`}>
        <IoPersonOutline />
      </NavLink>
    </>
  );
}
