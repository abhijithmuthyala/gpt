import NewChat from "../components/NewChat";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center px-6 relative">
      <div
        className="absolute inset-0 animate-grid-fade"
        style={{
          backgroundImage: `url("/grid.svg")`,
        }}
      />
      <div className="mb-8 max-w-xl text-center text-balance">
        <h1 className="text-4xl font-bold mb-2 text-lime-900">
          Experience Gemini&apos;s Intelligence
        </h1>
        <p className="text-lg text-lime-700">
          Unlock powerful conversations with Google&apos;s most advanced AI.
          Code, create, analyze and learn - all in one place.
        </p>
      </div>
      <NewChat />
    </main>
  );
}

/*
"use client";

import { updateChatTitle } from "@/app/actions/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, LoaderIcon, SendIcon, X } from "lucide-react";
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

  let content;
  if (isEditing) {
    content = (
      <div className="flex flex-col gap-y-2">
        <ChatTitleForm
          onSubmit={handlePendingAction}
          onSuccess={handleResolvedAction}
          id={id}
          title={title}
        />
        {actionIsPending ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <div className="flex gap-x-2 gap-y-1 items-center flex-wrap">
            <Button
              variant={"default"}
              className="bg-lime-600 hover:bg-opacity-75"
              aria-label="Save Edit"
            >
              <SendIcon />
            </Button>
            <Button
              variant={"default"}
              aria-label="Cancel Edit"
              onClick={toggleTitleEdit}
            >
              <X />
            </Button>
          </div>
        )}
      </div>
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
  onSubmit,
  onSuccess,
}: {
  title: string;
  id: string;
  onSubmit: () => void;
  onSuccess: () => void;
}) {
  const router = useRouter();

  async function updateTitleAction(formData: FormData) {
    queueMicrotask(onSubmit);

    const newTitle = formData.get("title") as string;
    await updateChatTitle(id, newTitle);

    /*
    Another transition is needed after await.
    This batches the updates from client and the server in one render pass.
    */
/*
    startTransition(function updateClientAndServerComponentInATransition() {
      router.refresh();
      onSuccess();
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

*/
