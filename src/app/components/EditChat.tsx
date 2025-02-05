"use client";

import { Button } from "@/components/ui/button";

export default function EditChat({ onToggle }: { onToggle: () => void }) {
  return <Button onClick={onToggle}>Edit Title</Button>;
}
