"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { THANK_YOU_CONTENT } from "@/lib/data/thank-you";
import { revealOnScroll } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function ThankYouContentSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const targets = section.querySelectorAll("[data-thank-you-content-reveal]");
    targets.forEach((el) => {
      revealOnScroll(el, el, { y: 32, duration: 0.75, start: "top 92%" });
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="thank-you-content-section"
      aria-label="Request sent successfully"
    >
      <Container>
        <div className="thank-you-content-section__inner">
          <h2
            data-thank-you-content-reveal
            className="text-thank-you-content-heading m-0"
          >
            {THANK_YOU_CONTENT.headingLines.map((line) => (
              <span key={line} className="thank-you-content-heading__line">
                {line}
              </span>
            ))}
          </h2>
          <div
            data-thank-you-content-reveal
            className="text-thank-you-content-desc m-0"
          >
            {THANK_YOU_CONTENT.descriptionLines.map((line) => (
              <p key={line} className="thank-you-content-desc__line m-0">
                {line}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
