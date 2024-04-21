"use client";
import React from "react";
import { Chat } from "@/components/chat";
import { Back } from "@/components/back";
import { Next } from "@/components/next";
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
        <div className="flex bg-gray-100 dark:bg-gray-900 p-5">
            <div className=" bg-gray-100 dark:bg-gray-900 p-5">
                <Back before="profile" />
            </div>
            <Chat {...message} />
            <div className="ml-auto bg-gray-100 dark:bg-gray-900 p-5">
                <Next after="leaderboard" />
            </div>
        </div>
    );
};

export default Page;