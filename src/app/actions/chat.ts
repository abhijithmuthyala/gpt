"use server";

import { model } from "@/gemini/init";
import { GoogleGenerativeAIFetchError } from "@google/generative-ai";
import { saveMessage } from "./supabase";

export async function sendQuery(data: FormData, chatId: string) {
  try {
    const prompt = data.get("prompt") as string;
    const [result] = await Promise.all([
      model.generateContent(prompt),
      saveMessage(prompt, "user", chatId),
    ]);
    const response = result.response.text();
    await saveMessage(response, "assistant", chatId);
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
