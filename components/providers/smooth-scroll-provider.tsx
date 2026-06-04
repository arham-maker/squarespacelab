"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { initLenisSmoothScroll } from "@/lib/lenis/init-lenis";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const isLp = pathname === "/lp";

  useEffect(() => {
    registerGsapPlugins();

    if (reducedMotion || isLp) return;

    return initLenisSmoothScroll();
  }, [reducedMotion, isLp]);

  return children;
}
