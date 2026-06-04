"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SUPPORT_BUSINESS } from "@/lib/data/support";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SupportBusinessSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-support-business-reveal]");

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
      className="support-business-section"
      aria-label="Get back to business with Squarespace support"
    >
      <Container>
        <div className="support-business-section__inner">
          <h2
            data-support-business-reveal
            className="text-support-business-title m-0 text-center font-normal"
          >
            {SUPPORT_BUSINESS.title}
          </h2>
          <p
            data-support-business-reveal
            className="text-support-business-desc m-0 text-center"
          >
            {SUPPORT_BUSINESS.description}
          </p>
          <p
            data-support-business-reveal
            className="text-support-business-phone m-0 text-center"
          >
            {SUPPORT_BUSINESS.phoneLabel}{" "}
            <Link href={SUPPORT_BUSINESS.phoneHref} className="text-support-business-phone__link">
              {SUPPORT_BUSINESS.phone}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
