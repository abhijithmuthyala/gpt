"use client";

import { useTransition } from "react";
import { deleteChat } from "../actions/supabase";

// TODO
/*
Why does a form action not work here? Conditionally rendered?
*/
export default function DeleteChat({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async function handleDeleteTransition() {
      await deleteChat(id);
    });
  }

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
