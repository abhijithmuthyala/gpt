"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function NewChatButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={`${pending ? "animate-pulse" : ""} bg-lime-600 hover:bg-lime-700 scale-125`}
    >
      {pending ? "Starting a new chat..." : "Start New Chat"}
    </Button>
  );
}
