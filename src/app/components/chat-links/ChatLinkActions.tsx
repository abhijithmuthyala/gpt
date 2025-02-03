"use client";

import React, { Children } from "react";
import { v4 as uuid } from "uuid";

export function ChatActionsMenu({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="flex flex-wrap gap-2 items-center"
      style={{ viewTransitionName: "actions-menu" + uuid() }}
    >
      {Children.map(children, function renderActionItem(chatActionElement, i) {
        return (
          <li key={i} className="px-2 py-1 rounded-md bg-blue-300">
            {chatActionElement}
          </li>
        );
      })}
    </ul>
  );
}
