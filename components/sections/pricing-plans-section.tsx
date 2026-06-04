"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { PricingCard } from "@/components/ui/pricing-card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  PRICING_INTRO,
  PRICING_PLANS,
  PRICING_TABS,
  type PricingTabId,
} from "@/lib/data/pricing";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function PricingPlansSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<PricingTabId>("promotional");
  const hasRevealedIntroRef = useRef(false);

  const plans = PRICING_PLANS[activeTab];

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const intro = section.querySelectorAll("[data-pricing-intro-reveal]");

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
        overwrite: true,
      }
    );
  }, [activeTab, reducedMotion]);

  return (
    <section ref={sectionRef} className="pricing-plans-section" id="pricing">
      <Container>
        <div className="pricing-plans-section__intro">
          <h4
            data-pricing-intro-reveal
            className="text-pricing-intro-title"
          >
            {PRICING_INTRO.title}
          </h4>
          <p data-pricing-intro-reveal className="text-pricing-intro-desc">
            {PRICING_INTRO.description}
          </p>
        </div>

        <div
          data-pricing-intro-reveal
          className="pricing-tabs"
          role="tablist"
          aria-label="Pricing categories"
        >
          {PRICING_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`pricing-tabs__tab ${isActive ? "pricing-tabs__tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          ref={gridRef}
          className="pricing-plans-grid"
          role="tabpanel"
          aria-label={PRICING_TABS.find((t) => t.id === activeTab)?.label}
        >
          {plans.map((plan) => (
            <div key={plan.id} data-pricing-card>
              <PricingCard
                plan={plan}
                category={PRICING_TABS.find((t) => t.id === activeTab)?.label}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
