import gsap from "gsap";

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setReducedMotionFinalState(
  elements: gsap.TweenTarget
): void {
  gsap.set(elements, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
}
