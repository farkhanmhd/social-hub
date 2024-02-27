import React from "react";
import { useAppDispatch } from "@/app/states/hooks";
import { IoArrowBackOutline } from "react-icons/io5";
import { backToMainMenu } from "../../utils/util";

export default function LanguageDropdownItems({
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
          onClick={() => backToMainMenu(dispatch)}
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
          <span>English</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={switchTheme} className={itemClass}>
          <span>Indonesia</span>
        </button>
      </li>
    </>
  );
}
