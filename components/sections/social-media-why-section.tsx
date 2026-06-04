"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SOCIAL_MEDIA_WHY } from "@/lib/data/social-media";
import {
  initSectionHeadingScroll,
  SECTION_HEADING_FADED_DARK,
} from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SocialMediaWhySection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const targets = section.querySelectorAll("[data-sm-why-reveal]");

    const headingCleanup = heading
      ? initSectionHeadingScroll(heading, reducedMotion, {
          trigger: section,
          start: "top 90%",
          end: "top 18%",
          scrub: 0.9,
          staggerEach: 0.025,
          fadedColor: SECTION_HEADING_FADED_DARK,
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
      className="social-media-why-section"
      aria-label="Why choose us for social media"
    >
      <Container>
        <div className="social-media-why-section__layout">
          <div data-sm-why-reveal className="social-media-why-section__copy">
            <h2
              data-scroll-heading
              className="text-sm-why-heading m-0 font-normal"
            >
              {SOCIAL_MEDIA_WHY.titleLines.map((line, index) => (
                <span
                  key={line}
                  className={`block ${index === 0 ? "text-sm-why-heading__line--nowrap" : ""}`}
                  data-scroll-heading-line
                >
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-sm-why-desc m-0">{SOCIAL_MEDIA_WHY.description}</p>
          </div>

          <figure
            data-sm-why-reveal
            className="social-media-why-section__figure m-0"
          >
            <Image
              src={SOCIAL_MEDIA_WHY.image.src}
              alt={SOCIAL_MEDIA_WHY.image.alt}
              width={720}
              height={540}
              className="social-media-why-section__img"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
