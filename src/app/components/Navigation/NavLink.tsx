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
        className="block rounded-md px-5 py-3 duration-300 hover:bg-[rgba(70,_70,_70,_.7)]"
      >
        {children}
      </Link>
    </li>
  );
}
