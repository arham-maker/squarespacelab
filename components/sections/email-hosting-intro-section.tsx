"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EMAIL_HOSTING_INTRO } from "@/lib/data/email-hosting";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function EmailHostingIntroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-eh-intro-reveal]");

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
      className="email-hosting-intro-section"
      aria-label="Reliable email hosting"
    >
      <Container>
        <div className="email-hosting-intro-section__inner">
          <h2 data-eh-intro-reveal className="text-eh-intro-title m-0 text-center font-normal">
            {EMAIL_HOSTING_INTRO.title}
          </h2>
          <p data-eh-intro-reveal className="text-eh-intro-desc m-0 text-center">
            {EMAIL_HOSTING_INTRO.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
