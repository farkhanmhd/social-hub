"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/app/components/Header/Header";
import NavBottom from "@/app/components/Navigation/NavBottom";
import { useAppDispatch } from "./states/hooks";
import asyncPreloadProcess from "./states/isPreload/thunk";
import Loading from "./components/Loading/Loading";
import useReduxSelector from "./hooks/useReduxSelector";
import StartThreadModal from "./components/Thread/StartThreadModal";

export default function Template({ children }: { children: React.ReactNode }) {
  const disableNavbar = ["/login", "/register"];
  const pathname = usePathname();
  const { authUser, isPreload, postModal } = useReduxSelector();
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
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

  if (isPreload) return null;

  return (
    <>
      {postModal && <StartThreadModal />}
      {!disableNavbar.includes(pathname) && <Header />}
      <Loading />
      <div
        id="content"
        className={`${disableNavbar.includes(pathname) ? "mt-0" : "mt-[74px]"}  min-h-[calc(100vh-74px)]`}
      >
        <main className="min-h-[calc(100vh-74px)] w-full max-w-7xl px-0 pb-[50px] md:mx-auto md:px-10 md:pb-0">
          {children}
        </main>
      </div>
      {!disableNavbar.includes(pathname) && <NavBottom />}
    </>
  );
}
