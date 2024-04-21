import { useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";
import UserContext from "./context";
export const useStore = () => {
  const [topMatches, setTopMatches] = useState<any>([]);
  const [userId, setUserId] = useState<number>(1);
  const { setUser } = useContext(UserContext);

  const queryUser = useCallback(async () => {
    const user = await supabase.from("users").select("*").eq("id", userId).single();
    if (user.error) {
      console.error("Error fetching user", user.error);
    } else {
      setUser(user.data);
    }
  }, [userId, setUser]);
  async function getConversations() {
    const { data, error } = await supabase.from("conversations").select("*");
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

  return { topMatches, setTopMatches, userId, setUserId };
};
