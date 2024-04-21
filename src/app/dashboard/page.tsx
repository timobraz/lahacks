import React from "react";
import { Leaderboard } from "@/components/leaderboard";
import { Back } from "@/components/back";
import { Dashboard } from "@/components/dashboard";
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
      <Dashboard />
    </div>
  );
};

export default Page;
