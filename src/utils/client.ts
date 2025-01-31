"use client";

import React from "react";
import { flushSync } from "react-dom";

export function setStateInViewTransition(updater: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(function transition() {
      flushSync(updater);
    });
  } else {
    updater();
  }
}

export function stopPropagation(event: React.MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}
