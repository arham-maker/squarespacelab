"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { LOGO_DESIGN_TESTIMONIAL } from "@/lib/data/logo-design";
import { initImageReveal } from "@/lib/gsap/image-reveal";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function LogoDesignTestimonialSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-ld-testimonial-reveal]");
    let imageCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      imageCleanup = initImageReveal(section, reducedMotion);

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

    return () => {
      imageCleanup?.();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="logo-design-testimonial-section"
      aria-label="Client testimonial"
    >
      <Container>
        <div className="logo-design-testimonial-section__layout">
          <blockquote
            data-ld-testimonial-reveal
            className="logo-design-testimonial-section__quote m-0"
          >
            <p className="m-0">
              &ldquo;{LOGO_DESIGN_TESTIMONIAL.quote}&rdquo;
            </p>
          </blockquote>

          <figure
            data-image-reveal
            className="logo-design-testimonial-section__figure image-reveal m-0"
          >
            <Image
              src={LOGO_DESIGN_TESTIMONIAL.image.src}
              alt={LOGO_DESIGN_TESTIMONIAL.image.alt}
              width={720}
              height={540}
              className="logo-design-testimonial-section__img image-reveal__img"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
