"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  ENGAGE_CTA,
  ENGAGE_FEATURE_ROWS,
  ENGAGE_GROW_BLOCKS,
  ENGAGE_HEADING,
} from "@/lib/data/engage";
import { initEngageSectionScroll } from "@/lib/gsap/engage-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function EngageSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    return initEngageSectionScroll(section, reducedMotion);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="engage"
      className="engage-section section-padding relative z-20 text-white"
      aria-label="Engage, Inspire, Convert"
    >
      <Container>
        <h2
          data-scroll-heading
          className="text-engage-heading text-left font-normal"
        >
          {ENGAGE_HEADING.titleLines.map((line) => (
            <span key={line} className="block" data-scroll-heading-line>
              {line}
            </span>
          ))}
        </h2>

        {ENGAGE_GROW_BLOCKS.map((block) => (
          <article key={block.id} className="engage-grow">
            <h4
              data-engage-reveal
              className="text-engage-subheading m-0 font-normal"
            >
              {block.subheadingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h4>

            <figure className="engage-reveal" data-image-reveal>
              <Image
                src={block.image}
                alt=""
                width={1200}
                height={720}
                className="engage-reveal__image h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 90vw"
              />
            </figure>

            <div className="engage-grow__footer">
              <p data-engage-reveal className="engage-grow__label m-0">
                {block.label}
              </p>
              <div data-engage-reveal className="engage-grow__copy">
                <p className="text-body m-0 text-white">{block.description}</p>
                <a
                  href={ENGAGE_CTA.href}
                  className="btn btn-outline-light mt-6 gap-3"
                >
                  {ENGAGE_CTA.label}
                  <FiArrowRight
                    className="h-8 w-8 shrink-0"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </article>
        ))}

        {ENGAGE_FEATURE_ROWS.map((row) => (
          <div
            key={row.id}
            className={`engage-row engage-row--image-${row.imagePosition}`}
          >
            <figure
              className="engage-reveal engage-row__media"
              data-image-reveal
            >
              <Image
                src={row.image}
                alt=""
                width={900}
                height={620}
                className="engage-reveal__image h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </figure>

            <div className="engage-row__content">
              <h3
                data-engage-reveal
                className="text-engage-feature-title m-0 font-bold"
              >
                {row.title}
              </h3>
              <p data-engage-reveal className="text-body m-0 mt-4 text-white">
                {row.description}
              </p>
              <a
                data-engage-reveal
                href={ENGAGE_CTA.href}
                className="btn btn-outline-light mt-8 gap-3"
              >
                {ENGAGE_CTA.label}
                <FiArrowRight
                  className="h-8 w-8 shrink-0"
                  strokeWidth={2.5}
                  aria-hidden
                />
              </a>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
