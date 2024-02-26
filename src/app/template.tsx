"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/app/components/Header/Header";
import NavBottom from "@/app/components/Navigation/NavBottom";
import { useAppDispatch } from "./states/hooks";
import asyncPreloadProcess from "./states/isPreload/thunk";
import Loading from "./components/Loading/Loading";
import useReduxSelector from "./hooks/useReduxSelector";

export default function Template({ children }: { children: React.ReactNode }) {
  const disableNavbar = ["/login", "/register"];
  const pathname = usePathname();
  const { authUser, isPreload } = useReduxSelector();
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
      <div id="content" className="mt-16 min-h-[calc(100vh-64px)]">
        <main
          id="homepage"
          className="mx-auto  h-full w-full max-w-7xl px-5 sm:px-10"
        >
          {children}
        </main>
      </div>
      {!disableNavbar.includes(pathname) && <NavBottom />}
    </>
  );
}
