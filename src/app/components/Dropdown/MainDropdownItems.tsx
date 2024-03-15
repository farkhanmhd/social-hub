import React from "react";
import Link from "next/link";
import { IoBarChart, IoLanguage, IoDesktopOutline, IoLogOutOutline } from "react-icons/io5";
import useReduxSelector from "../../hooks/useReduxSelector";
import { useAppDispatch } from "../../states/hooks";
import { asyncUnsetAuthUser } from "../../states/authUser/thunk";
import { setThreads } from "../../states/threads/slice";
import { setDropDownMode } from "../../states/dropDownMode/slice";

export default function MainDropdownItems({ itemClass }: { itemClass: string }) {
  const dispatch = useAppDispatch();
  const { language } = useReduxSelector();

  const onLogout = () => {
    dispatch(setThreads([]));
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <>
      <li>
        <Link className={itemClass} href="/leaderboard">
          <span>
            <IoBarChart />
          </span>
          <span>Leaderboard</span>
        </Link>
      </li>
      <li>
        <button
          type="button"
          onClick={() => dispatch(setDropDownMode("theme"))}
          className={itemClass}
        >
          <span>
            <IoDesktopOutline />
          </span>
          <span>{language === "id" ? "Tema" : "Theme"}</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => dispatch(setDropDownMode("language"))}
          className={itemClass}
        >
          <span>
            <IoLanguage />
          </span>
          <span>{language === "id" ? "Bahasa" : "Language"}</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={onLogout} className={itemClass}>
          <span>
            <IoLogOutOutline />
          </span>
          <span>{language === "id" ? "Keluar" : "Logout"}</span>
        </button>
      </li>
    </>
  );
}
