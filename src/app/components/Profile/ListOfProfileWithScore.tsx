import React from "react";
import Link from "next/link";
import { LeaderboardInterface } from "../../states/leaderboard/slice";
import ProfileWithScore from "./ProfileWIthScore";

export default function ListOfProfileWithScore({
  leaderboard,
}: {
  leaderboard: LeaderboardInterface[];
}) {
  return (
    <div id="leaderboard">
      <ul id="leaderboard-container" className="flex flex-col gap-y-2">
        {leaderboard.map((user: LeaderboardInterface) => (
          <li className="mx-5">
            <Link href={`/${user.user.id}`}>
              <ProfileWithScore
                key={user.user.id}
                name={user.user.name}
                avatar={user.user.avatar}
                score={user.score}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
