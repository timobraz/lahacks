"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Back } from "@/components/back";
import { supabase } from "@/lib/supabase";
import { Dispatch, useEffect, useState } from "react";
import { Conversation } from "./leaderboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Message {
  author: {
    id: number;
    name: string;
  };
  message: string;
  id: number;
}

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

interface ChatProps {
  channelId: string;
}
export function Chat({ channelId }: ChatProps) {
  const [newMessage, handleNewMessage] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const fetchMessages = async (channelId: string) => {
    try {
      let { data: messages }: any = await supabase
        .from("messages")
        .select(`*, author:authorId(*)`)
        .eq("conversationId", channelId)
        .order("created_at", { ascending: true });
      setMessages(messages);
      return messages;
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchCoversation = async (channelId: string) => {
    try {
      let { data: conversations } = await supabase.from("conversations").select(`*, user1(*), user2(*)`).eq("id", channelId).single();
      console.log(conversations);
      setConversation(conversations);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMessages(channelId);
    fetchCoversation(channelId);
    const messageListener = supabase
      .channel("public:messages")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => handleNewMessage(payload.new))
      .subscribe();

    return () => {
      messageListener.unsubscribe();
    };
  }, [channelId]);

  useEffect(() => {
    console.log("newMessage", newMessage);
    if (newMessage && newMessage.conversationId === Number(channelId)) {
      const handleAsync = async () => {
        setMessages(messages.concat(newMessage));
      };
      handleAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-5">
      <div className="flex w-full max-w-4xl flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-800">
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage alt="Chatbot 1" src="/chatbot1.png" />
                <AvatarFallback>CB1</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{conversation?.user1.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Online</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage alt="Chatbot 2" src="/chatbot2.png" />
                <AvatarFallback>CB2</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{conversation?.user2.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Online</div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {messages === null || messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No messages yet. Start a new conversation!
              </div>
            ) : (
              <div className="grid gap-4">
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 ${message.author.id === 1 ? "" : "justify-end"
                        }`}
                    >
                      {message.author.id === 1 ? (
                        <Avatar>
                          <AvatarImage alt="Chatbot 1" src="/chatbot1.png" />
                          <AvatarFallback>CB1</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex-1 space-y-2"></div>
                      )}
                      <div
                        className={`flex-1 space-y-2 ${message.author.id === 1
                            ? "bg-gray-100 dark:bg-gray-700"
                            : "bg-[#FFA7A7]"
                          } rounded-lg p-4 text-sm ${message.author.id === 1 ? "" : "text-white"
                          }`}
                      >
                        <p>{message.message}</p>
                      </div>
                      {message.author.id === 2 ? (
                        <Avatar>
                          <AvatarImage alt="Chatbot 2" src="/chatbot2.png" />
                          <AvatarFallback>CB2</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex-1 space-y-2"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 p-3">
            <form className="flex items-center gap-2">
              <Input className="flex-1" placeholder="Type your message..." />
              <Button size="icon" type="submit">
                <SendIcon className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
