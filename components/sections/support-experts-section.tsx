"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SUPPORT_EXPERTS } from "@/lib/data/support";
import {
  initSectionHeadingScroll,
  SECTION_HEADING_FADED_DARK,
} from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SupportExpertsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const targets = section.querySelectorAll("[data-support-experts-reveal]");

    const headingCleanup = heading
      ? initSectionHeadingScroll(heading, reducedMotion, {
          trigger: section,
          start: "top 90%",
          end: "top 18%",
          scrub: 0.9,
          staggerEach: 0.025,
          fadedColor: SECTION_HEADING_FADED_DARK,
          solidColor: "#000000",
        })
      : undefined;

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

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      headingCleanup?.();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="support-experts-section"
      aria-label="Your go-to experts for reliable website support"
    >
      <Container>
        <h2
          data-scroll-heading
          className="text-support-experts-heading m-0 mb-10 font-normal"
        >
          {SUPPORT_EXPERTS.titleLines.map((line) => (
            <span key={line} className="block" data-scroll-heading-line>
              {line}
            </span>
          ))}
        </h2>

        <p data-support-experts-reveal className="text-support-experts-subtitle m-0">
          {SUPPORT_EXPERTS.subtitle}
        </p>

        <ul
          data-support-experts-reveal
          className="support-experts-section__list m-0 mt-10 list-disc ps-6 md:ps-8"
        >
          {SUPPORT_EXPERTS.bullets.map((item) => (
            <li key={item} className="text-support-experts-item mb-5 last:mb-0">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
