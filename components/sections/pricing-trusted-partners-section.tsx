"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { PRICING_TRUSTED_PARTNERS } from "@/lib/data/pricing";
import { initSectionHeadingScroll } from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function PricingTrustedPartnersSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedBadgesRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const badges = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-pricing-partner-badge]")
    );

    let headingCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (heading) {
        headingCleanup =
          initSectionHeadingScroll(heading, reducedMotion, {
            trigger: section,
            start: "top 88%",
            end: "top 38%",
            scrub: 0.9,
            staggerEach: 0.035,
          }) ?? undefined;
      }

      if (reducedMotion) {
        gsap.set(badges, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(badges, { autoAlpha: 0, y: 24, scale: 0.96 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          if (hasRevealedBadgesRef.current || !badges.length) return;
          hasRevealedBadgesRef.current = true;
          gsap.to(badges, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
          });
        },
      });
    }, section);

    return () => {
      headingCleanup?.();
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

        <ul className="pricing-partners-grid m-0 list-none p-0 mx-auto w-full">
          {PRICING_TRUSTED_PARTNERS.badges.map((badge) => (
            <li key={badge.src} data-pricing-partner-badge>
              <Image
                src={badge.src}
                alt={badge.alt}
                width={160}
                height={120}
                className="pricing-partners-grid__img h-auto"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
