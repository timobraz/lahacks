"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";
import UserContext from "./context";
export const useStore = () => {
  const queryUser = useCallback(async () => {
    const user = await supabase.from("users").select("*").eq("id", 1).single();
    if (user.error) {
      console.error("Error fetching user", user.error);
    } else {
      console.log("User", user.data);
      return user.data;
    }
  }, []);
  async function getConversations() {
    const { data, error } = await supabase.from("conversations").select("*").eq("user1", 1).or("user2=1");
    if (error) {
      console.error("Error fetching conversations", error);
    } else {
      console.log("Conversations", data);
    }
  }

  // useEffect(() => {
  //   getConversations();
  //   queryUser();
  // }, []);

  return { queryUser, getConversations };
};
