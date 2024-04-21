import React from "react";
import { Chat } from "@/components/chat";

export const Page = ({ params }: any) => {
  return (
    <div>
      <Chat channelId={params.id} />
    </div>
  );
};

export default Page;
