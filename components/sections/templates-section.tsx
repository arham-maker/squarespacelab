"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATES_INTRO,
} from "@/lib/data/templates";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function TemplatesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(TEMPLATE_CATEGORIES[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const activeCategory =
    TEMPLATE_CATEGORIES.find((item) => item.id === activeId) ??
    TEMPLATE_CATEGORIES[0];

  useLayoutEffect(() => {
    registerGsapPlugins();
    const preview = previewRef.current;
    if (!preview || reducedMotion) return;

    gsap.fromTo(
      preview,
      { autoAlpha: 0.35 },
      { autoAlpha: 1, duration: 0.4, ease: "power2.out", overwrite: true }
    );
  }, [activeId, reducedMotion]);

  return (
    <section
      ref={sectionRef}
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
          className="templates-showcase relative mt-12 min-h-[280px] sm:mt-16 sm:min-h-[360px] lg:mt-20 lg:min-h-[480px]"
          aria-label="Template categories"
        >
          <ul className="templates-showcase__list m-0 list-none p-0">
            {TEMPLATE_CATEGORIES.map((category) => {
              const isActive = category.id === activeId;

              return (
                <li key={category.id} className="m-0">
                  <button
                    type="button"
                    className={`templates-showcase__tab text-left py-4 ${isActive ? "is-active" : ""}`}
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveId(category.id)}
                    onFocus={() => setActiveId(category.id)}
                    onClick={() => setActiveId(category.id)}
                  >
                    <span>{category.label}</span>
                    <FiArrowRight
                      className="templates-showcase__arrow h-10 w-10 shrink-0"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            ref={previewRef}
            className="templates-showcase__preview relative mt-10 w-full overflow-hidden bg-neutral-900 lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:h-full lg:w-[60%]"
          >
            <Image
              key={activeCategory.id}
              src={activeCategory.image}
              alt={`${activeCategory.label} Squarespace template preview`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={activeCategory.id === TEMPLATE_CATEGORIES[0].id}
            />
          </div>
        </nav>
      </Container>
    </section>
  );
}
