"use client";
import React from "react";
import { Chat } from "@/components/chat";
import { Back } from "@/components/back";
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
    <div className="">
      <Chat {...message} />
    </div>
  );
};

export default Page;
