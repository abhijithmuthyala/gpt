"use server";

import { v4 as uuid } from "uuid";

import { startChatSession } from "@/gemini/init";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
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

export async function startNewChat() {
  const id = uuid();
  const supabase = await createClient();
  const { error } = await supabase.from("chats").insert({
    chat_id: id,
  });
  if (error) {
    console.error("Error inserting chat:", error);
  }
  redirect(`/${id}`);
}

export async function checkIfChatExists(chatId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("chats")
    .select("chat_id")
    .eq("chat_id", chatId)
    .single();

  if (error === null) {
    return true;
  } else {
    return false;
  }
}

export async function updateChatTitle(
  chatId: string,
  title: string,
  trim = false,
) {
  const chatSession = startChatSession({ history: [] });
  const resultProm = trim
    ? chatSession.sendMessage(
        "Return an extremely concise version of the following prompt so that I can use it in a sidebar: \n" +
          title,
      )
    : Promise.resolve({
        response: {
          text() {
            return title;
          },
        },
      });

  const [supabase, result] = await Promise.all([createClient(), resultProm]);

  const { data, error } = await supabase
    .from("chats")
    .update({ title: result.response.text() })
    .eq("chat_id", chatId)
    .single();

  if (error) {
    console.error(error);
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
