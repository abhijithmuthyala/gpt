"use client";

import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

export default function NewChat() {
  const chatId = uuid();
  const router = useRouter();

  async function createNewChat(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    router.push(`/${chatId}`);
  }

  return (
    <a
      // href={`/${chatId}`}
      onClick={createNewChat}
      className="px-3 py-2 rounded-md bg-lime-500 text-white"
    >
      Start a new chat
    </a>
  );
}
