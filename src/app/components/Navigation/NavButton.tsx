import React from "react";
import { useAppDispatch } from "@/app/states/hooks";
import { setPostModal } from "@/app/states/postModal/slice";

export default function NavButton({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const openModal = () => dispatch(setPostModal(true));
  return (
    <li className="text-2xl">
      <button
        type="button"
        className="block rounded-md px-3 py-3 duration-300 hover:bg-[rgba(200,200,200,.5)] dark:hover:bg-[rgba(70,_70,_70,_.7)] sm:px-5 "
        onClick={openModal}
      >
        {children}
      </button>
    </li>
  );
}
