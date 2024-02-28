import React from "react";

export default function ThreadButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="rounded-full p-2 hover:bg-black/5"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
