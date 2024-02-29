"use client";

import React from "react";
import Link from "next/link";
import { ThreadInterface } from "@/app/states/threads/slice";
import ThreadItem from "./ThreadItem";

export default function ThreadLink({
  threadWithOwner,
}: {
  threadWithOwner: ThreadInterface;
}) {
  return (
    <li className="border-t first:border-none">
      <Link href={`/${threadWithOwner.ownerId}/post/${threadWithOwner.id}`}>
        <ThreadItem threadItemProps={threadWithOwner} mode="thumb" />
      </Link>
    </li>
  );
}
