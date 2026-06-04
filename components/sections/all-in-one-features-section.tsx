"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ALL_IN_ONE_FEATURES, ALL_IN_ONE_HERO } from "@/lib/data/your-all-in-one";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function AllInOneFeaturesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-aio-features-reveal]");

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
            stagger: 0.12,
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
      className="all-in-one-features-section"
      aria-label="Booking software features"
    >
      <Container>
        <div className="all-in-one-features-section__grid">
          {ALL_IN_ONE_FEATURES.map((feature) => (
            <article
              key={feature.id}
              data-aio-features-reveal
              className="all-in-one-feature-card"
            >
              <h3 className="text-aio-feature-title m-0">{feature.title}</h3>
              <p className="text-aio-feature-desc m-0">{feature.description}</p>
            </article>
          ))}
        </div>

        <div
          data-aio-features-reveal
          className="all-in-one-features-section__cta flex justify-center"
        >
          <CtaButton opensLeadForm>
            {ALL_IN_ONE_HERO.cta.label}
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
