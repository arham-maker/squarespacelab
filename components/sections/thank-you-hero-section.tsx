"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { THANK_YOU_CONTENT, THANK_YOU_HERO } from "@/lib/data/thank-you";
import { revealImmediate } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

type ThankYouHeroSectionProps = {
  variant?: "default" | "lp2";
};

export function ThankYouHeroSection({
  variant = "default",
}: ThankYouHeroSectionProps) {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isLp2 = variant === "lp2";

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-thank-you-hero-reveal]");
    revealImmediate(targets, reducedMotion, { y: 48, duration: 1, stagger: 0.18 });
  }, [reducedMotion, isLp2]);

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
          {isLp2 ? (
            <>
              <h2
                data-thank-you-hero-reveal
                className="text-thank-you-hero-subheading m-0"
              >
                {THANK_YOU_CONTENT.headingLines.join(" ")}
              </h2>
              <div
                data-thank-you-hero-reveal
                className="text-thank-you-hero-desc"
              >
                {THANK_YOU_CONTENT.descriptionLines.map((line) => (
                  <p key={line} className="m-0">
                    {line}
                  </p>
                ))}
              </div>
              <div data-thank-you-hero-reveal className="thank-you-return-home">
                <CtaButton href="/lp2">Return to Home</CtaButton>
              </div>
            </>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
