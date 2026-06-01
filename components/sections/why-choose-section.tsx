"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WHY_CHOOSE, WHY_CHOOSE_FEATURES } from "@/lib/data/why-choose";
import { registerGsapPlugins } from "@/lib/gsap/register";
import {
  initSectionHeadingScroll,
  SECTION_HEADING_FADED_DARK,
  SECTION_HEADING_SOLID_DARK,
} from "@/lib/gsap/section-heading-scroll";

export function WhyChooseSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLElement>(null);
  const hasRevealedImageRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
    const image = imageRef.current;

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
            fadedColor: SECTION_HEADING_FADED_DARK,
            solidColor: "#212529",
          }) ?? undefined;
      }

      if (!image) return;

      if (reducedMotion) {
        gsap.set(image, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(image, { autoAlpha: 0, y: 32 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          if (hasRevealedImageRef.current) return;
          hasRevealedImageRef.current = true;
          gsap.to(image, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
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
      id="why-choose"
      className="section-padding relative z-20 bg-why-choose text-black"
      aria-label="Why Choose Squarespacemasters"
    >
      <Container>
        <h2
          data-scroll-heading
          className="text-why-choose-heading text-left font-normal"
        >
          {WHY_CHOOSE.titleLines.map((line) => (
            <span key={line} className="block" data-scroll-heading-line>
              {line}
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 lg:gap-x-16">
          <div className="lg:sticky lg:top-5 lg:self-start">
            <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              {WHY_CHOOSE_FEATURES.map((feature) => (
                <div key={feature.id}>
                  <h3 className="text-why-choose-feature-title m-0 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-body m-0 text-black">{feature.description}</p>
                </div>
              ))}
            </div>

            <a
              href={WHY_CHOOSE.cta.href}
              className="btn btn-outline mt-10 gap-3 sm:mt-12"
            >
              {WHY_CHOOSE.cta.label}
              <FiArrowRight className="h-8 w-8 shrink-0" strokeWidth={2.5} aria-hidden />
            </a>
          </div>

          <figure
            ref={imageRef}
            data-why-choose-media
            className="relative m-0 mx-auto aspect-square w-full max-w-[703px] overflow-hidden lg:mx-0 lg:h-[703px] lg:w-[703px] lg:max-w-none"
          >
            <Image
              src={WHY_CHOOSE.image}
              alt="Design professionals reviewing a Squarespace website on a laptop"
              width={703}
              height={703}
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 703px"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
