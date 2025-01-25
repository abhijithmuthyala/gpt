"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    // return error;
  }

  // revalidatePath('/', 'layout')
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    // return error;
  }

  // revalidatePath('/', 'layout')
  redirect("/");
}
