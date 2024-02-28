import React from "react";
import {
  IoHomeOutline,
  IoSearchOutline,
  IoCreateOutline,
  IoHeartOutline,
  IoPersonOutline,
} from "react-icons/io5";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import { setPostModal } from "@/app/states/postModal/slice";
import NavLink from "./NavLink";
import NavButton from "./NavButton";

export default function NavLinks() {
  const { authUser } = useReduxSelector();
  const dispatch = useAppDispatch();
  const openModal = () => dispatch(setPostModal(true));
  return (
    <>
      <NavLink href="/">
        <IoHomeOutline />
      </NavLink>
      <NavLink href="/search">
        <IoSearchOutline />
      </NavLink>
      <NavButton onClick={openModal}>
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
