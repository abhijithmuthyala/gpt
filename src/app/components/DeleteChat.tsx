"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteChat } from "../actions/supabase";

// TODO
/*
Why does a form action not work here? Conditionally rendered?
*/
export default function DeleteChat({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete() {
    startTransition(async function handleDeleteTransition() {
      await deleteChat(id);
      router.replace("/");
      router.refresh();
    });
  }

  return (
    <Button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
