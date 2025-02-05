"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontalIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useActionState, useRef } from "react";
import { sendQuery } from "../actions/chat";
import { updateChatTitle } from "../actions/supabase";
import { ChatMessage, PromptState, Role } from "../types";

export default function PromptForm({
  onPrompt,
  history,
}: {
  onPrompt: (prompt: string, role: Role) => void;
  history: ChatMessage[];
}) {
  const params = useParams();
  const [formState, queryAction, queryIsPending] = useActionState(
    handlePromptAction,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  async function handlePromptAction(
    formState: PromptState,
    formData: FormData
  ) {
    formRef.current?.reset();

    const prompt = formData.get("prompt") as string;
    const id = params.chatId as string;

    queueMicrotask(function updatePrompts() {
      onPrompt(prompt, "user");
    });

    const [{ response, error }] = await Promise.all([
      sendQuery(formData, id, history),
      history.length === 0
        ? updateChatTitle(id, prompt, true)
        : Promise.resolve(),
    ]);

    if (!error) {
      queueMicrotask(function updatePrompts() {
        onPrompt(response as string, "model");
      });
    }

    return { response, error };
  }

  return (
    <form
      action={queryAction}
      ref={formRef}
      className="sticky z-40 w-full bottom-6 px-4 py-3 max-w-xl mx-auto rounded-lg grid grid-cols-[1fr_3rem] gap-x-2 items-center bg-slate-200 shadow-inner shadow-gray-400"
    >
      <Textarea
        name="prompt"
        id="prompt"
        disabled={queryIsPending}
        placeholder="Ask Gemini"
        className="w-full max-h-32 min-h-16 overflow-y-auto resize-none text-lime-950 font-medium text-lg"
        ref={(node) => node?.focus()}
      />
      <Button
        type="submit"
        disabled={queryIsPending}
        className={`max-w-48 grid place-items-center ${queryIsPending ? "animate-pulse" : ""}`}
      >
        <SendHorizontalIcon />
      </Button>
      <div className="col-span-full row-start-2">
        {formState?.error && !queryIsPending && (
          <FormError error={formState.error} />
        )}
      </div>
    </form>
  );
}

function FormError({ error }: { error: string }) {
  return <div className="text-red-500">{error}</div>;
}
