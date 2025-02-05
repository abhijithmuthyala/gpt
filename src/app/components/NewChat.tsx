"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

export default function NewChat() {
  const chatId = uuid();
  const router = useRouter();

  async function createNewChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push(`/${chatId}`);
  }

  return (
    <Button onClick={createNewChat} variant={"default"}>
      Start a new chat
    </Button>
  );
}
