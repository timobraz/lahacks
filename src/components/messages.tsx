import React from "react";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

type Props = {
    messages: Message[];
    isLoading: boolean;
};

const Messages = ({ messages, isLoading }: Props) => {
    return (
        <div className="flex flex-col w-full text-left mt-4 gap-4 whitespace-pre-wrap">
            {messages.map((m, index) => {
                return (
                    <div
                        key={index}
                        className={`p-4 shadow-md rounded-md ml-10 relative ${m.role === "user" ? "" : "justify-end"
                            }`}
                    >
                        <p>{m.content}</p>
                    </div>

        //             <div
        //     key={index}
        //     className={`p-4 shadow-md rounded-md ml-10 relative ${
        //         m.role === "user" ? "" : "justify-end"
        //     }`}
        //   >
        //     {m.role === "user" ? (
        //       <Avatar>
        //         <AvatarImage alt="Chatbot 1" src="/chatbot1.png" />
        //         <AvatarFallback>CB1</AvatarFallback>
        //       </Avatar>
        //     ) : m.role ? (
        //       <>
        //         <div className="flex-1"></div>
        //         <div className={`flex-1 bg-[#FFA7A7] rounded-lg p-4 text-sm text-white`}>
        //           <p>{m.content}</p>
        //         </div>
        //         <Avatar>
        //           <AvatarImage alt="Chatbot 2" src="/chatbot2.png" />
        //           <AvatarFallback>CB2</AvatarFallback>
        //         </Avatar>
        //       </>
        //     ) : null}
        //   </div>

                    

                );
            })}
        </div>
    );
};

export default Messages;