"use client";

import { Back } from "@/components/back";
import { Chat } from "@/components/chat";
import { Next } from "@/components/next";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Matching({ user_id } : { user_id: number }) {
  const [convos, setConvos] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchConvos() {
      const { data: newConvos } = await supabase
        .from("conversations")
        .select("*")
        .eq("user1", 1);

      setConvos(newConvos);
      console.log(newConvos)
    }

    fetchConvos();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-5 h-screen">
      <div className="w-full flex flex-row justify-between">
        <div className=" bg-gray-100 dark:bg-gray-900 p-5">
          <Back before="dashboard" />
        </div>
        <div className=" bg-gray-100 dark:bg-gray-900 p-5">
          <Next after="dashboard" />
        </div>
      </div>
      {convos && [0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex flex-row justify-between">
          <div></div>
          {[0, 1].map((j) => (
            <Chat key={2 * i + j} channelId={convos[2 * i + j].id} interactable={false} />
          ))}
          <div></div>
        </div>
      ))}
    </div>
  );
}
