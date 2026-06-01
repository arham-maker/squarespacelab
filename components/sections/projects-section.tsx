"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { PROJECT_ITEMS } from "@/lib/data/projects";
import {
  initProjectsMarqueeScroll,
  waitForTrackImages,
} from "@/lib/gsap/projects-horizontal-scroll";
import { registerGsapPlugins } from "@/lib/gsap/register";

function getReducedMotionPreference(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ProjectCard({
  project,
}: {
  project: (typeof PROJECT_ITEMS)[number];
}) {
  return (
    <article className="w-[min(85vw,320px)] shrink-0 sm:w-[360px] lg:w-[420px]">
      <div className="relative h-[390px] w-full overflow-hidden bg-neutral-200 sm:h-[440px] lg:h-[510px] lg:w-[420px]">
        <Image
          src={project.image}
          alt={`${project.title} website preview`}
          width={420}
          height={510}
          className="h-full w-full object-cover object-top"
          sizes="(max-width: 1024px) 360px, 420px"
        />
      </div>
      <h3 className="text-card-title m-0 mt-4 text-black">{project.title}</h3>
      <p className="text-body-lg m-0 mt-1 text-neutral-600">
        Category: {project.category}
      </p>
    </article>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const startMarquee = () => {
      cleanupRef.current?.();
      cleanupRef.current = initProjectsMarqueeScroll(
        { section, viewport, track },
        getReducedMotionPreference()
      );
    };

    startMarquee();

    void waitForTrackImages(track).then(() => {
      startMarquee();
      ScrollTrigger.refresh();
    });

    window.addEventListener("load", startMarquee);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => startMarquee();
    mediaQuery.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("load", startMarquee);
      mediaQuery.removeEventListener("change", onMotionChange);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section-padding relative z-20 overflow-hidden bg-primary-light pb-0 text-black"
      aria-label="Recent Successful Projects"
    >
      <Container className="pb-8 lg:pb-12">
        <h2 className="section-heading m-0 text-black capitalize">
          Recent Successful Projects
        </h2>
      </Container>

      <div
        ref={viewportRef}
        className="projects-marquee__viewport pb-8 lg:pb-12"
      >
        <div
          ref={trackRef}
          className="projects-marquee__track"
          data-projects-track
        >
          <div
            data-marquee-set
            className="projects-marquee__set gap-5 px-5 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8"
          >
            {PROJECT_ITEMS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div
            data-marquee-set
            aria-hidden
            className="projects-marquee__set gap-5 px-5 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8"
          >
            {PROJECT_ITEMS.map((project) => (
              <ProjectCard key={`${project.id}-copy`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
