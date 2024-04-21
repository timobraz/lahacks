"use client";
import React from "react";
import { Chat } from "@/components/chat";
import { Back } from "@/components/back";
import { Next } from "@/components/next";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

function SendIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    )
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