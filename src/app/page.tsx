import { createClient } from "@/supabase/server";
import { notFound } from "next/navigation";

export default async function Page() {
  const { auth } = await createClient();
  const { data, error } = await auth.getUser();

  if (error) {
    return notFound();
  }

  const userName = (data.user.email as string).split("@")[0];

  return (
    <div>
      <h1>Hello, {userName}!</h1>
    </div>
  );
}
