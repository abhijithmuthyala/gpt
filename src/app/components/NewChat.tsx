"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

export default function NewChat() {
  const chatId = uuid();
  const router = useRouter();

  async function createNewChat(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("Creating new chat ", chatId);

    router.push(`/${chatId}`);
  }

  return (
    <Button
      onClick={createNewChat}
      className="bg-lime-600 hover:bg-lime-700 scale-125"
    >
      Start a new chat
    </Button>
  );
}
