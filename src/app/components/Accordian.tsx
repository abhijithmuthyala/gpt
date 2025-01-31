"use client";

import React, { useState } from "react";

type AccordianProps = {
  title: React.ReactNode;
  details: React.ReactNode;
  toggle: React.ReactNode;
};

export default function Accordian({ title, details, toggle }: AccordianProps) {
  const [expanded, setExpanded] = useState(false);

  function toggleAccordian() {
    setExpanded((e) => !e);
  }

  return (
    <>
      <div
        className={`flex justify-between gap-6 items-center ${expanded ? "mb-3" : ""}`}
      >
        <p className="grid">{title}</p>
        <button
          onClick={toggleAccordian}
          className="min-w-8 aspect-square bg-amber-500 rounded-md"
        >
          {toggle}
        </button>
      </div>
      {expanded && details}
    </>
  );
}
