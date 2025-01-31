import { ChatMessage } from "@/app/types";
import { Content } from "@google/generative-ai";

export function formatHistory(history: ChatMessage[]) {
  const chatHistory: Content[] = [];
  for (const chat of history) {
    chatHistory.push({ role: chat.role, parts: [{ text: chat.message }] });
  }
  return chatHistory;
}
