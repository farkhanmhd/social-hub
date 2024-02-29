import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Hub by FarkhanMhd",
  description: "Generated by create next app",
  authors: [{ name: "Farkhan Muhammad", url: "https://github.com/farkhanmhd" }],
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:mx-auto md:max-w-[620px] md:px-6">{children}</div>
  );
}
