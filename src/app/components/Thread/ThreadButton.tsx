import React from "react";

export default function ThreadButton({
  onClick,
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="rounded-full p-2 text-xl hover:bg-black/5"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
