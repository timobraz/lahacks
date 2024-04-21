"use client";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import { Progress } from "@/components/ui/progress";
import { Leaderboard } from "./leaderboard";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export function Dashboard() {
  type DataType = {
    compatability: number;
    id: number;
    matchId: {
      age: string;
      name: string;
      interest: string;
    };
    // Add other user fields here
  };

  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    async function fetchCompatabilityData() {
      const { data, error } = await supabase
        .from("compatability")
        .select("*, matchId(*)")
        .order("compatability", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      console.log("Compatability data:", data);
      // Sort the data by the compatability field in descending order

      setData(data);
    }

    fetchCompatabilityData();
  }, []); // Empty array means this effect will run once on mount

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="lg:px-7 h-[63px] flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <HeartIcon className="h-6 w-6" />
          <span className="sr-only">Dating Site</span>
        </Link>
        <nav className="ml-auto flex gap-12 text-[#2e2e2e]">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/messages"
          >
            Messages
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/dateplanner"
          >
            Date Planner
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/dashboard/profile"
          >
            Profile
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-8 w-full">
        <h2 className="text-6xl font-corm mb-6 w-full items-center flex justify-center">
          Dashboard
        </h2>
        <h2 className="text-4xl font-corm mb-6 w-full">
          Top Matches of the Week
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.map((user) => (
            <UserCard
              compatability={user.compatability}
              age={user.matchId.age}
              name={user.matchId.name}
              interests={user.matchId.interest}
              key={user.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
type UserCardProps = {
  name: string;
  age: string;
  interests: string;
  compatability: number;
};

const UserCard: React.FC<UserCardProps> = ({
  name,
  age,
  interests,
  compatability,
}) => {
  return (
    <Link href="/chat/1">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div
          className="h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg')",
          }}
        />
        <div className="p-8">
          <h3 className="text-2xl ">{name}</h3>
          <p className="text-gray-400 mb-5 text-md">{age},</p>
          <div className="flex flex-col gap-3 mb-5">
            <p className="text-gray-500">
              <span className="text-gray-700">Interests: </span>
              {interests}
            </p>
          </div>
          <div className="flex flex-col items-center mt-2">
            <Progress
              className="mt-1 h-2 color-[#2e2e2e]"
              value={compatability}
            />
            <span className="ml-2">{compatability}% Compatible</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
