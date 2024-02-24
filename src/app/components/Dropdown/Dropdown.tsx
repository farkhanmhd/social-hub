import React from "react";
import DropdownItem from "./DropdownItem";

export default function Dropdown() {
  return (
    <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <DropdownItem>Leaderboard</DropdownItem>
      <DropdownItem>Switch Theme</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </ul>
  );
}
