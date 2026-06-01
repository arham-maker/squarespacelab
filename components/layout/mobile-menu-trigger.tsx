"use client";

import { useLayoutEffect, useRef } from "react";
import {
  animateHamburgerClose,
  animateHamburgerOpen,
  type HamburgerElements,
} from "@/lib/gsap/mobile-menu";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap/register";

type MobileMenuTriggerProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function MobileMenuTrigger({ isOpen, onClick }: MobileMenuTriggerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const topRef = useRef<HTMLSpanElement>(null);
  const middleRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);

  const getLines = (): HamburgerElements | null => {
    if (!topRef.current || !middleRef.current || !bottomRef.current) return null;
    return {
      top: topRef.current,
      middle: middleRef.current,
      bottom: bottomRef.current,
    };
  };

  useLayoutEffect(() => {
    registerGsapPlugins();
    const lines = getLines();
    if (!lines) return;

    if (isOpen) {
      animateHamburgerOpen(lines, reducedMotion);
    } else {
      animateHamburgerClose(lines, reducedMotion);
    }
  }, [isOpen, reducedMotion]);

  return (
    <button
      type="button"
      className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-neutral-300 lg:hidden"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span ref={topRef} className="block h-0.5 w-5 origin-center bg-black" />
      <span ref={middleRef} className="block h-0.5 w-5 bg-black" />
      <span ref={bottomRef} className="block h-0.5 w-5 origin-center bg-black" />
    </button>
  );
}
