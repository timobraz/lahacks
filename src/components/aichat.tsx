"use client";
import { useChat } from "ai/react";
import Messages from "@/components/messages";
import InputForm from "@/components/inputForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useEffect } from "react";

export function AIChat() {
  const { input, messages, handleInputChange, handleSubmit, isLoading, stop, reload } = useChat({
    api: "/api/genai",
    initialMessages: [
      {
        id: "1",
        content:
          "Your goal is to get to know the user extremely well - the user's personality, interests, values, communication style, and way of looking at the world. This information will be used to create an AI model that can authentically imitate the user for a dating service. Don't just go through a checklist of questions. Have a real back-and-forth conversation with the user, just as you would when getting to know someone new. Ask the user about their life, share anecdotes and opinions to get the user opening up, and feel free to go down conversational rabbit holes based on what interests the user.The key is building a comprehensive profile while keeping things feeling natural, like you're truly trying to understand who the user is as a person. Start with some icebreaker small talk, then transition between topics like the user's background, hobbies, philosophies, goals, senses of humor, and anything else that gives you helpful behavioral data.When the user inputs the phrase <<END OF CONVERSATION>>, then give a detailed report of the user and their personality and everything you have learned about them, including small things that you noticed that would help imitate the user.",
        role: "system",
      },
    ],
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-5">
      <div className="flex w-full max-w-4xl flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-800">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage alt="Chatbot 1" src="/chatbot1.png" />
                <AvatarFallback>CB1</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Chatbot 1</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Online</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage alt="Chatbot 2" src="/chatbot2.png" />
                <AvatarFallback>CB2</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Chatbot 2</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Online</div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <Messages messages={messages} isLoading={isLoading} />
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 p-3">
            <InputForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} input={input} isLoading={isLoading} stop={stop} />
          </div>
        </div>
      </div>
    </div>
  );
}
