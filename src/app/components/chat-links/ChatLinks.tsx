import { getChatTitles } from "@/app/actions/supabase";
import ChatLink from "./ChatLink";

export default async function ChatLinks() {
  const chats = await getChatTitles();

  return (
    <ul className="flex flex-col gap-y-2">
      {chats?.map(function renderLink(chat) {
        return (
          <li key={chat.id}>
            <ChatLink id={chat.chat_id}>{chat.title}</ChatLink>
          </li>
        );
      })}
    </ul>
  );
}
