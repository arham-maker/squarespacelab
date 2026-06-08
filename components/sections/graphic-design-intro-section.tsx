"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { GRAPHIC_DESIGN_INTRO } from "@/lib/data/graphic-design";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function GraphicDesignIntroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-gd-intro-reveal]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(targets, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(targets, { autoAlpha: 0, y: 48 });

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
            duration: 1,
            stagger: 0.14,
            ease: "power2.out",
          });
        },
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="graphic-design-intro-section"
      aria-label="Connect with us today"
    >
      <Container className="graphic-design-intro-section__container">
        <div className="graphic-design-intro-section__grid">
          <h2 data-gd-intro-reveal className="text-gd-intro-title font-normal">
            {GRAPHIC_DESIGN_INTRO.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div data-gd-intro-reveal className="graphic-design-intro-section__copy">
            <h3 className="text-gd-intro-subtitle">{GRAPHIC_DESIGN_INTRO.subtitle}</h3>
            <p className="text-gd-intro-desc">{GRAPHIC_DESIGN_INTRO.description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
