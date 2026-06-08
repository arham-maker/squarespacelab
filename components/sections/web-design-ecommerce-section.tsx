"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WEB_DESIGN_ECOMMERCE } from "@/lib/data/web-design";
import { initImageReveal } from "@/lib/gsap/image-reveal";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function WebDesignEcommerceSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-wd-ecommerce-reveal]");
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
      className="web-design-ecommerce-section"
      aria-label="Custom eCommerce solutions"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-x-16">
          <div data-wd-ecommerce-reveal className="web-design-ecommerce-section__copy">
            <h2 className="text-wd-ecommerce-title m-0">
              {WEB_DESIGN_ECOMMERCE.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-wd-ecommerce-desc m-0">
              {WEB_DESIGN_ECOMMERCE.description}
            </p>
            <CtaButton
              opensLeadForm
              className="btn btn-outline-light mt-6 gap-3"
            >
              {WEB_DESIGN_ECOMMERCE.cta.label}
              <FiArrowRight className="h-8 w-8 shrink-0" strokeWidth={2.5} aria-hidden />
            </CtaButton>
          </div>

          <figure
            data-image-reveal
            className="web-design-ecommerce-section__figure image-reveal m-0"
          >
            <Image
              src={WEB_DESIGN_ECOMMERCE.image.src}
              alt={WEB_DESIGN_ECOMMERCE.image.alt}
              width={720}
              height={540}
              className="web-design-ecommerce-section__img image-reveal__img"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
