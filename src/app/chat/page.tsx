"use client";
import React from "react";
import { Chat } from "@/components/chat";
import { Back } from "@/components/back";

export const Page = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 p-5 h-screen">
      <div className=" bg-gray-100 dark:bg-gray-900 p-5">
        <Back before="leaderboard" />
      </div>
      <Chat channelId={""} />
      <div className=" bg-gray-100 dark:bg-gray-900 p-5 invisible">
        <Back before="profile" />
      </div>
    </div>
  );
};

export default Page;
