"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { initHomePageParallax } from "@/lib/gsap/home-parallax";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { CollaborateSection } from "./collaborate-section";
import { EngageSection } from "./engage-section";
import { CustomWebsiteCtaSection } from "./custom-website-cta-section";
import { FaqSection } from "./faq-section";
import { HeroSection } from "./hero-section";
import { OptionsSection } from "./options-section";
import { ProjectsSection } from "./projects-section";
import { StreamlinedSolutionsSection } from "./streamlined-solutions-section";
import { TemplatesSection } from "./templates-section";
import { WhyChooseSection } from "./why-choose-section";

export function HomePage() {
  const reducedMotion = usePrefersReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  const bannerMediaRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();

    const root = pageRef.current;
    const bannerMedia = bannerMediaRef.current;
    const main = mainRef.current;

    if (!root || !bannerMedia || !main) return;

    const ctx = gsap.context(() => {
      initHomePageParallax(root, {
        bannerMedia,
        main,
        reducedMotion,
      });
    }, root);

    const refreshScroll = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener("load", refreshScroll);
    const delayedRefresh = window.setTimeout(refreshScroll, 500);

    return () => {
      window.removeEventListener("load", refreshScroll);
      window.clearTimeout(delayedRefresh);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={pageRef} className="flex min-h-full flex-1 flex-col">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-dvh w-full overflow-hidden lg:h-[110vh]"
        aria-hidden
        data-home-banner
      >
        <div
          ref={bannerMediaRef}
          data-home-banner-media
          className="absolute inset-x-0 top-0 h-full w-full"
        >
          <Image
            src="/home/home-banner.webp"
            alt=""
            fill
            priority
            className="home-hero__banner-img"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <main ref={mainRef} className="flex flex-1 flex-col">
          <div
            data-home-viewport
            className="flex min-h-dvh flex-col lg:h-[110vh] lg:max-h-[110vh] lg:min-h-[110vh]"
          >
            <SiteHeader />
            <HeroSection />
          </div>

          <ProjectsSection />
          <OptionsSection />
          <TemplatesSection />
          <EngageSection />
          <WhyChooseSection />
          <StreamlinedSolutionsSection />
          <FaqSection />
          <CollaborateSection />
          <CustomWebsiteCtaSection />
        </main>
      </div>

      <div className="relative z-20">
        <SiteFooter />
      </div>
    </div>
  );
}
