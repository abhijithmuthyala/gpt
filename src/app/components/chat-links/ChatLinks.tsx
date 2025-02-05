import { getChatTitles } from "@/app/actions/supabase";
import { SidebarSeparator } from "@/components/ui/sidebar";
import ChatLink from "./ChatLink";

export default async function ChatLinks() {
  const chats = await getChatTitles();

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
