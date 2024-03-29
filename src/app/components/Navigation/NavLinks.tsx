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
import { usePathname } from "next/navigation";
import { setPostModal } from "../../states/commentModal/slice";
import { useAppDispatch } from "../../states/hooks";
import useReduxSelector from "../../hooks/useReduxSelector";
import NavLink from "./NavLink";
import NavButton from "./NavButton";

export default function NavLinks() {
  const { authUser, postModal } = useReduxSelector();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  return (
    <>
      <NavLink href="/">{pathname === "/" ? <IoHome /> : <IoHomeOutline />}</NavLink>
      <NavLink href="/search">
        {pathname === "/search" ? <IoSearch /> : <IoSearchOutline />}
      </NavLink>
      <NavButton onClick={() => dispatch(setPostModal(!postModal))}>
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
