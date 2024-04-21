import React from "react";
import { Leaderboard } from "@/components/leaderboard";
import { Back } from "@/components/back";
const matches = {
  matches: [
    { name: "Olivia Davis", compatibility: 92 },
    { name: "John Doe", compatibility: 88 },
    { name: "Emily Martinez", compatibility: 84 },
    { name: "Alex Smith", compatibility: 80 },
  ],
};

export const Page = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 p-5">
      <Back before="profile" />
      <div className="flex w-1/2 pb-10 border-2 rounded-lg p-5 absolute left-1/4 top-1/4 bg-white">
        <Leaderboard />
      </div>
    </div>
  );
};

export default Page;
