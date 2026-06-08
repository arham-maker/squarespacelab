"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { AdvertisingPricingCard } from "@/components/ui/advertising-pricing-card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ADVERTISING_PLANS,
  ADVERTISING_PRICING_INTRO,
  ADVERTISING_TABS,
  type AdvertisingTabId,
} from "@/lib/data/advertising";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function AdvertisingPricingSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<AdvertisingTabId>("seo");
  const hasRevealedIntroRef = useRef(false);

  const plans = ADVERTISING_PLANS[activeTab];

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const intro = section.querySelectorAll("[data-ad-pricing-intro-reveal]");

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

    const cards = grid.querySelectorAll("[data-ad-pricing-card]");

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
    <section ref={sectionRef} className="advertising-pricing-section" id="pricing">
      <Container>
        <div className="advertising-pricing-section__intro">
          <h4 data-ad-pricing-intro-reveal className="text-pricing-intro-title">
            {ADVERTISING_PRICING_INTRO.title}
          </h4>
          <p data-ad-pricing-intro-reveal className="text-pricing-intro-desc">
            {ADVERTISING_PRICING_INTRO.description}
          </p>
        </div>

        <div
          data-ad-pricing-intro-reveal
          className="pricing-tabs"
          role="tablist"
          aria-label="Advertising pricing categories"
        >
          {ADVERTISING_TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`pricing-tabs__tab cursor-pointer ${isActive ? "pricing-tabs__tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          ref={gridRef}
          className="pricing-plans-grid advertising-pricing-section__grid"
          role="tabpanel"
          aria-label={ADVERTISING_TABS.find((t) => t.id === activeTab)?.label}
        >
          {plans.map((plan) => (
            <div key={plan.id} data-ad-pricing-card>
              <AdvertisingPricingCard
                plan={plan}
                category={ADVERTISING_TABS.find((t) => t.id === activeTab)?.label}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
