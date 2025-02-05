"use client";

import { Button } from "@/components/ui/button";
import { setStateInViewTransition } from "@/utils/client";
import React, { useState } from "react";

type AccordianProps = {
  title: React.ReactNode;
  details: (toggleAccordian: () => void) => React.ReactNode;
  toggleOpened: React.ReactNode;
  toggleClosed: React.ReactNode;
};

export default function Accordian({
  title,
  details,
  toggleOpened,
  toggleClosed,
}: AccordianProps) {
  const [expanded, setExpanded] = useState(false);

  function toggleAccordian() {
    setStateInViewTransition(function transitionAccordian() {
      setExpanded((e) => !e);
    });
  }

  return (
    <>
      <div
        className={`grid grid-cols-[1fr_2rem] gap-x-6 items-center ${expanded ? "mb-3" : ""}`}
      >
        <p className="col-span-2 col-start-1 row-start-1 grid">{title}</p>
        <Button
          variant={"secondary"}
          onClick={toggleAccordian}
          className="col-start-2 row-start-1"
        >
          {expanded ? toggleOpened : toggleClosed}
        </Button>
      </div>
      {expanded && details(toggleAccordian)}
    </>
  );
}
