"use client";
import { useChat } from "ai/react";
import {
    Bot,
    Loader,
    Loader2,
    MoreHorizontal,
    Plus,
    Send,
    User2,
    X,
} from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import SelectedImages from "@/components/selectedImages";
import Messages from "@/components/messages";
import InputForm from "@/components/inputForm"

export default function Home() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
        useChat({
            api: "/api/genai",
        });

    return (
        <main className="flex min-h-screen flex-col items-center p-12 text-lg">
            <InputForm
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                stop={stop}
            />
            <Messages messages={messages} isLoading={isLoading} />
        </main>
    );
}