"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { COLLABORATE_CARDS } from "@/lib/data/collaborate";
import { initSectionHeadingScroll } from "@/lib/gsap/section-heading-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";
import { FiArrowRight } from "react-icons/fi";

export function CollaborateSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedCardsRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const cards = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-collaborate-card]")
    );

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

      if (reducedMotion) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(cards, { autoAlpha: 0, y: 32 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          if (hasRevealedCardsRef.current || !cards.length) return;
          hasRevealedCardsRef.current = true;
          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.14,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    }, section);

    return () => {
      headingCleanup?.();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="collaborate"
      className="section-padding relative z-20 bg-black text-white"
    >
      <Container className="mx-auto w-full ">
        <h2 data-scroll-heading className="section-heading lg:mb-20">
          Let&apos;s Collaborate
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {COLLABORATE_CARDS.map((card) => (
            <a
              key={card.id}
              href={card.href}
              data-collaborate-card
              className="group flex min-h-[180px] flex-col justify-between rounded-none border border-[rgba(255,255,255,0.2)] bg-black p-6 transition-[border-color] duration-300 hover:border-[rgba(255,255,255,0.45)] sm:min-h-[200px] lg:min-h-[260px] lg:p-8"
            >
              <div>
                <h3 className="text-collaborate-title mb-3 text-white sm:mb-4 lg:mb-4">
                  {card.title}
                </h3>
                <p className="text-body mb-6 text-white sm:mb-8">
                  {card.description}
                </p>
              </div>
              <div className="flex justify-end pt-6 lg:pt-12">
                <FiArrowRight
                  className="h-9 w-8 shrink-0 text-white transition-transform duration-300 ease-out group-hover:translate-x-1.5 lg:h-12 lg:w-11"
                  strokeWidth={1}
                  aria-hidden
                />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
