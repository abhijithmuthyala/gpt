"use client";

import { ChatMessage, Role } from "@/app/types";
import { updateChatSession } from "@/gemini/init";
import { formatHistory } from "@/utils/shared";
import { Bot, User } from "lucide-react";
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
  const [renderModelLoading, setRenderModelLoading] = useState(false);

  const router = useRouter();

  useLayoutEffect(
    function syncChatSession() {
      updateChatSession({ history: formatHistory(history) });
    },
    [id, history],
  );

  function handlePrompt(prompt: string, role: Role) {
    setChats(function reduceChats(chats) {
      return [...chats, { message: prompt, role, chat_id: id }];
    });
    setRenderModelLoading(role === "user");

    if (history.length === 0) {
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col justify-end gap-y-16 px-2 py-4">
      <Chats chats={chats} renderModelLoading={renderModelLoading} />
      <PromptForm onPrompt={handlePrompt} history={chats} />
    </div>
  );
}

function Chats({
  chats,
  renderModelLoading,
}: {
  chats: ChatMessage[];
  renderModelLoading: boolean;
}) {
  return (
    <ol className="flex flex-col gap-y-4">
      {chats.map((chat, index) => {
        const isUser = chat.role === "user";
        return (
          <li
            key={chat.id ?? index}
            ref={function scrollToLastNode(node) {
              if (node && index === chats.length - 1 && isUser) {
                node.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`max-w-[75%] overflow-x-auto px-3 py-2 rounded-md flex gap-2 ${
              isUser ? "self-end bg-blue-100" : "bg-zinc-100"
            }`}
          >
            {isUser ? (
              <User className="w-5 h-5 shrink-0 text-blue-800" />
            ) : (
              <Bot className="w-5 h-5 shrink-0 text-zinc-800" />
            )}
            <div>
              <Markdown>{chat.message}</Markdown>
            </div>
          </li>
        );
      })}
      {renderModelLoading && (
        <li
          key={"model-loading-skeleton"}
          className="px-3 py-2 rounded-md flex gap-2 bg-zinc-100 items center"
        >
          <Bot className="w-5 h-5 shrink-0 text-zinc-800 animate-bounce" />
          <p className="animate-pulse">Gemini is thinking...</p>
        </li>
      )}
    </ol>
  );
}
