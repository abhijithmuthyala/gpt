"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Accordian from "../Accordian";
import ChatTitleForm from "../ChatTitleForm";
import DeleteChat from "../DeleteChat";
import EditChat from "../EditChat";
import { ChatActionsMenu } from "./ChatLinkActions";

export default function ChatLink({
  id,
  title,
}: Readonly<{
  id: string;
  title: string;
}>) {
  const params = useParams();
  const isCurrentChat = id === params.chatId;
  const [isEditing, setIsEditing] = useState(false);
  const [actionIsPending, setActionIsPending] = useState(false);

  let content;
  if (isEditing) {
    content = (
      <ChatTitleForm
        onSubmit={handlePendingAction}
        onSuccess={handleResolvedAction}
        onToggle={toggleTitleEdit}
        id={id}
        title={title}
      />
    );
  } else {
    content = (
      <Accordian
        title={
          <Link href={`/${id}`} className="pr-10">
            {title}
          </Link>
        }
        details={function renderDetails(toggleAccordian) {
          return (
            <ChatActionsMenu>
              <DeleteChat
                onDelete={onDelete.bind(null, toggleAccordian)}
                id={id}
              />
              <EditChat onToggle={toggleTitleEdit} />
            </ChatActionsMenu>
          );
        }}
        toggleClosed={<ChevronDown className="w-2" />}
        toggleOpened={<ChevronUp className="w-2" />}
      />
    );
  }

  return (
    <div
      className={`hover:bg-slate-100 focus-within:bg-slate-100 p-2 rounded-md ${isCurrentChat ? "bg-slate-200 focus-within:bg-slate-200 hover:bg-slate-200" : "bg-zinc-50"} ${
        actionIsPending ? "opacity-50 pointer-events-none animate-pulse" : ""
      }`}
    >
      {content}
    </div>
  );

  function handlePendingAction() {
    setIsEditing(false);
    setActionIsPending(true);
  }

  function toggleTitleEdit() {
    setIsEditing((e) => !e);
  }

  function handleResolvedAction() {
    setActionIsPending(false);
  }

  function onDelete(toggleAccordian: () => void) {
    setActionIsPending(true);
    toggleAccordian();
  }
}
