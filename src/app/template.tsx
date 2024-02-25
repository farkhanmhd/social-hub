"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/app/components/Header/Header";
import NavBottom from "@/app/components/Navigation/NavBottom";
import { useAppDispatch, useAppSelector } from "./states/hooks";
import asyncPreloadProcess from "./states/isPreload/thunk";
import Loading from "./components/Loading/Loading";

export default function Template({ children }: { children: React.ReactNode }) {
  const disableNavbar = ["/login", "/register"];
  const pathname = usePathname();
  const authUser = useAppSelector((state) => state.authUser);
  const isPreload = useAppSelector((state) => state.isPreload);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    if (isPreload) {
      return;
    }

    if (authUser === null) {
      if (pathname === "/register") push("/register");
      else push("/login");
    }

    if (
      authUser !== null &&
      (pathname === "/login" || pathname === "/register")
    ) {
      push("/");
    }
  }, [authUser, pathname, push, isPreload]);

  return (
    <>
      {!disableNavbar.includes(pathname) && <Header />}
      <Loading />
      {children}
      {!disableNavbar.includes(pathname) && <NavBottom />}
    </>
  );
}
