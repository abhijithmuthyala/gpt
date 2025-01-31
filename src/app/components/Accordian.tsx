"use client";

import { setStateInViewTransition } from "@/utils/client";
import React, { useState } from "react";

type AccordianProps = {
  title: React.ReactNode;
  details: React.ReactNode;
  toggle: React.ReactNode;
};

export default function Accordian({ title, details, toggle }: AccordianProps) {
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
        <button
          onClick={toggleAccordian}
          className="min-w-8 aspect-square col-start-2 row-start-1 bg-emerald-200 rounded-md"
        >
          {toggle}
        </button>
      </div>
      {expanded && details}
    </>
  );
}
