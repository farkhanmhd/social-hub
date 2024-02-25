import React from "react";
import { useAppDispatch } from "@/app/states/hooks";
import { asyncUnsetAuthUser } from "@/app/states/authUser/thunk";
import Link from "next/link";
import DropdownItem from "./DropdownItem";

export default function Dropdown() {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const switchTheme = () => {};

  const itemClass: string = "font-semibold text-black dark:text-white";
  return (
    <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <DropdownItem>
        <Link className={itemClass} href="/leaderboard">
          Leaderboard
        </Link>
      </DropdownItem>
      <DropdownItem>
        <button type="button" onClick={switchTheme} className={itemClass}>
          Switch Theme
        </button>
      </DropdownItem>
      <DropdownItem>
        <button type="button" onClick={onLogout} className={itemClass}>
          Logout
        </button>
      </DropdownItem>
    </ul>
  );
}
