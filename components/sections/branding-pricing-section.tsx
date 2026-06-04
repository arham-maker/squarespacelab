"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { PricingCard } from "@/components/ui/pricing-card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  BRANDING_PACKAGE_ICON,
  BRANDING_PLANS,
  BRANDING_PRICING_INTRO,
} from "@/lib/data/branding";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function BrandingPricingSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasRevealedIntroRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const intro = section.querySelectorAll("[data-brand-pricing-intro-reveal]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(intro, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(intro, { autoAlpha: 0, y: 32 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => {
          if (hasRevealedIntroRef.current) return;
          hasRevealedIntroRef.current = true;
          gsap.to(intro, {
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

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-pricing-card]");

    if (reducedMotion) {
      gsap.set(cards, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="branding-pricing-section"
      id="branding-pricing"
      aria-label="Branding pricing packages"
    >
      <Container>
        <div className="pricing-plans-section__intro">
          <h4
            data-brand-pricing-intro-reveal
            className="text-pricing-intro-title"
          >
            {BRANDING_PRICING_INTRO.title}
          </h4>
          <p
            data-brand-pricing-intro-reveal
            className="text-pricing-intro-desc mb-10"
          >
            {BRANDING_PRICING_INTRO.description}
          </p>
        </div>

        <div ref={gridRef} className="pricing-plans-grid">
          {BRANDING_PLANS.map((plan) => (
            <div key={plan.id} data-pricing-card>
              <PricingCard
                plan={plan}
                packageIcon={BRANDING_PACKAGE_ICON}
                category="Branding"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
