"use client";

import React, { useState } from "react";
import { Chat } from "@/components/chat";
import { Back } from "@/components/back";
import { Next } from "@/components/next";
import { Button } from "@/components/ui/button";

export const Page = () => {
  const [state, setState] = useState<"idle" | "started" | "ready">("idle");

  async function orchestrate() {
    setState("started")

    const response = await fetch("/api/start", {
      method: "POST",
    });

    const data = await response.json();
    setState("started");
  }

  return (
    <div className="flex justify-between bg-gray-100 dark:bg-gray-900 p-5 h-screen w-screen">
      <div className=" bg-gray-100 dark:bg-gray-900 p-5">
        <Back before="chat/1" />
      </div>
      <div className="flex flex-col">
        {
            state === "idle" ? <>
                <Button onClick={() => orchestrate()}>Start</Button>
                <h1>Start Matching</h1>
            </> : state === "started" ? <>
                <h1>Matching...</h1>
            </> : <>
                <h1>Match Found</h1>
            </>
        }
      </div>
      <div className={`bg-gray-100 dark:bg-gray-900 p-5 ${state !== "ready" && 'invisible'}`}>
        <Next after="/matching" />
      </div>
    </div>
  );
};

export default Page;
