"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WEB_DESIGN_HERO } from "@/lib/data/web-design";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function WebDesignHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-wd-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="web-design-inner-banner"
      aria-label="Web design services"
    >
      <Container>
        <div className="web-design-inner-banner__text">
          <p data-wd-hero-reveal className="text-dm-hero-label m-0">
            {WEB_DESIGN_HERO.label}
          </p>
          <h1 data-wd-hero-reveal className="text-dm-hero-title m-0">
            {WEB_DESIGN_HERO.title}
          </h1>
          <p data-wd-hero-reveal className="text-dm-hero-desc m-0">
            {WEB_DESIGN_HERO.description}
          </p>
          <div data-wd-hero-reveal className="web-design-inner-banner__cta">
            <CtaButton opensLeadForm>
              {WEB_DESIGN_HERO.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
