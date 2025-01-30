"use client";

import { useParams } from "next/navigation";
import { useActionState, useRef } from "react";
import { sendQuery } from "../actions/chat";
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
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  async function handlePromptAction(
    formState: PromptState,
    formData: FormData,
  ) {
    formRef.current?.reset();

    const prompt = formData.get("prompt") as string;
    queueMicrotask(function updatePrompts() {
      onPrompt(prompt, "user");
    });
    const { response, error } = await sendQuery(
      formData,
      params.chatId as string,
      history,
    );
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
      className="sticky bottom-0 bg-slate-400 py-4 px-2"
    >
      <textarea
        name="prompt"
        id="prompt"
        disabled={queryIsPending}
        placeholder="Ask a question"
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-hidden focus:border-blue-500 max-h-32 min-h-16 overflow-y-auto resize-none"
      ></textarea>
      <button type="submit" disabled={queryIsPending}>
        {queryIsPending ? "Loading..." : "Send"}
      </button>
      {formState?.error && !queryIsPending && (
        <FormError error={formState.error} />
      )}
    </form>
  );
}

function FormError({ error }: { error: string }) {
  return <div className="text-red-500">{error}</div>;
}
