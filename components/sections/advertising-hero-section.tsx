"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ADVERTISING_HERO } from "@/lib/data/advertising";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function AdvertisingHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-ad-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="advertising-inner-banner"
      aria-label="Advertising services"
    >
      <Container>
        <div className="advertising-inner-banner__text">
          <p data-ad-hero-reveal className="text-dm-hero-label m-0">
            {ADVERTISING_HERO.label}
          </p>
          <h1 data-ad-hero-reveal className="text-dm-hero-title m-0">
            {ADVERTISING_HERO.title}
          </h1>
          <p data-ad-hero-reveal className="text-dm-hero-desc advertising-hero-desc m-0">
            {ADVERTISING_HERO.descriptionLines.map((line) => (
              <span key={line} className="advertising-hero-desc__line block">
                {line}
              </span>
            ))}
          </p>
          <div data-ad-hero-reveal className="advertising-inner-banner__cta">
            <CtaButton opensLeadForm>
              {ADVERTISING_HERO.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
