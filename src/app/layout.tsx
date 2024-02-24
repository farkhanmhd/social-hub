import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Hub by FarkhanMhd",
  description: "Generated by create next app",
  authors: [{ name: "Farkhan Muhammad", url: "https://github.com/farkhanmhd" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </React.StrictMode>
  );
}
