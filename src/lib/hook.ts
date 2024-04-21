"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";
import UserContext from "./context";
export const useStore = () => {
  const [topMatches, setTopMatches] = useState<any>([]);
  const [userId, setUserId] = useState<number>(1);
  const [user, setUser] = useState<any>(null);

  const queryUser = useCallback(async () => {
    const user = await supabase.from("users").select("*").eq("id", 1).single();
    if (user.error) {
      console.error("Error fetching user", user.error);
    } else {
      setUser(user.data);
    }
  }, [setUser]);
  async function getConversations() {
    const { data, error } = await supabase.from("conversations").select("*").eq("user1", 1).or("user2=1");
    if (error) {
      console.error("Error fetching conversations", error);
    } else {
      console.log("Conversations", data);
    }
  }

  useEffect(() => {
    getConversations();
    queryUser();
  }, [userId, queryUser]);

  return { userId, setUserId, user };
};
