"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { BRANDING_HERO } from "@/lib/data/branding";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function BrandingHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-brand-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="branding-inner-banner"
      aria-label="Branding services"
    >
      <Container>
        <div className="branding-inner-banner__text">
          <p data-brand-hero-reveal className="text-dm-hero-label m-0">
            {BRANDING_HERO.label}
          </p>
          <h1 data-brand-hero-reveal className="text-dm-hero-title m-0">
            {BRANDING_HERO.title}
          </h1>
          <p data-brand-hero-reveal className="text-dm-hero-desc branding-hero-desc m-0">
            {BRANDING_HERO.descriptionLines[0]}
            <br />
            {BRANDING_HERO.descriptionLines[1]}
          </p>
          <div data-brand-hero-reveal className="branding-inner-banner__cta">
            <CtaButton opensLeadForm>
              {BRANDING_HERO.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
