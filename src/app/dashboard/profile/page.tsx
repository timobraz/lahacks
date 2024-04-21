"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useStore } from "@/lib/hook";
import Link from "next/link";
import { JSX, SVGProps, useEffect, useState } from "react";

export const Page = () => {
  const { queryUser } = useStore();
  const [user, setUser] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    async function fetchUser() {
      const data = await queryUser();
      setUser(data);
    }
    fetchUser();
  }, []);

  console.log(user);
  return (
    <div className="w-full h-full bg-gray-50 ">
      <header className="lg:px-7 h-[63px] flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <HeartIcon className="h-6 w-6" />
          <span className="sr-only">Dating Site</span>
        </Link>
        <nav className="ml-auto flex gap-12 text-[#2e2e2e]">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/messages">
            Messages
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dateplanner">
            Date Planner
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard/profile">
            Profile
          </Link>
        </nav>
      </header>
      <div className="flex justify-center p-6 dark:bg-gray-900 pt-16 h-screen">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage alt="Profile Picture" src="/placeholder-avatar.jpg" />
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <div className="text-2xl font-bold">{user?.name}</div>
              <div className="text-gray-500 dark:text-gray-400">{user?.age} years old</div>
              <div className="text-gray-500 dark:text-gray-400">{user?.gender}</div>
              <div className="text-gray-500 dark:text-gray-400">{user?.genderPreference}</div>
              <div className="text-gray-500 dark:text-gray-400">{user?.location}</div>
              <div className="text-gray-500 dark:text-gray-400">{user?.musicGenre}</div>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>{user?.bio}</p>
            <div className="space-y-2">
              <div className="font-medium">Interests:</div>
              <div>{user?.interests}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img alt="Image 1" className="aspect-video rounded-md object-cover" height={200} src="/placeholder.svg" width={300} />
            <img alt="Image 2" className="aspect-video rounded-md object-cover" height={200} src="/placeholder.svg" width={300} />
            <img alt="Image 3" className="aspect-video rounded-md object-cover" height={200} src="/placeholder.svg" width={300} />
            <img alt="Image 4" className="aspect-video rounded-md object-cover" height={200} src="/placeholder.svg" width={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

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
