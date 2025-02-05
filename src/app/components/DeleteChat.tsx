"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteChat } from "../actions/supabase";

// TODO
/*
Why does a form action not work here? Conditionally rendered?
*/
export default function DeleteChat({
  id,
  onDelete,
}: {
  id: string;
  onDelete: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete() {
    onDelete();

    startTransition(async function handleDeleteTransition() {
      await deleteChat(id);
      router.push("/");
    });
  }

  return (
    <Button onClick={handleDelete} variant={"destructive"} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
