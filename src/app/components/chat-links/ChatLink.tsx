"use client";

import { updateChatTitle } from "@/app/actions/supabase";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Accordian from "../Accordian";
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

  function toggleTitleEdit() {
    setIsEditing((e) => !e);
  }

  function onDelete(toggleAccordian: () => void) {
    setActionIsPending(true);
    toggleAccordian();
  }

  let content;
  if (isEditing) {
    content = (
      <ChatTitleForm onToggleEdit={toggleTitleEdit} id={id} title={title} />
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
}

function ChatTitleForm({
  title,
  id,
  onToggleEdit,
}: {
  title: string;
  id: string;
  onToggleEdit: () => void;
}) {
  const router = useRouter();

  async function updateTitleAction(formData: FormData) {
    const newTitle = formData.get("title") as string;
    await updateChatTitle(id, newTitle);

    /*
    Another transition is needed after await.
    This batches the updates from client and the server in one render pass.
    */
    startTransition(function updateClientAndServerComponentInATransition() {
      router.refresh();
      onToggleEdit();
    });
  }

  return (
    <form action={updateTitleAction}>
      <Input type="submit" className="hidden" hidden />
      <Input
        type="text"
        className="block"
        defaultValue={title}
        name="title"
        ref={(node) => node?.focus()}
      />
    </form>
  );
}
