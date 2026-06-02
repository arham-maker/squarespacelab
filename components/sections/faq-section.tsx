"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap/register";
import {
  closeFaqItem,
  openFaqItem,
  revealFaqSection,
  setFaqItemClosed,
} from "@/lib/gsap/faq-accordion";
import { initSectionHeadingScroll } from "@/lib/gsap/section-heading-scroll";
import { FAQ_ITEMS } from "@/lib/data/faq";

export function FaqSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const [closingId, setClosingId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasRevealedRef = useRef(false);

  const getParts = (id: string) => {
    const section = sectionRef.current;
    if (!section) return null;

    const answer = section.querySelector<HTMLElement>(`#faq-answer-${id}`);
    const icon = section.querySelector<HTMLElement>(`#faq-icon-${id}`);
    if (!answer || !icon) return null;

    return { answer, icon };
  };

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    FAQ_ITEMS.forEach((item) => {
      const parts = getParts(item.id);
      if (!parts) return;
      setFaqItemClosed(parts);
    });

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const items = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-faq-item]")
    );

    gsap.set(items, { autoAlpha: 0, y: 28 });

    let headingCleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (heading) {
        headingCleanup =
          initSectionHeadingScroll(heading, reducedMotion, {
            trigger: section,
            start: "top 88%",
            end: "top 38%",
            scrub: 0.9,
            staggerEach: 0.035,
          }) ?? undefined;
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (hasRevealedRef.current || !items.length) return;
          hasRevealedRef.current = true;
          revealFaqSection(items, reducedMotion);
        },
      });
    }, section);

    return () => {
      headingCleanup?.();
      ctx.revert();
    };
  }, [reducedMotion]);

  const queueOpen = (id: string) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const parts = getParts(id);
        if (!parts) return;
        timelineRef.current = openFaqItem(parts, reducedMotion);
      });
    });
  };

  const toggleItem = (id: string) => {
    timelineRef.current?.kill();

    if (openId === id) {
      const current = getParts(id);
      if (!current) return;

      setClosingId(id);
      setOpenId(null);
      timelineRef.current = closeFaqItem(current, reducedMotion, () => {
        setClosingId(null);
      });
      return;
    }

    if (openId) {
      const prev = getParts(openId);
      if (!prev) {
        setOpenId(id);
        queueOpen(id);
        return;
      }

      setClosingId(openId);
      setOpenId(null);
      timelineRef.current = closeFaqItem(prev, reducedMotion, () => {
        setClosingId(null);
        setOpenId(id);
        queueOpen(id);
      });
      return;
    }

    setOpenId(id);
    queueOpen(id);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-padding relative z-20 bg-black text-white"
    >
      <Container className="mx-auto w-full max-w-[1280px]">
        <h2 data-scroll-heading className="section-heading">
          Commonly Asked Questions
        </h2>

        <ul className="list-none">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const showAnswer = isOpen || closingId === item.id;

            return (
              <li
                key={item.id}
                data-faq-item
                className="border-b border-neutral-700 p-3 lg:p-4"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between gap-3 py-4 pr-8 pl-0 text-left sm:gap-4 lg:gap-6 lg:py-[22.4px] lg:pr-12"
                  aria-expanded={isOpen}
                >
                  <h4 className="text-faq-question m-0 pr-2 text-white lg:pr-0">
                    {item.question}
                  </h4>
                  <span
                    id={`faq-icon-${item.id}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-[28px] font-medium leading-none text-white will-change-transform lg:h-10 lg:w-10 lg:text-[40px]"
                    aria-hidden
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className="overflow-hidden"
                  aria-hidden={!showAnswer}
                >
                  {showAnswer ? (
                    <p className="text-body m-0 px-4 py-3 text-white sm:px-6 sm:py-4 lg:px-8">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
