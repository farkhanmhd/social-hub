import React from "react";
import Link from "next/link";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className="text-2xl">
      <Link
        href={href}
        className="block rounded-md px-3 py-3 text-blue-500 duration-300 hover:bg-[rgba(200,200,200,.5)] dark:hover:bg-[rgba(70,_70,_70,_.7)] sm:px-5"
      >
        {children}
      </Link>
    </li>
  );
}
