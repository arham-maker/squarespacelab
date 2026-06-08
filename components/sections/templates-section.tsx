"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_PREVIEW_HEIGHT,
  TEMPLATE_PREVIEW_WIDTH,
  TEMPLATES_INTRO,
} from "@/lib/data/templates";
import { registerGsapPlugins } from "@/lib/gsap/register";
import {
  animateTemplatesShowcasePage,
  initTemplatesShowcasePages,
} from "@/lib/gsap/templates-showcase";

export function TemplatesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(TEMPLATE_CATEGORIES[0].id);
  const bookRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    registerGsapPlugins();
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
      id="templates"
      className="section-padding relative z-20 bg-white text-black"
      aria-label="Customized website templates"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
          <h4 className="text-templates-display text-left font-normal">
            {TEMPLATES_INTRO.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h4>

          <div className="flex flex-col items-start lg:max-w-[600px]">
            <p className="text-templates-intro">{TEMPLATES_INTRO.description}</p>
            <CtaButton opensLeadForm className="btn btn-outline gap-3">
              {TEMPLATES_INTRO.cta.label}
              <FiArrowRight className="h-8 w-8 shrink-0" strokeWidth={2.5} aria-hidden />
            </CtaButton>
          </div>
        </div>

        <nav
          className="templates-showcase relative mt-12 sm:mt-16 lg:mt-20"
          aria-label="Template categories"
        >
          <ul className="templates-showcase__list m-0 list-none p-0">
            {TEMPLATE_CATEGORIES.map((category) => {
              const isActive = category.id === activeId;

              return (
                <li key={category.id} className="m-0">
                  <button
                    type="button"
                    className={`templates-showcase__tab text-left ${isActive ? "is-active" : ""}`}
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveId(category.id)}
                    onFocus={() => setActiveId(category.id)}
                    onClick={() => setActiveId(category.id)}
                  >
                    <span>{category.label}</span>
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
            {TEMPLATE_CATEGORIES.map((category, index) => (
              <div
                key={category.id}
                data-template-page={category.id}
                className={`templates-showcase__page ${category.id === activeId ? "is-active" : ""}`}
                aria-hidden={category.id !== activeId}
              >
                <Image
                  src={category.image}
                  alt={`${category.label} Squarespace template preview`}
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
