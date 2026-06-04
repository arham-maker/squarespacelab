"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ALL_IN_ONE_CTA } from "@/lib/data/your-all-in-one";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function AllInOneCtaSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-aio-cta-reveal]");

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
      className="all-in-one-cta-section"
      aria-label="Get started with booking software"
    >
      <Container>
        <div className="all-in-one-cta-section__inner">
          <h2 data-aio-cta-reveal className="text-aio-cta-title m-0 text-center font-normal">
            {ALL_IN_ONE_CTA.title}
          </h2>
          <p data-aio-cta-reveal className="text-aio-cta-desc m-0 text-center">
            <strong>{ALL_IN_ONE_CTA.description}</strong>
          </p>
          <div data-aio-cta-reveal className="all-in-one-cta-section__btn flex justify-center">
            <CtaButton opensLeadForm>
              {ALL_IN_ONE_CTA.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
