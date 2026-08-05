"use client";

import { useEffect, useState } from "react";

export function usePointerField() {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPointer({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}
