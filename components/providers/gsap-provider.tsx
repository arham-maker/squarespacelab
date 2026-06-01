"use client";

import { useEffect } from "react";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";

type GsapProviderProps = {
  children: React.ReactNode;
};

export function GsapProvider({ children }: GsapProviderProps) {
  useEffect(() => {
    registerGsapPlugins();

    const refresh = () => ScrollTrigger.refresh();

    const onResize = () => {
      window.requestAnimationFrame(refresh);
    };

    window.addEventListener("load", refresh);
    window.addEventListener("resize", onResize);

    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return children;
}
