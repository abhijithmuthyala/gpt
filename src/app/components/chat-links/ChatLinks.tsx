import { getUniqueChatIds } from "@/app/actions/supabase";
import ChatLink from "./ChatLink";

export default async function ChatLinks() {
  const chatIds = await getUniqueChatIds();

  return (
    <ul className="flex flex-col gap-y-2">
      {chatIds?.map(function renderLink(chatId) {
        return (
          <li key={chatId}>
            <ChatLink id={chatId}>{chatId}</ChatLink>
          </li>
        );
      })}
    </ul>
  );
}
