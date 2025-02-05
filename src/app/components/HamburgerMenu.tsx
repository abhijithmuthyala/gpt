"use client";

import { Button } from "@/components/ui/button";
import { setStateInViewTransition } from "@/utils/client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useDocumentOverflowEffect } from "../hooks";

export default function HamburgerMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  useDocumentOverflowEffect(open);

  function toggle() {
    setStateInViewTransition(function transitionMenu() {
      setOpen((open) => !open);
    });
  }

  const toggleButton = (
    <Button className="rounded-md" onClick={toggle}>
      {open ? <X /> : <Menu />}
    </Button>
  );

  if (!open) {
    return toggleButton;
  }

  return (
    <div className="fixed overflow-y-scroll px-4 py-3 top-0 left-0 h-screen w-screen overflow-x-hidden z-50 bg-zinc-50 flex flex-col gap-y-12">
      <div className="sticky grid justify-end top-0 backdrop-blur-sm">
        {toggleButton}
      </div>
      {open && children}
    </div>
  );
}
