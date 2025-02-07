import { getChatTitles } from "@/app/actions/supabase";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { BotMessageSquare } from "lucide-react";
import ChatLink from "./ChatLink";

export default async function ChatLinks() {
  const chats = await getChatTitles();

  if (chats?.length === 0) {
    return (
      <div className="grid place-items-center place-content-center gap-y-2 h-full">
        <BotMessageSquare className="animate-bounce" />
        <p className="text-lime-800">No chats yet</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-y-2">
      {chats?.map(function renderLink(chat, index) {
        return (
          <li key={chat.id} className="flex flex-col gap-y-1">
            <ChatLink id={chat.chat_id} title={chat.title} />
            {index !== chats.length - 1 && <SidebarSeparator />}
          </li>
        );
      })}
    </ul>
  );
}
