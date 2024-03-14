import React from "react";

export default function Button({
  type,
  disabled,
  children,
}: {
  type: "submit" | "reset" | "button" | undefined;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const defaultClassName: string =
    "h-[36px] w-16 cursor-pointer rounded-full bg-black px-4 py-[6px] text-[12px] font-medium text-white sm:text-[15px]";

  const disabledClassName: string =
    "h-[36px] w-16 cursor-not-allowed rounded-full bg-[#b1b1b1] px-4 py-[6px] text-[12px] font-medium text-white sm:text-[15px]";
  return (
    <button
      type={type ? "button" : "submit"}
      className={disabled ? disabledClassName : defaultClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
