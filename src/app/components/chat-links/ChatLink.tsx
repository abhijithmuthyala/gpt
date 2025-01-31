"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Accordian from "../Accordian";
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
    <div
      className={`hover:bg-amber-100 p-2 rounded-md ${isCurrentChat ? "bg-gray-200" : ""}`}
    >
      <Accordian
        title={<Link href={`/${id}`}>{children}</Link>}
        details={<ChatLinkActions id={id} />}
        toggle={<span>+</span>}
      />
    </div>
  );
}
