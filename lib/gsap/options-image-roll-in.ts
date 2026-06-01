import gsap from "gsap";
import { ScrollTrigger } from "./register";

export function initOptionsImageRollIn(
  section: HTMLElement,
  mediaCol: HTMLElement,
  image: HTMLElement,
  reducedMotion: boolean
): () => void {
  if (reducedMotion) {
    gsap.set(image, { clearProps: "transform,opacity" });
    return () => {};
  }

  gsap.set(image, {
    xPercent: -105,
    autoAlpha: 0,
    rotation: -7,
    transformOrigin: "center center",
    force3D: true,
  });

  const tween = gsap.to(image, {
    xPercent: 0,
    autoAlpha: 1,
    rotation: 0,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: section,
      start: "top 88%",
      end: "top 42%",
      scrub: 0.85,
      invalidateOnRefresh: true,
    },
  });

  const onRefresh = () => {
    if (mediaCol.offsetWidth === 0) return;
    ScrollTrigger.refresh();
  };

  window.addEventListener("load", onRefresh);

  return () => {
    window.removeEventListener("load", onRefresh);
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(image, { clearProps: "transform,opacity" });
  };
}
