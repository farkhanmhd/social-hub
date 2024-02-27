import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[620px] sm:mx-auto sm:px-6">{children}</div>;
}
