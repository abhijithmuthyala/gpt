"use client";

import React, { Children } from "react";
import { v4 as uuid } from "uuid";

export function ChatActionsMenu({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="flex flex-wrap gap-x-2 gap-y-1 items-center"
      style={{ viewTransitionName: "actions-menu" + uuid() }}
    >
      {Children.map(children, function renderActionItem(chatActionElement, i) {
        return (
          <li key={i} className="rounded-md overflow-hidden">
            {chatActionElement}
          </li>
        );
      })}
    </ul>
  );
}
