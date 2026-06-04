"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SOCIAL_MEDIA_HERO } from "@/lib/data/social-media";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SocialMediaHeroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-sm-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.14 });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="social-media-inner-banner"
      aria-label="Social media marketing services"
    >
      <Container>
        <div className="social-media-inner-banner__text">
          <p data-sm-hero-reveal className="text-dm-hero-label m-0">
            {SOCIAL_MEDIA_HERO.label}
          </p>
          <h1 data-sm-hero-reveal className="text-dm-hero-title m-0">
            {SOCIAL_MEDIA_HERO.title}
          </h1>
          <p data-sm-hero-reveal className="text-dm-hero-desc social-media-hero-desc m-0">
            {SOCIAL_MEDIA_HERO.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
