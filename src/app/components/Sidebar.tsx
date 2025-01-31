"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("auto");

  useLayoutEffect(function fixSidebarHeight() {
    if (!ref.current) return;

    const position = ref.current.getBoundingClientRect();
    const maxHeight = `calc(100vh - ${position.y}px)`;
    setHeight(maxHeight);
  }, []);

  return (
    <div
      className="bg-gray-100 sticky overflow-y-auto overflow-x-hidden sm:block hidden"
      style={{ maxHeight: height, top: `calc(100vh - ${height})` }}
      ref={ref}
    >
      {children}
    </div>
  );
}
