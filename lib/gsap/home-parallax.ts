import gsap from "gsap";
import { createHeroParallax, initParallaxElements } from "./animations";

import { MEDIA_BELOW_DESKTOP } from "@/lib/breakpoints";

function getMotionScale(): number {
  if (typeof window === "undefined") return 1;
  return window.matchMedia(MEDIA_BELOW_DESKTOP).matches
    ? 0.55
    : 1;
}

/** Parallax on the fixed home banner image while the page scrolls */
export function initHomeBannerParallax(
  media: HTMLElement,
  scrollTriggerEl: HTMLElement,
  reducedMotion: boolean
): void {
  if (reducedMotion) {
    gsap.set(media, { clearProps: "transform" });
    return;
  }

  const scale = getMotionScale();
  const yPercent = 22 * scale;
  const endScale = 1 + 0.14 * scale;

  gsap.set(media, {
    scale: 1.08,
    transformOrigin: "center center",
    force3D: true,
  });

  gsap.to(media, {
    yPercent,
    scale: endScale,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: scrollTriggerEl,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.25,
      invalidateOnRefresh: true,
    },
  });
}

export function initHomePageParallax(
  root: HTMLElement,
  options: {
    bannerMedia: HTMLElement;
    main: HTMLElement;
    reducedMotion: boolean;
  }
): void {
  const { bannerMedia, main, reducedMotion } = options;

  initHomeBannerParallax(bannerMedia, main, reducedMotion);

  const hero = root.querySelector<HTMLElement>("[data-hero-section]");
  if (hero) {
    createHeroParallax(hero, reducedMotion);
  }

  initParallaxElements(main, reducedMotion);
}
