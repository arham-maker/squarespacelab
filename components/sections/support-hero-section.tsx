"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SUPPORT_HERO } from "@/lib/data/support";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SupportHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-support-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="support-inner-banner"
      aria-label="Squarespace support services"
    >
      <Container>
        <div className="support-inner-banner__text">
          <p data-support-hero-reveal className="text-dm-hero-label m-0">
            {SUPPORT_HERO.label}
          </p>
          <h1 data-support-hero-reveal className="text-dm-hero-title m-0">
            {SUPPORT_HERO.title}
          </h1>
          <p data-support-hero-reveal className="text-support-hero-subtitle m-0">
            {SUPPORT_HERO.subtitle}
          </p>
          <p data-support-hero-reveal className="text-dm-hero-desc support-hero-desc m-0">
            {SUPPORT_HERO.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
