import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import Link from "next/link";

interface MatchProps {
  matches: Matches[];
}
interface Matches {
  name: string;
  compatibility: number;
}

export function Leaderboard({ matches }: MatchProps) {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4 ">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#2e2e2e]">Top Matches</h2>
        <p className="text-gray-500 dark:text-gray-400">
          These are the users most compatible with you.
        </p>
      </div>
      <div className="space-y-4">
        {matches
          .sort((a, b) => b.compatibility - a.compatibility)
          .map((match, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4 text-[#2e2e2e]"
              >
                <div className="flex items-center gap-4 w-full">
                  <Avatar>
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>{match.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{match.name}</h3>
                      <div className="text-sm font-medium text-primary">
                        {match.compatibility}%
                      </div>
                    </div>
                    <Progress
                      className="mt-1 h-3 color-[#2e2e2e]"
                      value={match.compatibility}
                    />
                  </div>
                </div>
                <Link href="/chat">
                  <Button size="icon" variant="outline">
                    <ArrowRightIcon className="h-4 w-4" />
                    <span className="sr-only">View {match.name}</span>
                  </Button>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function ArrowRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
