import { Work_Sans } from "next/font/google";
import { Rubik } from "next/font/google";
import { Component } from "@/components/component";

import { Cormorant_Garamond } from "next/font/google";
import { Libre_Franklin } from "next/font/google";
import { Chat } from "@/components/chat";

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

export default function Home() {
  return (
    <main className="font-">
      <Component />
      <Chat messages={message.messages} />
    </main>
  );
}
