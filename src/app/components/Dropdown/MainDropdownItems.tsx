import React from "react";
import Link from "next/link";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncUnsetAuthUser } from "@/app/states/authUser/thunk";
import { setDropDownMode } from "@/app/states/dropDownMode/slice";
import {
  IoBarChart,
  IoLanguage,
  IoDesktopOutline,
  IoLogOutOutline,
} from "react-icons/io5";

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
          <span>
            <IoBarChart />
          </span>
          <span>Leaderboard</span>
        </Link>
      </li>
      <li>
        <button
          type="button"
          onClick={() => switchDropdown("theme")}
          className={itemClass}
        >
          <span>
            <IoDesktopOutline />
          </span>
          <span>Switch Theme</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => dispatch(setDropDownMode("language"))}
          className={itemClass}
        >
          <span>
            <IoLanguage />
          </span>
          <span>Change Language</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={onLogout} className={itemClass}>
          <span>
            <IoLogOutOutline />
          </span>
          <span>Logout</span>
        </button>
      </li>
    </>
  );
}
