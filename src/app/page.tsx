import { Component } from "@/components/component";

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

const matches = {
  matches: [
    { name: "Olivia Davis", compatibility: 92 },
    { name: "John Doe", compatibility: 88 },
    { name: "Emily Martinez", compatibility: 84 },
    { name: "Alex Smith", compatibility: 80 },
  ],
};

export default function Home() {
  return (
    <main className="font-">
      <Component />
    </main>
  );
}
