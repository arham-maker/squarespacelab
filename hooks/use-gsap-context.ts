"use client";

import gsap from "gsap";
import {
  useLayoutEffect,
  useRef,
  type DependencyList,
  type RefObject,
} from "react";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type GsapSetup<T extends HTMLElement> = (
  context: gsap.Context,
  scope: T,
  reducedMotion: boolean
) => void | (() => void);

export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: GsapSetup<T>,
  deps: DependencyList = []
): RefObject<T | null> {
  const scopeRef = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();
  const setupRef = useRef(setup);

  setupRef.current = setup;

  useLayoutEffect(() => {
    registerGsapPlugins();

    const scope = scopeRef.current;
    if (!scope) return;

    let cleanup: void | (() => void);

    const ctx = gsap.context((context) => {
      cleanup = setupRef.current(context, scope, reducedMotion);
    }, scope);

    return () => {
      cleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setup via ref; deps are intentional triggers
  }, [reducedMotion, ...deps]);

  return scopeRef;
}
