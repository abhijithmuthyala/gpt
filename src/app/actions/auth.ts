"use server";

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

import { z } from 'zod';
import { FormState } from "../types";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6).regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{7,}$"), { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and be at least 6 characters long" }),
});


export async function login(formState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const sanityErrors = loginSchema.safeParse(data);
  if (!sanityErrors.success) {
    return { errors: sanityErrors.error.flatten(), success: false, data }
  }

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { errors: { formErrors: [error.message] }, success: false, data }
  }

  redirect("/");
}

export async function signup(formState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const sanityErrors = loginSchema.safeParse(data);
  if (!sanityErrors.success) {
    return { errors: sanityErrors.error.flatten(), success: false, data }
  }

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { errors: { formErrors: [error.message] }, success: false, data }
  }

  redirect("/");
}
