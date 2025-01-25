"use server";

import { createClient } from "@/supabase/server";
import { ChatMessage, Role } from "../types";

export async function getUniqueChatIds(): Promise<string[] | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_unique_chat_ids");

  if (error) {
    console.error("Error fetching unique chat IDs:", error);
    return null;
  }

  return data;
}

export async function fetchChatHistory(chatId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("chat_history")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .returns<ChatMessage[]>();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function saveMessage(message: string, role: Role, chatId: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("chat_history")
      .insert({ message, role, chat_id: chatId });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
