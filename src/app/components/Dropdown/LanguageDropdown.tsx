import React from "react";
import { useAppDispatch } from "@/app/states/hooks";
import {
  IoChevronBack,
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
            <IoChevronBack />
          </span>
          <span>Back</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={switchTheme} className={itemClass}>
          <span>
            <IoMoonOutline />
          </span>
          <span>English</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={switchTheme} className={itemClass}>
          <span>
            <IoDesktopOutline />
          </span>
          <span>Indonesia</span>
        </button>
      </li>
    </>
  );
}
