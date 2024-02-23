import React from "react";

export default function DropdownItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li>
      <span className="font-semibold text-black dark:text-white">
        {children}
      </span>
    </li>
  );
}
