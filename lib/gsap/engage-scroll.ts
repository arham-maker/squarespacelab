import gsap from "gsap";
import { ScrollTrigger } from "./register";
import { initImageReveal } from "./image-reveal";
import {
  initSectionHeadingScroll,
  SECTION_HEADING_SOLID,
} from "./section-heading-scroll";

export function initEngageSectionScroll(
  section: HTMLElement,
  reducedMotion: boolean
): () => void {
  const cleanups: Array<() => void> = [];

  const heading = section.querySelector<HTMLElement>("[data-scroll-heading]");
  if (heading) {
    const headingCleanup = initSectionHeadingScroll(heading, reducedMotion, {
      trigger: section,
      start: "top 88%",
      end: "top 42%",
      scrub: 0.9,
      staggerEach: 0.03,
      fadedColor: "rgba(255, 255, 255, 0.21)",
      solidColor: SECTION_HEADING_SOLID,
    });
    if (headingCleanup) cleanups.push(headingCleanup);
  }

  cleanups.push(initImageReveal(section, reducedMotion));

  const revealTargets = gsap.utils.toArray<HTMLElement>(
    section.querySelectorAll("[data-engage-reveal]")
  );

  if (reducedMotion) {
    gsap.set(revealTargets, { autoAlpha: 1, y: 0 });
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }

  gsap.set(revealTargets, { autoAlpha: 0, y: 36 });

  revealTargets.forEach((target) => {
    const tween = gsap.to(target, {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power2.out",
      scrollTrigger: {
        trigger: target,
        start: "top 90%",
        once: true,
      },
    });

    cleanups.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
    gsap.set(revealTargets, { clearProps: "all" });
    ScrollTrigger.refresh();
  };
}
