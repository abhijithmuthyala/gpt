"use client";

import { useTransition } from "react";
import { deleteChat } from "../actions/supabase";

// TODO
/*
Why does a form action not work here? Conditionally rendered?
*/
export default function DeleteChat({
  onToggle,
  id,
}: {
  onToggle: (event?: React.MouseEvent | PointerEvent) => void;
  id: string;
}) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async function handleDeleteTransition() {
      onToggle();
      await deleteChat(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="hover:brightness-50 bg-red-500"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
