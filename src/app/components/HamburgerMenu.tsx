"use client";

import { setStateInViewTransition } from "@/utils/client";
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
    <button className="bg-blue-300 p-2 rounded-md" onClick={toggle}>
      {open ? "close" : "open"}
    </button>
  );

  if (!open) {
    return toggleButton;
  }

  return (
    <div className="fixed overflow-y-scroll px-4 py-3 top-0 left-0 h-screen w-screen overflow-x-hidden flex flex-col gap-y-12 bg-amber-50">
      <div className="sticky grid justify-end top-0 backdrop-blur-sm">
        {toggleButton}
      </div>
      {open && children}
    </div>
  );
}
