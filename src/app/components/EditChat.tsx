"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateChatTitle } from "../actions/supabase";

export default function EditChat({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleEdit() {
    startTransition(async function handleEditTransition() {
      await updateChatTitle(id, "Updated title");
      router.refresh();
    });
  }

  return (
    <button onClick={handleEdit} disabled={isPending}>
      {isPending ? "Updating..." : "Update"}
    </button>
  );
}
