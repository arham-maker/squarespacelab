import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap/register";

/** Matches https://www.squarespacemasters.com/ lenisSetup() */
const REFERENCE_EASING = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

export type LenisInstance = Lenis;

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initLenisSmoothScroll(): () => void {
  const lenis = new Lenis({
    duration: 1.2,
    easing: REFERENCE_EASING,
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 2,
    autoRaf: false,
    allowNestedScroll: true,
  });

  lenisInstance = lenis;
  document.documentElement.classList.add("lenis");
  document.body.classList.add("scrolllenis", "lenis-smooth");

  lenis.on("scroll", ScrollTrigger.update);

  const onTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(onTicker);
  gsap.ticker.lagSmoothing(0);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    gsap.ticker.remove(onTicker);
    lenis.off("scroll", ScrollTrigger.update);
    lenis.destroy();
    lenisInstance = null;
    document.documentElement.classList.remove("lenis");
    document.body.classList.remove("scrolllenis", "lenis-smooth");
    ScrollTrigger.refresh();
  };
}
