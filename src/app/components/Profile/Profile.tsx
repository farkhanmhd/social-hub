import React from "react";
import Image from "next/image";

export default function Profile({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) {
  return (
    <div
      id="profile"
      className="flex flex-grow-0 items-center justify-between border-b p-3"
    >
      <div className="profile-detail">
        <h1 className="mb-2 text-2xl font-semibold">{name}</h1>
        <h2 className="text-sm">{email}</h2>
      </div>
      <div className="w-[64px] overflow-hidden rounded-full md:w-[84px] ">
        <Image src={image} alt="profile" width={84} height={84} />
      </div>
    </div>
  );
}
