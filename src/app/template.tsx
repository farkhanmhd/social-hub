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
import StartCommentModal from "./components/Thread/StartCommentModal";
import { setTheme } from "./states/theme/slice";
import { setLanguage } from "./states/language/slice";
import Footer from "./components/Footer/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const disableNavbarPath = ["/login", "/register"];
  const pathname = usePathname();
  const { authUser, isPreload, postModal, commentModal, commentModalState } =
    useReduxSelector();
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  useEffect(() => {
    if (localStorage.language === "en") {
      dispatch(setLanguage("en"));
      document.documentElement.lang = "en";
    } else {
      dispatch(setLanguage("id"));
      document.documentElement.lang = "id";
    }

    if (localStorage.theme === "dark") {
      dispatch(setTheme("dark"));
      document.documentElement.classList.add("dark");
    } else {
      dispatch(setTheme("light"));
      document.documentElement.classList.add("light");
    }
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

  const checkPath = ["/", "/search", "/activity", `/${authUser?.id}`];

  if (authUser === null && checkPath.includes(pathname)) return null;

  if (isPreload) return null;

  return (
    <>
      {postModal && <StartThreadModal />}
      {commentModal && (
        <StartCommentModal threadItemProps={commentModalState} />
      )}
      {!disableNavbarPath.includes(pathname) && <Header />}
      <Loading />
      <div
        id="content"
        className={`${disableNavbarPath.includes(pathname) ? "mt-0" : "mt-[74px]"}  min-h-[calc(100vh-74px)]`}
      >
        <main className="md:px-text-white min-h-[calc(100vh-74px)] w-full max-w-7xl px-0 dark:bg-black dark:text-white md:mx-auto">
          {children}
        </main>
      </div>
      {!disableNavbarPath.includes(pathname) && <NavBottom />}
      {disableNavbarPath.includes(pathname) && <Footer />}
    </>
  );
}
