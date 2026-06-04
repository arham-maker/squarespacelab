"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { LOGO_DESIGN_INTRO, LOGO_DESIGN_INTRO_IMAGES } from "@/lib/data/logo-design";
import {
  initSectionHeadingScroll,
  SECTION_HEADING_FADED_DARK,
} from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function LogoDesignIntroSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-ld-intro-reveal]");
    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");

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

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      headingCleanup?.();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="logo-design-intro-section"
      aria-label="Why professional logo design is necessary"
    >
      <Container>
        <div className="logo-design-intro-section__layout">
          <div className="logo-design-intro-section__copy">
            <h2
              data-scroll-heading
              data-scroll-heading-start="top 90%"
              data-scroll-heading-end="top 18%"
              data-scroll-heading-scrub="0.9"
              data-scroll-heading-stagger="0.025"
              className="text-ld-intro-title m-0 text-left font-normal"
            >
              {LOGO_DESIGN_INTRO.titleLines.map((line) => (
                <span key={line} className="block" data-scroll-heading-line>
                  {line}
                </span>
              ))}
            </h2>

            <div data-ld-intro-reveal className="logo-design-intro-section__content">
              {LOGO_DESIGN_INTRO.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-dm-intro-desc m-0">
                  {paragraph}
                </p>
              ))}
              <ul className="logo-design-intro-section__list m-0">
                {LOGO_DESIGN_INTRO.bullets.map((item) => (
                  <li key={item} className="text-dm-intro-desc">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="logo-design-intro-section__images">
            {LOGO_DESIGN_INTRO_IMAGES.map((image) => (
              <figure
                key={image.src}
                data-ld-intro-reveal
                className="logo-design-intro-section__figure m-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={640}
                  height={480}
                  className="logo-design-intro-section__img"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
