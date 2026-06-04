"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { CUSTOM_WEBSITE_CTA } from "@/lib/data/custom-website-cta";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { initSectionHeadingScroll } from "@/lib/gsap/section-heading-scroll";

export function CustomWebsiteCtaSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const content = section.querySelector<HTMLElement>("[data-cta-content]");

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

      if (!content) return;

      if (reducedMotion) {
        gsap.set(content, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(content, { autoAlpha: 0, y: 28 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => {
          if (hasRevealedRef.current) return;
          hasRevealedRef.current = true;
          gsap.to(content, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            overwrite: true,
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
      id="get-started"
      className="section-padding relative z-20 bg-black text-white"
    >
      <Container className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <h3
            data-scroll-heading
            className="text-cta-display mb-4 w-full overflow-visible text-white"
          >
            {CUSTOM_WEBSITE_CTA.titleLines.map((line) => (
              <span key={line} className="block" data-scroll-heading-line>
                {line}
              </span>
            ))}
          </h3>

          <div
            data-cta-content
            className="flex w-full flex-col items-center"
          >
            <p className="text-body mb-6 w-full text-white sm:mb-8">
              {CUSTOM_WEBSITE_CTA.description}
            </p>

            <CtaButton
              opensLeadForm
              className="btn btn-inverse w-full max-w-xs sm:w-auto"
            >
              {CUSTOM_WEBSITE_CTA.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
