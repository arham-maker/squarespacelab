"use client";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { STREAMLINED, STREAMLINED_SLIDES, STREAMLINED_STEPS } from "@/lib/data/streamlined";
import {
  closeFaqItem,
  openFaqItem,
  setFaqItemClosed,
} from "@/lib/gsap/faq-accordion";
import { initSectionHeadingScroll, SECTION_HEADING_FADED_DARK } from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function StreamlinedSolutionsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const [closingId, setClosingId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const accordionTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const getAccordionParts = (id: string) => {
    const section = sectionRef.current;
    if (!section) return null;

    const answer = section.querySelector<HTMLElement>(`#streamlined-answer-${id}`);
    const icon = section.querySelector<HTMLElement>(`#streamlined-icon-${id}`);
    if (!answer || !icon) return null;

    return { answer, icon };
  };

  const queueAccordionOpen = (id: string) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const parts = getAccordionParts(id);
        if (!parts) return;
        accordionTimelineRef.current = openFaqItem(parts, reducedMotion);
      });
    });
  };

  const toggleStep = (id: string) => {
    accordionTimelineRef.current?.kill();

    if (openId === id) {
      const current = getAccordionParts(id);
      if (!current) return;

      setClosingId(id);
      setOpenId(null);
      accordionTimelineRef.current = closeFaqItem(current, reducedMotion, () => {
        setClosingId(null);
      });
      return;
    }

    if (openId) {
      const prev = getAccordionParts(openId);
      if (!prev) {
        setOpenId(id);
        queueAccordionOpen(id);
        return;
      }

      setClosingId(openId);
      setOpenId(null);
      accordionTimelineRef.current = closeFaqItem(prev, reducedMotion, () => {
        setClosingId(null);
        setOpenId(id);
        queueAccordionOpen(id);
      });
      return;
    }

    setOpenId(id);
    queueAccordionOpen(id);
  };

  useLayoutEffect(() => {
    registerGsapPlugins();

    const section = sectionRef.current;
    if (!section) return;

    STREAMLINED_STEPS.forEach((step) => {
      const parts = getAccordionParts(step.id);
      if (!parts) return;
      setFaqItemClosed(parts);
    });

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

    return () => {
      headingCleanup?.();
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
        <h2 data-scroll-heading className="text-why-choose-heading text-left font-normal lg:text-[206px]">
          {STREAMLINED.titleLines.map((line) => (
            <span key={line} className="block" data-scroll-heading-line>
              {line}
            </span>
          ))}
        </h2>

        <p className="text-streamlined-subtitle mb-4">{STREAMLINED.subtitle}</p>
      </Container>

      <div className="streamlined-slider-outer">
        <Swiper
          className="streamlined-slider mt-2"
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          speed={1000}
          loop={!reducedMotion}
          watchOverflow
          autoplay={
            reducedMotion
              ? false
              : {
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }
          }
          pagination={{
            type: "progressbar",
          }}
          breakpoints={{
            768: {
              slidesPerView: "auto",
            },
          }}
        >
          {STREAMLINED_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id} className="streamlined-slider__slide">
              <article className="streamlined-card">
                <Image
                  src={slide.image}
                  alt={`${slide.title} business template`}
                  width={593}
                  height={445}
                  className="streamlined-card__image"
                  sizes="(max-width: 767px) 100vw, 593px"
                />
                <h3 className="streamlined-card__title">{slide.title}</h3>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Container>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10">
          <h5 className="text-streamlined-process-heading m-0 font-normal">
            How We Create Your Squarespace Websites
          </h5>

          <ul className="streamlined-accordion m-0 list-none p-0">
            {STREAMLINED_STEPS.map((step) => {
              const isOpen = openId === step.id;
              const showAnswer = isOpen || closingId === step.id;

              return (
                <li key={step.id} className="streamlined-accordion__item">
                  <button
                    type="button"
                    className="streamlined-accordion__trigger"
                    onClick={() => toggleStep(step.id)}
                    aria-expanded={isOpen}
                  >
                    <h4 className="text-streamlined-step-title m-0">
                      {step.title}
                    </h4>
                    <span
                      id={`streamlined-icon-${step.id}`}
                      className="streamlined-accordion__icon will-change-transform"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    id={`streamlined-answer-${step.id}`}
                    className="overflow-hidden"
                    aria-hidden={!showAnswer}
                  >
                    {showAnswer ? (
                      <p className="text-body m-0 px-4 pb-4 text-[#212529]">
                        {step.description}
                      </p>
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
