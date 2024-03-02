import React from "react";
import Image from "next/image";

export default function ProfileWithScore({
  name,
  avatar,
  score,
}: {
  name: string;
  avatar: string;
  score: number;
}) {
  return (
    <div
      id="profile"
      className="flex flex-grow-0 items-center justify-between rounded-xl border-b p-3 duration-300 last-of-type:border-0 hover:shadow-md"
    >
      <div className="profile-detail flex items-center">
        <div className="mr-4 w-[53px] overflow-hidden">
          <Image
            src={avatar}
            alt="profile"
            width={53}
            height={53}
            className="rounded-full"
          />
        </div>
        <h1 className="text-xl font-semibold">{name}</h1>
      </div>
      <div>
        <h1 className="text-xl font-semibold">{score}</h1>
      </div>
    </div>
  );
}
