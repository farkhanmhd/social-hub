import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:mx-auto md:max-w-[620px] md:px-6">{children}</div>
  );
}
