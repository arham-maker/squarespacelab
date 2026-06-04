"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { GRAPHIC_DESIGN_HERO } from "@/lib/data/graphic-design";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function GraphicDesignHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-gd-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="graphic-design-inner-banner"
      aria-label="Graphic design services"
    >
      <Container>
        <div className="graphic-design-inner-banner__text">
          <p data-gd-hero-reveal className="text-dm-hero-label m-0">
            {GRAPHIC_DESIGN_HERO.label}
          </p>
          <h1 data-gd-hero-reveal className="text-dm-hero-title m-0">
            {GRAPHIC_DESIGN_HERO.title}
          </h1>
          <p data-gd-hero-reveal className="text-dm-hero-desc graphic-design-hero-desc m-0">
            {GRAPHIC_DESIGN_HERO.description}
          </p>
          <div data-gd-hero-reveal className="graphic-design-inner-banner__cta">
            <CtaButton opensLeadForm>
              {GRAPHIC_DESIGN_HERO.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
