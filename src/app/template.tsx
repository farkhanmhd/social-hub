"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header/Header";
import NavBottom from "@/app/components/Navigation/NavBottom";

export default function Template({ children }: { children: React.ReactNode }) {
  const disableNavbar = ["/login", "/register"];
  const pathname = usePathname();
  return (
    <>
      {!disableNavbar.includes(pathname) && <Header />}
      {children}
      {!disableNavbar.includes(pathname) && <NavBottom />}
    </>
  );
}
