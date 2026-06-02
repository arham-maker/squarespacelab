"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { initLenisSmoothScroll } from "@/lib/lenis/init-lenis";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    registerGsapPlugins();

    if (reducedMotion) return;

    return initLenisSmoothScroll();
  }, [reducedMotion]);

  return children;
}
