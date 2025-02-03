"use client";

export default function EditChat({ onToggle }: { onToggle: () => void }) {
  return <button onClick={onToggle}>Edit Title</button>;
}
