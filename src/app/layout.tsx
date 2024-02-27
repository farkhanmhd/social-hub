"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Provider } from "react-redux";
import store from "./states";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </Provider>
    </React.StrictMode>
  );
}
