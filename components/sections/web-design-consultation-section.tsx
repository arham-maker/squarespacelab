"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WEB_DESIGN_CONSULTATION } from "@/lib/data/web-design";
import {
  initSectionHeadingScroll,
  SECTION_HEADING_FADED,
} from "@/lib/gsap/section-heading-scroll";
import { initImageReveal } from "@/lib/gsap/image-reveal";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function WebDesignConsultationSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");

    const headingCleanup = heading
      ? initSectionHeadingScroll(heading, reducedMotion, {
          trigger: section,
          start: "top 90%",
          end: "top 18%",
          scrub: 0.9,
          staggerEach: 0.025,
          fadedColor: SECTION_HEADING_FADED,
          solidColor: "#ffffff",
        })
      : undefined;

    const imageCleanup = initImageReveal(section, reducedMotion);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      headingCleanup?.();
      imageCleanup();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="web-design-consultation-section"
      aria-label="Book your free consultation"
    >
      <Container>
        <div className="web-design-consultation-section__layout">
          <div className="web-design-consultation-section__copy">
            <p className="text-wd-consultation-label m-0">
              {WEB_DESIGN_CONSULTATION.label}
            </p>
            <h2
              data-scroll-heading
              className="text-wd-consultation-heading m-0 font-normal"
            >
              {WEB_DESIGN_CONSULTATION.titleLines.map((line) => (
                <span key={line} className="block" data-scroll-heading-line>
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <figure
            data-image-reveal
            className="web-design-consultation-section__figure image-reveal m-0"
          >
            <Image
              src={WEB_DESIGN_CONSULTATION.image.src}
              alt={WEB_DESIGN_CONSULTATION.image.alt}
              width={720}
              height={540}
              className="web-design-consultation-section__img image-reveal__img"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
