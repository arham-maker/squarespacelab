"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { initMouseCursor } from "@/lib/mouse-cursor/init-mouse-cursor";

export function MouseCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;
    return initMouseCursor();
  }, [mounted, reducedMotion]);

  if (!mounted || reducedMotion) {
    return null;
  }

  return createPortal(
    <div className="mouse-cursor cursor-inner" aria-hidden />,
    document.body
  );
}
