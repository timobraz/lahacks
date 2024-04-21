import React from "react";
import { Chat } from "@/components/chat";
import { Back } from "@/components/back";
import { Next } from "@/components/next";

export const Page = ({ params }: any) => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 p-5 h-screen">
      <div className=" bg-gray-100 dark:bg-gray-900 p-5">
        <Back before="../dashboard" />
      </div>
      <Chat channelId={params.id} interactable={true} />
      <div className=" bg-gray-100 dark:bg-gray-900 p-5">
        <Next after="/start" />
      </div>
    </div>
  );
};

export default Page;
