"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WHY_CHOOSE, WHY_CHOOSE_FEATURES } from "@/lib/data/why-choose";
import { registerGsapPlugins } from "@/lib/gsap/register";
import {
  initSectionHeadingScroll,
  SECTION_HEADING_FADED_DARK,
} from "@/lib/gsap/section-heading-scroll";
import { initWhyChooseContentScroll } from "@/lib/gsap/why-choose-content";
import { initWhyChooseImageAnimation } from "@/lib/gsap/why-choose-image";

export function WhyChooseSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const imageParallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const media = mediaRef.current;
    const imageReveal = imageRevealRef.current;
    const imageParallax = imageParallaxRef.current;
    if (!section) return;

    const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");

    let headingCleanup: (() => void) | undefined;
    let imageCleanup: (() => void) | undefined;
    let contentCleanup: (() => void) | undefined;

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

      contentCleanup = initWhyChooseContentScroll(section, reducedMotion);

      if (media && imageReveal && imageParallax) {
        imageCleanup = initWhyChooseImageAnimation(
          section,
          media,
          imageReveal,
          imageParallax,
          reducedMotion
        );
      }
    }, section);

    return () => {
      headingCleanup?.();
      contentCleanup?.();
      imageCleanup?.();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="section-padding relative z-20 bg-why-choose text-black"
      aria-label="Why Choose Squarespacedev"
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
                <div key={feature.id} data-why-choose-reveal>
                  <h3 className="text-why-choose-feature-title m-0 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-body m-0 text-black">{feature.description}</p>
                </div>
              ))}
            </div>

            <CtaButton
              opensLeadForm
              data-why-choose-reveal
              className="btn btn-outline mt-10 gap-3 sm:mt-12"
            >
              {WHY_CHOOSE.cta.label}
              <FiArrowRight className="h-8 w-8 shrink-0" strokeWidth={2.5} aria-hidden />
            </CtaButton>
          </div>

          <figure
            ref={mediaRef}
            data-why-choose-media
            className="relative m-0 mx-auto aspect-square w-full max-w-[703px] cursor-pointer overflow-hidden lg:mx-0 lg:h-[703px] lg:w-[703px] lg:max-w-none"
          >
            <div
              ref={imageRevealRef}
              data-why-choose-image-reveal
              className="h-full w-full will-change-transform"
            >
              <div
                ref={imageParallaxRef}
                data-why-choose-image-parallax
                className="relative h-[112%] w-full will-change-transform"
                style={{ top: "-6%" }}
              >
                <Image
                  src={WHY_CHOOSE.image}
                  alt="Design professionals reviewing a Squarespace website on a laptop"
                  width={703}
                  height={703}
                  className="h-full w-full object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 703px"
                />
              </div>
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
}
