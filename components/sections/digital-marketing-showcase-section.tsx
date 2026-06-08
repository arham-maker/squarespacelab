"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  DIGITAL_MARKETING_SERVICES,
  DIGITAL_MARKETING_SHOWCASE,
} from "@/lib/data/digital-marketing";
import {
  TEMPLATE_PREVIEW_HEIGHT,
  TEMPLATE_PREVIEW_WIDTH,
} from "@/lib/data/templates";
import {
  initSectionHeadingScroll,
  SECTION_HEADING_FADED_DARK,
} from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";
import {
  animateTemplatesShowcasePage,
  initTemplatesShowcasePages,
} from "@/lib/gsap/templates-showcase";

export function DigitalMarketingShowcaseSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(DIGITAL_MARKETING_SERVICES[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const hasRevealedSubtitleRef = useRef(false);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const subtitle = section.querySelector<HTMLElement>("[data-dm-showcase-subtitle]");
    const showcase = section.querySelector<HTMLElement>("[data-dm-showcase-nav]");

    let headingCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (heading) {
        headingCleanup =
          initSectionHeadingScroll(heading, reducedMotion, {
            trigger: section,
            start: "top 88%",
            end: "top 28%",
            scrub: 0.9,
            staggerEach: 0.035,
            fadedColor: SECTION_HEADING_FADED_DARK,
            solidColor: "#000000",
          }) ?? undefined;
      }

      if (reducedMotion) {
        gsap.set([subtitle, showcase], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set([subtitle, showcase], { autoAlpha: 0, y: 28 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        once: true,
        onEnter: () => {
          if (hasRevealedSubtitleRef.current) return;
          hasRevealedSubtitleRef.current = true;
          gsap.to([subtitle, showcase], {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
          });
        },
      });
    }, section);

    return () => {
      headingCleanup?.();
      ctx.revert();
    };
  }, [reducedMotion]);

  useLayoutEffect(() => {
    const book = bookRef.current;
    if (!book) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return initTemplatesShowcasePages(book, activeId, reducedMotion);
    }

    animateTemplatesShowcasePage(book, activeId, reducedMotion);
  }, [activeId, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="digital-marketing-showcase-section"
      aria-label="Digital marketing services showcase"
    >
      <Container>
        <h2
          data-scroll-heading
          className="text-dm-showcase-heading mb-10 font-normal"
        >
          {DIGITAL_MARKETING_SHOWCASE.titleLines.map((line) => (
            <span key={line} className="block" data-scroll-heading-line>
              {line}
            </span>
          ))}
        </h2>

        <p
          data-dm-showcase-subtitle
          className="text-dm-showcase-subtitle m-0"
        >
          {DIGITAL_MARKETING_SHOWCASE.subtitle}
        </p>

        <nav
          data-dm-showcase-nav
          className="templates-showcase relative mt-10 sm:mt-12 lg:mt-16"
          aria-label="Related services"
        >
          <ul className="templates-showcase__list m-0 list-none p-0">
            {DIGITAL_MARKETING_SERVICES.map((service) => {
              const isActive = service.id === activeId;

              return (
                <li key={service.id} className="m-0">
                  <button
                    type="button"
                    className={`templates-showcase__tab text-left ${isActive ? "is-active" : ""}`}
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveId(service.id)}
                    onFocus={() => setActiveId(service.id)}
                    onClick={() => setActiveId(service.id)}
                  >
                    <span>{service.label}</span>
                    <FiArrowRight
                      className="templates-showcase__arrow shrink-0"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            ref={bookRef}
            className="templates-showcase__book"
            aria-live="polite"
          >
            {DIGITAL_MARKETING_SERVICES.map((service, index) => (
              <div
                key={service.id}
                data-template-page={service.id}
                className={`templates-showcase__page ${service.id === activeId ? "is-active" : ""}`}
                aria-hidden={service.id !== activeId}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={TEMPLATE_PREVIEW_WIDTH}
                  height={TEMPLATE_PREVIEW_HEIGHT}
                  className="templates-showcase__image"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </nav>
      </Container>
    </section>
  );
}
