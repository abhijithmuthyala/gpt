"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ChatLink({
  id,
  children,
}: Readonly<{
  id: string;
  children: React.ReactNode;
}>) {
  const params = useParams();
  const isCurrentChat = id === params.chatId;

  return (
    <Link
      href={`/${id}`}
      className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 ${
        isCurrentChat ? "bg-gray-200" : ""
      }`}
    >
      {children}
    </Link>
  );
}
