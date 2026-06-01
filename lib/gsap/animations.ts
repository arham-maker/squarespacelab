import gsap from "gsap";
import { MEDIA_BELOW_DESKTOP } from "@/lib/breakpoints";
import { ScrollTrigger } from "./register";
import { initSectionHeadingScrollElements } from "./section-heading-scroll";

export type ParallaxOptions = {
  speed?: number;
  scrub?: number | boolean;
  trigger?: Element | string;
  start?: string;
  end?: string;
};

export type RevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
};

const DEFAULT_SCRUB = 1.15;

export function parallaxY(
  target: gsap.TweenTarget,
  options: ParallaxOptions = {}
): ScrollTrigger | void {
  const {
    speed = 0.15,
    scrub = DEFAULT_SCRUB,
    trigger,
    start = "top bottom",
    end = "bottom top",
  } = options;

  const distance = () => window.innerHeight * speed * 0.4;
  const scrollTriggerTarget = (trigger ?? target) as gsap.DOMTarget;

  return gsap.to(target, {
    y: distance,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: scrollTriggerTarget,
      start,
      end,
      scrub,
      invalidateOnRefresh: true,
    },
  }).scrollTrigger;
}

export function parallaxYPercent(
  target: gsap.TweenTarget,
  options: ParallaxOptions & { percent?: number } = {}
): ScrollTrigger | void {
  const {
    percent = 12,
    scrub = DEFAULT_SCRUB,
    trigger,
    start = "top top",
    end = "bottom top",
  } = options;

  const scrollTriggerTarget = (trigger ?? target) as gsap.DOMTarget;

  return gsap.to(target, {
    yPercent: percent,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: scrollTriggerTarget,
      start,
      end,
      scrub,
      invalidateOnRefresh: true,
    },
  }).scrollTrigger;
}

export function revealImmediate(
  targets: gsap.TweenTarget,
  reducedMotion: boolean,
  options: Pick<RevealOptions, "y" | "duration" | "stagger"> = {}
): void {
  const { y = 40, duration = 0.9, stagger = 0.12 } = options;

  if (reducedMotion) {
    gsap.set(targets, { autoAlpha: 1, y: 0, clearProps: "transform" });
    return;
  }

  gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      force3D: true,
      delay: 0.15,
    }
  );
}

export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element | string,
  options: RevealOptions = {}
): ScrollTrigger | void {
  const {
    y = 48,
    duration = 0.9,
    stagger = 0.1,
    start = "top 85%",
    once = true,
  } = options;

  gsap.set(targets, { autoAlpha: 0, y });

  return gsap.to(targets, {
    autoAlpha: 1,
    y: 0,
    duration,
    stagger,
    ease: "power2.out",
    force3D: true,
    scrollTrigger: {
      trigger,
      start,
      once,
      toggleActions: once ? "play none none none" : "play reverse play reverse",
    },
  }).scrollTrigger;
}

export function initParallaxElements(
  scope: ParentNode,
  reducedMotion: boolean
): void {
  const elements = scope.querySelectorAll<HTMLElement>("[data-parallax-speed]");

  elements.forEach((el) => {
    let speed = Number.parseFloat(
      el.getAttribute("data-parallax-speed") ?? "0.15"
    );
    if (window.matchMedia(MEDIA_BELOW_DESKTOP).matches) {
      speed *= 0.55;
    }
    const trigger =
      el.closest<HTMLElement>("[data-parallax-trigger]") ?? el.parentElement;

    if (reducedMotion) {
      gsap.set(el, { clearProps: "transform" });
      return;
    }

    parallaxY(el, {
      speed,
      trigger: trigger ?? el,
      scrub: Number.parseFloat(el.getAttribute("data-parallax-scrub") ?? "1.15"),
    });
  });
}

export function initRevealElements(
  scope: ParentNode,
  reducedMotion: boolean
): void {
  const groups = scope.querySelectorAll<HTMLElement>("[data-reveal-group]");

  groups.forEach((group) => {
    const children = group.querySelectorAll<HTMLElement>("[data-reveal]");
    const stagger = Number.parseFloat(
      group.getAttribute("data-reveal-stagger") ?? "0.1"
    );
    const y = Number.parseFloat(group.getAttribute("data-reveal-y") ?? "48");

    if (reducedMotion) {
      gsap.set(children.length ? children : group, {
        autoAlpha: 1,
        y: 0,
        clearProps: "transform",
      });
      return;
    }

    if (children.length) {
      revealOnScroll(children, group, { stagger, y });
    } else {
      revealOnScroll(group, group, { y });
    }
  });

  const standalone = Array.from(
    scope.querySelectorAll<HTMLElement>("[data-reveal]")
  ).filter((el) => !el.closest("[data-reveal-group]"));

  standalone.forEach((el) => {

    if (reducedMotion) {
      gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "transform" });
      return;
    }

    const y = Number.parseFloat(el.getAttribute("data-reveal-y") ?? "40");
    revealOnScroll(el, el, { y });
  });
}

export function initScrollAnimations(
  scope: ParentNode,
  reducedMotion: boolean
): void {
  if (reducedMotion) {
    const animated = scope.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-group], [data-parallax-speed], [data-scroll-heading]"
    );
    gsap.set(animated, { autoAlpha: 1, y: 0, clearProps: "transform" });
    initSectionHeadingScrollElements(scope, reducedMotion);
    return;
  }

  initParallaxElements(scope, reducedMotion);
  initRevealElements(scope, reducedMotion);
  initSectionHeadingScrollElements(scope, reducedMotion);
}

export function createHeroParallax(
  section: HTMLElement,
  reducedMotion: boolean
): void {
  const bgLayers = section.querySelectorAll<HTMLElement>("[data-hero-bg]");
  const fgContent = section.querySelector<HTMLElement>("[data-hero-fg]");
  const imageWrap = section.querySelector<HTMLElement>("[data-hero-image]");

  if (reducedMotion) {
    gsap.set([...bgLayers, fgContent, imageWrap].filter(Boolean), {
      clearProps: "transform",
    });
    return;
  }

  bgLayers.forEach((layer, index) => {
    const speed = 0.22 + index * 0.08;
    parallaxYPercent(layer, {
      percent: 18 + index * 6,
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.25,
    });
  });

  if (fgContent) {
    parallaxY(fgContent, {
      speed: -0.06,
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.1,
    });
  }

  if (imageWrap) {
    parallaxYPercent(imageWrap, {
      percent: -10,
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    });

    const img = imageWrap.querySelector("img");
    if (img) {
      gsap.to(img, {
        scale: 1.08,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }
  }
}
