"use client";
import React from "react";
import { Chat } from "@/components/chat";
import { Back } from "@/components/back";
import { Next } from "@/components/next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useChat } from "ai/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import SelectedImages from "@/components/selectedImages";
import Messages from "@/components/messages";
import InputForm from "@/components/inputForm";
import { AIChat } from "@/components/aichat";

const message = {
  messages: [
    { author: "bot1", message: "Hi I am bot1" },
    {
      author: "bot2",
      message: "Hi I am bot 2, nice to meet you. How are you?",
    },
    { author: "bot1", message: "Well I am a Gemini wrapper lol" },
    { author: "bot2", message: "Lol I am too" },
    { author: "bot1", message: "Haha" },
    { author: "bot1", message: "Haha" },
    { author: "bot2", message: "lol." },
    { author: "bot2", message: "lol." },
    { author: "bot2", message: "lol." },
    { author: "bot2", message: "lol." },
    { author: "bot2", message: "lol." },
  ],
};

export const Page = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 p-5 h-screen">
      <div className=" bg-gray-100 dark:bg-gray-900 p-5">
        <Back before="profile" />
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center gap-[50px]">
        <div className="font-corm flex flex-col items-center gap-3">
          <div className="text-5xl">Time to Finalize Details.</div>
          <div className="text-2xl text-gray-500">Tell the Chatbot About Yourself!</div>
        </div>
        <div className="h-2/3 w-full">
          <AIChat />
        </div>
      </div>

      <div className="ml-auto bg-gray-100 dark:bg-gray-900 p-5">
        <Next after="dashboard" />
      </div>
    </div>
  );
};

export default Page;
