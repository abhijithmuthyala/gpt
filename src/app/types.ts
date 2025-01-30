import React from "react";

export type Role = "user" | "model";

export interface ChatMessage {
  message: string;
  role: Role;
  chat_id: string;
  created_at?: string;
  id?: number;
}

export interface Chat {
  message: string;
  role: Role;
}

export type PromptState = {
  error: string | null;
  response: string | null;
} | null;

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;
