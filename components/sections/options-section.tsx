"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { OPTIONS_FEATURES } from "@/lib/data/options";
import { initOptionsImageRollIn } from "@/lib/gsap/options-image-roll-in";
import { initOptionsSectionLayout } from "@/lib/gsap/options-sticky";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function OptionsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();

    const section = sectionRef.current;
    const mediaCol = mediaRef.current;
    const trackCol = trackRef.current;
    const image = imageRef.current;
    if (!section || !mediaCol || !trackCol || !image) return;

    const refresh = () => ScrollTrigger.refresh();

    const cleanupLayout = initOptionsSectionLayout(section, mediaCol, trackCol);

    const ctx = gsap.context(() => {
      initOptionsImageRollIn(section, mediaCol, image, reducedMotion);
    }, section);

    const img = section.querySelector("img");
    const onImageLoad = () => refresh();

    if (img?.complete) {
      refresh();
    } else {
      img?.addEventListener("load", onImageLoad);
    }

    window.addEventListener("load", refresh);

    return () => {
      img?.removeEventListener("load", onImageLoad);
      window.removeEventListener("load", refresh);
      ctx.revert();
      cleanupLayout();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="options"
      data-options-section
      className="section-padding relative z-20 bg-dark-accent text-white"
      aria-label="Squarespace platform options"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:items-start lg:gap-0">
          <div
            ref={mediaRef}
            data-options-media
            className="overflow-hidden px-[15px] lg:flex lg:items-center lg:justify-center"
          >
            <figure
              ref={imageRef}
              data-options-image
              className="m-0 w-full max-w-[703px] will-change-transform"
            >
              <Image
                src="/home/options.webp"
                alt="Modern workspace with Squarespace website design on screen"
                width={703}
                height={641}
                className="mx-auto block h-auto w-full max-w-full object-contain lg:h-[641px] lg:w-[703px] lg:max-w-none"
                sizes="(max-width: 1024px) 100vw, 703px"
              />
            </figure>
          </div>

          <div
            ref={trackRef}
            data-options-track
            className="relative px-[15px]"
          >
            <div
              ref={stickyRef}
              data-options-sticky
              className="flex w-full flex-col justify-center lg:sticky lg:top-10 lg:py-8"
            >
              {OPTIONS_FEATURES.map((feature, index) => (
                <div
                  key={feature.id}
                  className={
                    index < OPTIONS_FEATURES.length - 1 ? "mb-6 sm:mb-8" : ""
                  }
                >
                  <h3 className="text-feature-title m-0 mb-3 text-white sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-body m-0 text-white lg:max-w-[470px]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
