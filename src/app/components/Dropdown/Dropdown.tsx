import React, { forwardRef } from "react";

const Dropdown = forwardRef<HTMLUListElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <ul
      id="dropdown-list"
      className="absolute right-0 z-10 mt-2 flex w-48 origin-top-right flex-col gap-y-2 rounded-lg bg-white p-2 text-black shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
      ref={ref}
    >
      {children}
    </ul>
  ),
);

export default Dropdown;
