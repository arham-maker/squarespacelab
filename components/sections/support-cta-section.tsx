"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SUPPORT_CTA } from "@/lib/data/support";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SupportCtaSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-support-cta-reveal]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(targets, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(targets, { autoAlpha: 0, y: 32 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => {
          if (hasRevealedRef.current) return;
          hasRevealedRef.current = true;
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.14,
            ease: "power2.out",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="support-cta-section"
      aria-label="Talk to our Squarespace experts"
    >
      <Container>
        <div className="support-cta-section__inner">
          <h2 data-support-cta-reveal className="text-support-cta-title m-0 text-center font-normal">
            {SUPPORT_CTA.title}
          </h2>
          <p data-support-cta-reveal className="text-support-cta-desc m-0 text-center">
            {SUPPORT_CTA.description}
          </p>
          <div data-support-cta-reveal className="support-cta-section__btn flex justify-center">
            <CtaButton href={SUPPORT_CTA.cta.href}>{SUPPORT_CTA.cta.label}</CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
