import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export interface Conversation {
  match: number;
  id: number;
  user1: {
    id: number;
    name: string;
  };
  user2: {
    id: number;
    name: string;
  };
}
export const fetchConvos = async () => {
  try {
    let { data: conversations }: any = await supabase.from("conversations").select("id, match, user1(name, id), user2(name, id)");
    console.log("data", conversations);
    return conversations as Conversation[];
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export async function Leaderboard() {
  const matches: Conversation[] = (await fetchConvos()) as Conversation[];
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4 ">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#2e2e2e]">Top Matches</h2>
        <p className="text-gray-500 dark:text-gray-400">These are the users most compatible with you.</p>
      </div>
      <div className="space-y-4">
        {matches &&
          matches
            .sort((a: Conversation, b: Conversation) => b.match - a.match)
            .map((match) => {
              return (
                <div key={match.id} className="flex items-center justify-between gap-4 text-[#2e2e2e]">
                  <div className="flex items-center gap-4 w-full">
                    <Avatar>
                      <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                      <AvatarFallback>{match.user1.name}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{match.user2.name}</h3>
                        <div className="text-sm font-medium text-primary">{match.match * 100}%</div>
                      </div>
                      <Progress className="mt-1 h-3 color-[#2e2e2e]" value={match.match * 100} />
                    </div>
                  </div>
                  <Link href={"/chat/" + match.id}>
                    <Button size="icon" variant="outline">
                      <ArrowRightIcon className="h-4 w-4" />
                      <span className="sr-only">View {match.user2.name}</span>
                    </Button>
                  </Link>
                </div>
              );
            })}
      </div>
    </div>
  );
}

function ArrowRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
