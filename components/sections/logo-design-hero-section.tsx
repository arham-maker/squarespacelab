"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { LOGO_DESIGN_HERO } from "@/lib/data/logo-design";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function LogoDesignHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-ld-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="logo-design-inner-banner"
      aria-label="Logo design services"
    >
      <Container>
        <div className="logo-design-inner-banner__text">
          <p data-ld-hero-reveal className="text-dm-hero-label m-0">
            {LOGO_DESIGN_HERO.label}
          </p>
          <h1 data-ld-hero-reveal className="text-dm-hero-title m-0">
            {LOGO_DESIGN_HERO.title}
          </h1>
          <p data-ld-hero-reveal className="text-dm-hero-desc m-0">
            {LOGO_DESIGN_HERO.description}
          </p>
          <div data-ld-hero-reveal className="logo-design-inner-banner__cta">
            <CtaButton opensLeadForm>
              {LOGO_DESIGN_HERO.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
