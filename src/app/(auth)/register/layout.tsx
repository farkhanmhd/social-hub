import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register to SocialHub",
  description: "Register page of SocialHub",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
