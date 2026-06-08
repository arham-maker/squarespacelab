"use client";

import Image from "next/image";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { PRICING_TRUSTED_PARTNERS } from "@/lib/data/pricing";
import { initSectionHeadingScroll } from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function PricingTrustedPartnersSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const grid = section.querySelector<HTMLElement>("[data-pricing-partners-grid]");
    const badges = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-pricing-partner-badge]")
    );

    let headingCleanup: (() => void) | undefined;
    let badgesTimeline: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      if (heading) {
        headingCleanup =
          initSectionHeadingScroll(heading, reducedMotion, {
            trigger: section,
            start: "top 88%",
            end: "top 38%",
            scrub: true,
            staggerEach: 0.035,
          }) ?? undefined;
      }

      if (!grid || badges.length === 0) return;

      if (reducedMotion) {
        gsap.set(badges, { autoAlpha: 1, yPercent: 0, clearProps: "transform" });
        return;
      }

      gsap.set(badges, { autoAlpha: 0, yPercent: 100, force3D: true });

      badgesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 75%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      badges.forEach((badge, index) => {
        badgesTimeline!.to(
          badge,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.4,
            ease: "none",
          },
          index * 0.3
        );
      });
    }, section);

    return () => {
      headingCleanup?.();
      badgesTimeline?.scrollTrigger?.kill();
      badgesTimeline?.kill();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="pricing-partners-section"
      aria-labelledby="pricing-partners-heading"
    >
      <Container>
        <h2
          id="pricing-partners-heading"
          data-scroll-heading
          className="pricing-partners-section__heading section-heading text-center"
        >
          {PRICING_TRUSTED_PARTNERS.titleLines.map((line) => (
            <span key={line} className="block" data-scroll-heading-line>
              {line}
            </span>
          ))}
        </h2>
      </Container>

      <Container className="pricing-partners-section__grid-container">
        <ul
          data-pricing-partners-grid
          className="pricing-partners-grid m-0 list-none p-0 w-[85%] m-auto"
        >
          {PRICING_TRUSTED_PARTNERS.badges.map((badge) => (
            <li key={badge.src} className="w-full" data-pricing-partner-badge>
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className="pricing-partners-grid__img"
                quality={100}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
