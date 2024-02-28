import React from "react";

export default function NavButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <li className="text-2xl">
      <button
        type="button"
        className="block rounded-md px-3 py-3 duration-300 hover:bg-[rgba(200,200,200,.5)] dark:hover:bg-[rgba(70,_70,_70,_.7)] sm:px-5 "
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}
