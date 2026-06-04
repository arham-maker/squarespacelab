"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SOCIAL_MEDIA_CTA } from "@/lib/data/social-media";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SocialMediaCtaSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-sm-cta-reveal]");

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
      className="social-media-cta-section"
      aria-label="Start social media marketing"
    >
      <Container>
        <div className="social-media-cta-section__inner">
          <h2 data-sm-cta-reveal className="text-sm-cta-title m-0 text-center font-normal">
            {SOCIAL_MEDIA_CTA.title}
          </h2>
          <h3 data-sm-cta-reveal className="text-sm-cta-highlight m-0 text-center">
            {SOCIAL_MEDIA_CTA.highlight}
          </h3>
          <p data-sm-cta-reveal className="text-sm-cta-desc m-0 text-center">
            <strong>{SOCIAL_MEDIA_CTA.description}</strong>
          </p>
          <div data-sm-cta-reveal className="social-media-cta-section__btn flex justify-center">
            <CtaButton href={SOCIAL_MEDIA_CTA.cta.href}>
              {SOCIAL_MEDIA_CTA.cta.label}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
