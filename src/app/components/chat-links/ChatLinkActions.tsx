"use client";

import { useClickOutside } from "@/app/hooks";
import React, {
  Children,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import DeleteChat from "../DeleteChat";

export default function ChatLinkActions({ id }: { id: string }) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const actionsContainerRef = useRef<HTMLDivElement>(null);

  const [containerPosition, setContainerPosition] =
    useState<Partial<DOMRect> | null>(null);

  useClickOutside(actionsContainerRef, useCallback(closeMenu, []));
  useLayoutEffect(
    function moveMenuToTarget() {
      if (!expanded) return;
      const containerPosition = containerRef.current!.getBoundingClientRect();

      setContainerPosition({
        left: containerPosition.x,
        top: containerPosition.y,
        bottom: containerPosition.bottom,
      });
    },
    [expanded]
  );

  function toggleMenu(event?: React.MouseEvent | PointerEvent) {
    if (event && event instanceof PointerEvent) {
      event.stopImmediatePropagation();
    } else {
      event?.nativeEvent.stopImmediatePropagation();
    }
    setExpanded((e) => !e);
  }

  function closeMenu() {
    setExpanded(false);
  }

  return (
    <div ref={containerRef}>
      <button
        aria-controls="chat-actions"
        aria-expanded={expanded}
        className="w-6 bg-red-200 h-6 relative z-50"
        onClick={toggleMenu}
      ></button>
      {expanded &&
        createPortal(
          <div
            className="fixed p-4 bg-yellow-100 rounded-md"
            style={{
              left: `${containerPosition?.left}px`,
              top: `calc(${containerPosition?.bottom}px + 1rem)`,
            }}
            ref={actionsContainerRef}
            id="chat-actions"
          >
            <ChatActionsMenu>
              <DeleteChat id={id} onToggle={toggleMenu} />
              <DeleteChat id={id} onToggle={toggleMenu} />
            </ChatActionsMenu>
          </div>,
          document.body
        )}
    </div>
  );
}

function ChatActionsMenu({ children }: { children: React.ReactNode }) {
  return (
    <ul>
      {Children.map(children, function renderActionItem(chatActionElement, i) {
        return <li key={i}>{chatActionElement}</li>;
      })}
    </ul>
  );
}
