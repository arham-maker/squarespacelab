"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { STREAMLINED, STREAMLINED_SLIDES, STREAMLINED_STEPS } from "@/lib/data/streamlined";
import { initSectionHeadingScroll, SECTION_HEADING_FADED_DARK } from "@/lib/gsap/section-heading-scroll";
import { initStreamlinedSlider } from "@/lib/gsap/streamlined-slider";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function StreamlinedSolutionsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !viewport || !track || !progress) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    let headingCleanup: (() => void) | undefined;

    if (heading) {
      headingCleanup =
        initSectionHeadingScroll(heading, reducedMotion, {
          trigger: section,
          start: "top 88%",
          end: "top 40%",
          scrub: 0.9,
          staggerEach: 0.03,
          fadedColor: SECTION_HEADING_FADED_DARK,
          solidColor: "#212529",
        }) ?? undefined;
    }

    const sliderCleanup = initStreamlinedSlider(
      { viewport, track, progress },
      reducedMotion
    );

    return () => {
      headingCleanup?.();
      sliderCleanup?.();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="streamlined-solutions"
      className="section-padding relative z-20 bg-streamlined text-black"
      aria-label="Streamlined Solutions for Your Business"
    >
      <Container>
        <h2 data-scroll-heading className="text-why-choose-heading text-left font-normal">
          {STREAMLINED.titleLines.map((line) => (
            <span key={line} className="block" data-scroll-heading-line>
              {line}
            </span>
          ))}
        </h2>

        <p className="text-streamlined-subtitle mb-4">{STREAMLINED.subtitle}</p>

        <div ref={viewportRef} className="streamlined-slider mt-2 overflow-hidden">
          <div ref={trackRef} className="streamlined-slider__track">
            {[0, 1].map((copy) => (
              <div key={copy} data-streamlined-set className="streamlined-slider__set" aria-hidden={copy === 1}>
                {STREAMLINED_SLIDES.map((slide) => (
                  <article key={`${slide.id}-${copy}`} className="streamlined-card">
                    <Image
                      src={slide.image}
                      alt={`${slide.title} business template`}
                      width={473}
                      height={516}
                      className="streamlined-card__image"
                      sizes="(max-width: 1024px) 70vw, 33vw"
                    />
                    <h3 className="streamlined-card__title">{slide.title}</h3>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="streamlined-progress" aria-hidden>
          <span ref={progressRef} className="streamlined-progress__bar" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10">
          <h5 className="text-streamlined-process-heading m-0 font-normal">
            How We Create Your Squarespace Websites
          </h5>

          <ul className="streamlined-accordion m-0 list-none p-0">
            {STREAMLINED_STEPS.map((step) => {
              const isOpen = openId === step.id;
              return (
                <li key={step.id} className="streamlined-accordion__item">
                  <button
                    type="button"
                    className="streamlined-accordion__trigger"
                    onClick={() => setOpenId(isOpen ? null : step.id)}
                    aria-expanded={isOpen}
                  >
                    <h4 className="text-streamlined-step-title m-0">
                      {step.title}
                    </h4>
                    <span
                      className="streamlined-accordion__icon"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`streamlined-step__content ${isOpen ? "is-open" : ""}`}
                    aria-hidden={!isOpen}
                  >
                    {isOpen ? (
                      <div className="streamlined-step__content-inner">
                        <p className="text-body m-0 text-[#212529]">
                          {step.description}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
