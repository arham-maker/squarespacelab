"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EMAIL_HOSTING_DIFFERENCE } from "@/lib/data/email-hosting";
import { initSectionHeadingScroll } from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function EmailHostingDifferenceSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-eh-difference-reveal]");
    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");

    const headingCleanup = heading
      ? initSectionHeadingScroll(heading, reducedMotion, {
          trigger: section,
          start: "top 90%",
          end: "top 18%",
          scrub: 0.9,
          staggerEach: 0.025,
          fadedColor: "rgba(0, 0, 0, 0.3)",
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
      className="email-hosting-difference-section"
      aria-label="What makes us different"
    >
      <Container>
        <div className="email-hosting-difference-section__inner">
          <h2
            data-scroll-heading
            className="text-eh-difference-heading m-0 text-center font-normal"
          >
            {EMAIL_HOSTING_DIFFERENCE.titleLines.map((line) => (
              <span key={line} className="block" data-scroll-heading-line>
                {line}
              </span>
            ))}
          </h2>

          <p
            data-eh-difference-reveal
            className="text-eh-difference-desc m-0 text-center"
          >
            {EMAIL_HOSTING_DIFFERENCE.description}
          </p>

          <h3
            data-eh-difference-reveal
            className="text-eh-difference-cta-title m-0 text-center font-normal"
          >
            {EMAIL_HOSTING_DIFFERENCE.ctaTitleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>

          <div
            data-eh-difference-reveal
            className="email-hosting-difference-section__cta flex justify-center"
          >
            <CtaButton href={EMAIL_HOSTING_DIFFERENCE.cta.href}>
              {EMAIL_HOSTING_DIFFERENCE.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
