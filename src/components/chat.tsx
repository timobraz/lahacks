import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Back } from "@/components/back";

interface ChatProps {
  messages: Message[];
}
interface Message {
  author: string;
  message: string;
}

interface ChatProps {
  messages: Message[];
}

export function Chat({ messages }: ChatProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-5">
      <div className="absolute top-5 left-5">
        <Back before="leaderboard" />
      </div>
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
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage alt="Chatbot 2" src="/chatbot2.png" />
                <AvatarFallback>CB2</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Chatbot 2</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Online
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-4">
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 ${
                      message.author === "bot1" ? "" : "justify-end"
                    }`}
                  >
                    {message.author === "bot1" ? (
                      <Avatar>
                        <AvatarImage alt="Chatbot 1" src="/chatbot1.png" />
                        <AvatarFallback>CB1</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="flex-1 space-y-2"></div>
                    )}
                    <div
                      className={`flex-1 space-y-2 ${
                        message.author === "bot1"
                          ? "bg-gray-100 dark:bg-gray-700"
                          : "bg-[#FFA7A7]"
                      } rounded-lg p-4 text-sm ${
                        message.author === "bot1" ? "" : "text-white"
                      }`}
                    >
                      <p>{message.message}</p>
                    </div>
                    {message.author === "bot2" ? (
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
          </div>
        </div>
      </div>
    </div>
  );
}
