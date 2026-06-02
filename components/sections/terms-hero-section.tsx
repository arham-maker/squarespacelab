"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { TERMS_HERO } from "@/lib/data/terms";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function TermsHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-terms-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="terms-inner-banner"
      aria-label="Terms and conditions"
    >
      <Container>
        <div className="terms-inner-banner__text">
          <h1 data-terms-hero-reveal className="text-terms-hero-title m-0">
            <span className="terms-hero-title__bold">{TERMS_HERO.titleBold}</span>
            <span className="terms-hero-title__light">
              {TERMS_HERO.titleLight}
              <span className="terms-hero-title__dot" aria-hidden>
                .
              </span>
            </span>
          </h1>
        </div>
      </Container>
    </section>
  );
}
