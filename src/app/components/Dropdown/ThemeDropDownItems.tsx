import React from "react";
import { useAppDispatch } from "@/app/states/hooks";
import {
  IoArrowBackOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoDesktopOutline,
} from "react-icons/io5";
import backToMainMenu from "../../utils/util";

export default function ThemeDropDownItems({
  itemClass,
}: {
  itemClass: string;
}) {
  const dispatch = useAppDispatch();

  const switchTheme = () => {};
  return (
    <>
      <li>
        <button
          type="button"
          onClick={() => backToMainMenu.backToMainMenu(dispatch)}
          className={itemClass}
        >
          <span>
            <IoArrowBackOutline />
          </span>
          <span>Back</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={switchTheme} className={itemClass}>
          <span>
            <IoSunnyOutline />
          </span>
          <span>Light</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={switchTheme} className={itemClass}>
          <span>
            <IoMoonOutline />
          </span>
          <span>Dark</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={switchTheme} className={itemClass}>
          <span>
            <IoDesktopOutline />
          </span>
          <span>System Default</span>
        </button>
      </li>
    </>
  );
}
