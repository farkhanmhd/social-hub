import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full p-5 text-center" data-testid="footer">
      <p>
        Copyright 2024. by{" "}
        <Link href="https://farkhanmhd.vercel.app" target="_blank" className="text-blue-500">
          Farkhan Muhammad
        </Link>{" "}
        All rights reserved.
      </p>
    </footer>
  );
}
