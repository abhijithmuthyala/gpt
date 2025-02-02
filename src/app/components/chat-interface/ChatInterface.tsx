"use client";

import { ChatMessage, Role } from "@/app/types";
import { updateChatSession } from "@/gemini/init";
import { formatHistory } from "@/utils/shared";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import Markdown from "react-markdown";
import PromptForm from "../PromptForm";

export default function ChatInterface({
  history,
  id,
}: {
  history: ChatMessage[];
  id: string;
}) {
  const [chats, setChats] = useState(history);
  const router = useRouter();

  useLayoutEffect(
    function syncChatSession() {
      updateChatSession({ history: formatHistory(history) });
    },
    [id, history]
  );

  function handlePrompt(prompt: string, role: Role) {
    setChats(function reduceChats(chats) {
      return [...chats, { message: prompt, role, chat_id: id }];
    });
    if (history.length === 0) {
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col justify-end gap-y-16 px-2 py-4">
      <Chats chats={chats} />
      <PromptForm onPrompt={handlePrompt} history={chats} />
    </div>
  );
}

function Chats({ chats }: { chats: ChatMessage[] }) {
  return (
    <ol className="flex flex-col gap-y-4">
      {chats.map((chat, index) => {
        const isUser = chat.role === "user";
        return (
          <li
            key={chat.id ?? index}
            className={`max-w-[75%] px-3 py-2 rounded-md ${isUser ? "self-end" : ""} ${
              isUser ? "bg-zinc-300" : "bg-lime-100"
            }`}
          >
            <div>
              <Markdown>{chat.message}</Markdown>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
