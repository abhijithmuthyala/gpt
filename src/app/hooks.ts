import React, { useEffect } from "react";

export function useClickOutside<T extends HTMLElement | null>(
  childRef: React.RefObject<T>,
  memoisedCallback: (e: React.MouseEvent | MouseEvent) => void,
) {
  useEffect(
    function registerClickOutside() {
      function handleClickOutside(e: MouseEvent) {
        if (!(e.target as HTMLElement)?.contains(childRef.current)) {
          memoisedCallback(e);
        }
      }
      document.addEventListener("click", handleClickOutside);

      return function unregisterClickOutside() {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [memoisedCallback, childRef],
  );
}
