"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { DIGITAL_MARKETING_HERO } from "@/lib/data/digital-marketing";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function DigitalMarketingHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-dm-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="digital-marketing-inner-banner"
      aria-label="Digital marketing services"
    >
      <Container>
        <div className="digital-marketing-inner-banner__text">
          <p
            data-dm-hero-reveal
            className="text-dm-hero-label m-0"
          >
            {DIGITAL_MARKETING_HERO.label}
          </p>
          <h1
            data-dm-hero-reveal
            className="text-dm-hero-title m-0"
          >
            {DIGITAL_MARKETING_HERO.title}
          </h1>
          <p
            data-dm-hero-reveal
            className="text-dm-hero-desc m-0"
          >
            {DIGITAL_MARKETING_HERO.description}
          </p>
          <div data-dm-hero-reveal className="digital-marketing-inner-banner__cta">
            <CtaButton opensLeadForm>
              {DIGITAL_MARKETING_HERO.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
