"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { initMouseCursor } from "@/lib/mouse-cursor/init-mouse-cursor";

export function MouseCursor() {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const isLp = pathname === "/lp";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion || isLp) return;
    return initMouseCursor();
  }, [mounted, reducedMotion, isLp]);

  if (!mounted || reducedMotion || isLp) {
    return null;
  }

  return createPortal(
    <div className="mouse-cursor cursor-inner" aria-hidden />,
    document.body
  );
}
