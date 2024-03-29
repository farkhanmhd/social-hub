import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile",
  description: "Generated by create next app",
  authors: [{ name: "Farkhan Muhammad", url: "https://github.com/farkhanmhd" }],
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-74px)] flex-col items-stretch pb-[60px] md:mx-auto md:max-w-[620px] md:px-6 md:pb-0">
      {children}
    </div>
  );
}
