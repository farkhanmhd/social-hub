import React from "react";
import { useAppDispatch } from "@/app/states/hooks";

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
        <button type="button" onClick={switchTheme} className={itemClass}>
          Light
        </button>
      </li>
      <li>
        <button type="button" onClick={switchTheme} className={itemClass}>
          Dark
        </button>
      </li>
      <li>
        <button type="button" onClick={switchTheme} className={itemClass}>
          System Default
        </button>
      </li>
    </>
  );
}
