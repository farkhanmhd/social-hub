import React from "react";
import { useAppDispatch } from "@/app/states/hooks";
import { IoArrowBackOutline } from "react-icons/io5";
import { setLanguage } from "@/app/states/language/slice";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { backToMainMenu } from "../../utils/util";

export default function LanguageDropdownItems({
  itemClass,
}: {
  itemClass: string;
}) {
  const dispatch = useAppDispatch();
  const { language } = useReduxSelector();

  const switchLanguageEnglish = () => {
    dispatch(setLanguage("en"));
    document.documentElement.lang = "en";
    localStorage.setItem("language", "en");
  };
  const switchLanguageIndonesia = () => {
    dispatch(setLanguage("id"));
    document.documentElement.lang = "id";
    localStorage.setItem("language", "id");
  };

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
        <button
          type="button"
          onClick={switchLanguageEnglish}
          className={itemClass}
        >
          <span>{language === "en" ? "English" : "Bahasa Inggris"}</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={switchLanguageIndonesia}
          className={itemClass}
        >
          <span>{language === "en" ? "Indonesian" : "Bahasa Indonesia"}</span>
        </button>
      </li>
    </>
  );
}
