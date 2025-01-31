import { notFound } from "next/navigation";
import { fetchChatHistory } from "../../actions/supabase";
import ChatInterface from "../../components/chat-interface/ChatInterface";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  if (typeof chatId !== "string") {
    return notFound();
  }
  const chatHistory = await fetchChatHistory(chatId);

  if (!chatHistory) {
    return notFound();
  }

  return (
    <main className="bg-gray-50 grid">
      <ChatInterface history={chatHistory} id={chatId} />
    </main>
  );
}
