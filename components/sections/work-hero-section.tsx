"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WORK_HERO } from "@/lib/data/work";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function WorkHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-work-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="work-inner-banner"
      aria-label="Our portfolio"
    >
      <Container>
        <div className="work-inner-banner__text">
          <h1
            data-work-hero-reveal
            className="text-work-hero-title m-0"
          >
            {WORK_HERO.title}
            <span className="work-hero-title__dot" aria-hidden>
              .
            </span>
          </h1>
          <p
            data-work-hero-reveal
            className="text-work-hero-subtitle m-0"
          >
            {WORK_HERO.subtitle}
          </p>
          <div data-work-hero-reveal className="work-inner-banner__cta">
            <CtaButton href={WORK_HERO.cta.href}>{WORK_HERO.cta.label}</CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
