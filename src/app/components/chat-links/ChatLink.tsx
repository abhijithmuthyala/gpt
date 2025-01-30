"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import ChatLinkActions from "./ChatLinkActions";

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
    <div className="relative">
      <Link
        href={`/${id}`}
        className={`p-2 grid grid-cols-[75%] hover:bg-gray-200 rounded-md ${
          isCurrentChat ? "bg-gray-200" : ""
        }`}
      >
        {children}
      </Link>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 ">
        <ChatLinkActions id={id} />
      </div>
    </div>
  );
}
