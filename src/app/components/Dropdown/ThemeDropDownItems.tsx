import React from "react";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { useAppDispatch } from "@/app/states/hooks";
import {
  IoArrowBackOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";
import { setTheme } from "@/app/states/theme/slice";
import { backToMainMenu } from "../../utils/util";

export default function ThemeDropDownItems({
  itemClass,
}: {
  itemClass: string;
}) {
  const dispatch = useAppDispatch();

  const setThemeLight = () => {
    dispatch(setTheme("light"));
    document.documentElement.classList.replace("dark", "light");
    document.documentElement.classList.add("light");
    localStorage.theme = "light";
  };

  const setThemeDark = () => {
    dispatch(setTheme("dark"));
    document.documentElement.classList.replace("light", "dark");
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  };

  const { language } = useReduxSelector();

  return (
    <>
      <li>
        <button
          type="button"
          onClick={() => backToMainMenu(dispatch)}
          className={itemClass}
        >
          <span>
            <IoArrowBackOutline />
          </span>
          <span>{language === "en" ? "Back" : "Kembali"}</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={setThemeLight} className={itemClass}>
          <span>
            <IoSunnyOutline />
          </span>
          <span>{language === "en" ? "Light" : "Terang"}</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={setThemeDark} className={itemClass}>
          <span>
            <IoMoonOutline />
          </span>
          <span>{language === "en" ? "Dark" : "Gelap"}</span>
        </button>
      </li>
    </>
  );
}
