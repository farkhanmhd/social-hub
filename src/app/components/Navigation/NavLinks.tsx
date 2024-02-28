import React from "react";
import {
  IoHome,
  IoHomeOutline,
  IoSearch,
  IoSearchOutline,
  IoCreateOutline,
  IoHeart,
  IoHeartOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import { useAppDispatch } from "@/app/states/hooks";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import openModal from "@/app/states/postModal/thunk";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import NavButton from "./NavButton";

export default function NavLinks() {
  const { authUser } = useReduxSelector();
  const dispatch = useAppDispatch();
  const onOpenModalHandler = () => {
    dispatch(openModal());
  };
  const pathname = usePathname();
  return (
    <>
      <NavLink href="/">
        {pathname === "/" ? <IoHome /> : <IoHomeOutline />}
      </NavLink>
      <NavLink href="/search">
        {pathname === "/search" ? <IoSearch /> : <IoSearchOutline />}
      </NavLink>
      <NavButton onClick={onOpenModalHandler}>
        <IoCreateOutline />
      </NavButton>
      <NavLink href="/activity">
        {pathname === "/activity" ? <IoHeart /> : <IoHeartOutline />}
      </NavLink>
      <NavLink href={`/${authUser?.id}`}>
        {pathname === `/${authUser?.id}` ? <IoPerson /> : <IoPersonOutline />}
      </NavLink>
    </>
  );
}
