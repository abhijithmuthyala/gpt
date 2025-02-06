import React from "react";
import { z, ZodError } from "zod";

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


export type Fields = {
  email: string;
  password: string;
};

export type FormState = {
  success: boolean;
  data: Fields
  errors: Partial<z.typeToFlattenedError<Fields, string>> | null;
};

export type ActionFunction<T> = (


  formState: FormState,
  formData: FormData
) => Promise<T>;

export type FormActionType = "login" | "signup";


type SafeParseBase = {
  success: boolean;
  data?: never;
  error?: never;
};

export declare type SafeParseSuccessOutput<Output> = SafeParseBase & {
  success: true;
  data: Output;
};

export declare type SafeParseError<Input> = SafeParseBase & {
  success: false;
  error: ZodError<Input>;
};