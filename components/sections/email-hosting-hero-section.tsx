"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EMAIL_HOSTING_HERO } from "@/lib/data/email-hosting";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function EmailHostingHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-eh-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="email-hosting-inner-banner"
      aria-label="Email hosting services"
    >
      <Container>
        <div className="email-hosting-inner-banner__text">
          <p data-eh-hero-reveal className="text-dm-hero-label m-0">
            {EMAIL_HOSTING_HERO.label}
          </p>
          <h1 data-eh-hero-reveal className="text-dm-hero-title m-0">
            {EMAIL_HOSTING_HERO.title}
          </h1>
          <p data-eh-hero-reveal className="text-dm-hero-desc email-hosting-hero-desc m-0">
            {EMAIL_HOSTING_HERO.description}
          </p>
          <div data-eh-hero-reveal className="email-hosting-inner-banner__cta">
            <CtaButton opensLeadForm>
              {EMAIL_HOSTING_HERO.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
