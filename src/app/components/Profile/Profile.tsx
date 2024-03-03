import React from "react";
import Image from "next/image";

export default function Profile({
  name,
  avatar,
}: {
  name: string;
  avatar: string;
}) {
  return (
    <div
      id="profile"
      className="flex flex-grow-0 items-center justify-between p-3"
    >
      <div className="profile-detail">
        <h1 className="text-2xl font-semibold">{name}</h1>
      </div>
      <div className="w-[64px] overflow-hidden rounded-full ">
        <Image src={avatar} alt="profile" width={64} height={64} />
      </div>
    </div>
  );
}
