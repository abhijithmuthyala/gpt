"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { signout } from "../actions/auth";

export default function SignoutButton() {
  const { pending } = useFormStatus();

  async function logoutAction() {
    if (pending) return;
    await signout();
  }

  return (
    <Button
      variant={"secondary"}
      type="submit"
      formAction={logoutAction}
      className={`${pending ? "animate-pulse" : ""}`}
    >
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
