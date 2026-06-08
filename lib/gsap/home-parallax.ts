import gsap from "gsap";
import { createHeroParallax, initParallaxElements } from "./animations";

import { MEDIA_BELOW_DESKTOP } from "@/lib/breakpoints";

function getMotionScale(): number {
  if (typeof window === "undefined") return 1;
  return window.matchMedia(MEDIA_BELOW_DESKTOP).matches
    ? 0.55
    : 1;
}

/** On-load hero intro — reference AOS fade-up on banner text block */
export function initHomeHeroIntro(
  bannerMedia: HTMLElement,
  hero: HTMLElement,
  reducedMotion: boolean
): void {
  const fgContent = hero.querySelector<HTMLElement>("[data-hero-fg]");

  if (fgContent) {
    if (reducedMotion) {
      gsap.set(fgContent, { autoAlpha: 1, y: 0, clearProps: "transform" });
    } else {
      gsap.fromTo(
        fgContent,
        { autoAlpha: 0, y: 100, force3D: true },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          ease: "power3.out",
          delay: 0.2,
          force3D: true,
        }
      );
    }
  }

  if (reducedMotion) {
    gsap.set(bannerMedia, { autoAlpha: 1, clearProps: "transform" });
    return;
  }

  gsap.fromTo(
    bannerMedia,
    {
      autoAlpha: 0,
      y: 40,
      scale: 1.12,
      transformOrigin: "center center",
      force3D: true,
    },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1.06,
      duration: 1.35,
      ease: "power3.out",
      delay: 0.05,
      force3D: true,
    }
  );
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

  const hero = root.querySelector<HTMLElement>("[data-hero-section]");
  if (hero) {
    initHomeHeroIntro(bannerMedia, hero, reducedMotion);
    createHeroParallax(hero, reducedMotion);
  }

  initHomeBannerParallax(bannerMedia, main, reducedMotion);

  initParallaxElements(main, reducedMotion);
}
