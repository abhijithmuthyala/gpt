"use client";

import React, { Children } from "react";
import DeleteChat from "../DeleteChat";

export default function ChatLinkActions({ id }: { id: string }) {
  return (
    <ChatActionsMenu>
      <DeleteChat id={id} />
      <DeleteChat id={id} />
    </ChatActionsMenu>
  );
}

function ChatActionsMenu({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 items-center">
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
