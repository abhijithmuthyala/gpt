"use server";

import { startChatSession } from "@/gemini/init";
import { formatHistory } from "@/utils/shared";
import { GoogleGenerativeAIFetchError } from "@google/generative-ai";
import { ChatMessage } from "../types";
import { saveMessage } from "./supabase";

export async function sendQuery(
  data: FormData,
  chatId: string,
  history: ChatMessage[],
) {
  try {
    const prompt = data.get("prompt") as string;
    const chatSession = startChatSession({ history: formatHistory(history) });
    const [result] = await Promise.all([
      chatSession.sendMessage(prompt),
      saveMessage(prompt, "user", chatId),
    ]);
    const response = result.response.text();
    await saveMessage(response, "model", chatId);
    return { error: null, response };
  } catch (error) {
    if (error instanceof GoogleGenerativeAIFetchError) {
      const message = error.errorDetails?.reduce((message, error) => {
        return message + (error.message ?? "") + " ";
      }, "") as string;

      return { response: null, error: message };
    }
    if (error instanceof Error) {
      return { response: null, error: error.message };
    }
    return { response: null, error: error as string };
  }
}
