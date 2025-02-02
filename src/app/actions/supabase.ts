"use server";

import { createClient } from "@/supabase/server";
import { ChatMessage, Role } from "../types";

export async function getChatTitles(): Promise<
  { id: string; chat_id: string; title: string }[] | null
> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_chat_titles");

  if (error) {
    console.error("Error fetching chat titles:", error);
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

export async function deleteChat(chatId: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("delete_chat", { p_chat_id: chatId });

  if (error) {
    return { error };
  }

  return { error: null };
}
