"use client";
import UserContext from "@/lib/context";
import { useState } from "react";
export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<null | any>(null);
  const [conversations, setConversations] = useState<any[]>([]);

  return <UserContext.Provider value={{ setUser, user, conversations, setConversations }}>{children}</UserContext.Provider>;
}
