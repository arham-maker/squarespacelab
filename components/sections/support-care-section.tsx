"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SUPPORT_CARE } from "@/lib/data/support";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SupportCareSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-support-care-reveal]");

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
      className="support-care-section"
      aria-label="Your website, our expert care"
    >
      <Container>
        <div className="support-care-section__layout">
          <div data-support-care-reveal className="support-care-section__copy">
            <h2 className="text-support-care-label m-0">{SUPPORT_CARE.label}</h2>
            <p className="text-support-care-lead m-0">{SUPPORT_CARE.lead}</p>
            <p className="text-support-care-desc m-0">{SUPPORT_CARE.description}</p>
          </div>

          <figure
            data-support-care-reveal
            className="support-care-section__figure m-0"
          >
            <Image
              src={SUPPORT_CARE.image.src}
              alt={SUPPORT_CARE.image.alt}
              width={720}
              height={540}
              className="support-care-section__img"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
