import { notFound } from "next/navigation";
import { checkIfChatExists, fetchChatHistory } from "../../actions/supabase";
import ChatInterface from "../../components/chat-interface/ChatInterface";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;
  const [chatExists, chatHistory] = await Promise.all([
    checkIfChatExists(chatId),
    fetchChatHistory(chatId),
  ]);

  if (!chatHistory || !chatExists) {
    return notFound();
  }

  return (
    <main className="bg-gray-50 grid">
      <ChatInterface history={chatHistory} id={chatId} />
    </main>
  );
}
