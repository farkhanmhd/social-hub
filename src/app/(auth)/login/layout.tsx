import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in to SocialHub",
  description: "Login page of SocialHub",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
