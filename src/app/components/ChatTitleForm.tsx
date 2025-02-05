"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { updateChatTitle } from "../actions/supabase";

export default function ChatTitleForm({
  title,
  id,
  onSubmit,
  onSuccess,
  onToggle,
}: {
  title: string;
  id: string;
  onSubmit: () => void;
  onSuccess: () => void;
  onToggle: () => void;
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
    startTransition(function updateClientAndServerComponentInATransition() {
      router.refresh();
      onSuccess();
    });
  }

  return (
    <form action={updateTitleAction} className="flex flex-col gap-y-2">
      <Input type="submit" className="hidden" hidden />
      <Input
        type="text"
        className="block"
        defaultValue={title}
        name="title"
        ref={(node) => node?.focus()}
      />
      <div className="flex gap-x-2 gap-y-1 items-center flex-wrap">
        <Button
          variant={"default"}
          className="bg-lime-600 hover:bg-opacity-75"
          aria-label="Save Edit"
          type="submit"
        >
          <SendIcon />
        </Button>
        <Button
          variant={"default"}
          type="button"
          aria-label="Cancel Edit"
          onClick={onToggle}
        >
          <X />
        </Button>
      </div>
    </form>
  );
}
