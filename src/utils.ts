import { Content } from "@google/generative-ai";
import React from "react";
import { ChatMessage } from "./app/types";

export function formatHistory(history: ChatMessage[]) {
  const chatHistory: Content[] = [];
  for (const chat of history) {
    chatHistory.push({ role: chat.role, parts: [{ text: chat.message }] });
  }
  return chatHistory;
}

export function stopPropagation(event: React.MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}
