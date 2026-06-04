"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { THANK_YOU_HERO } from "@/lib/data/thank-you";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function ThankYouHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-thank-you-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.18 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="thank-you-inner-banner"
      aria-label="Thank you"
    >
      <Container>
        <div className="thank-you-inner-banner__text">
          <h1
            data-thank-you-hero-reveal
            className="text-thank-you-hero-title m-0"
          >
            {THANK_YOU_HERO.titleLine1}{" "}
            <span className="text-thank-you-hero-accent">
              {THANK_YOU_HERO.titleHighlight}
            </span>
          </h1>
        </div>
      </Container>
    </section>
  );
}
