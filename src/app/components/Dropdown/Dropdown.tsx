import React from "react";

export default function Dropdown() {
  return (
    <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <li>
        <span className="text-black dark:text-white">Switch Theme</span>
      </li>
      <li>
        <span className="text-black dark:text-white">Logout</span>
      </li>
    </ul>
  );
}
