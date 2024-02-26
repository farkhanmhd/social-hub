import React from "react";
import Link from "next/link";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncUnsetAuthUser } from "@/app/states/authUser/thunk";
import { setDropDownMode } from "@/app/states/dropDownMode/slice";

export default function MainDropdownItems({
  itemClass,
}: {
  itemClass: string;
}) {
  const dispatch = useAppDispatch();

  const switchDropdown = (mode: string) => {
    dispatch(setDropDownMode(mode));
  };
  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };
  return (
    <>
      <li>
        <Link className={itemClass} href="/leaderboard">
          Leaderboard
        </Link>
      </li>
      <li>
        <button
          type="button"
          onClick={() => switchDropdown("theme")}
          className={itemClass}
        >
          Switch Theme
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => dispatch(setDropDownMode("language"))}
          className={itemClass}
        >
          Change Language
        </button>
      </li>
      <li>
        <button type="button" onClick={onLogout} className={itemClass}>
          Logout
        </button>
      </li>
    </>
  );
}
