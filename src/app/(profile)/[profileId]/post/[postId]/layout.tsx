import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Hub by FarkhanMhd",
  description: "Generated by create next app",
  authors: [{ name: "Farkhan Muhammad", url: "https://github.com/farkhanmhd" }],
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-74px)] flex-col items-stretch pb-[64px] md:mx-auto md:max-w-[620px]">
      {children}
    </div>
  );
}
