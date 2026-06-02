import gsap from "gsap";
import { ScrollTrigger } from "./register";

export function initWhyChooseImageAnimation(
  section: HTMLElement,
  media: HTMLElement,
  reveal: HTMLElement,
  parallax: HTMLElement,
  reducedMotion: boolean
): () => void {
  if (reducedMotion) {
    gsap.set([reveal, parallax], { clearProps: "transform,opacity" });
    return () => {};
  }

  gsap.set(reveal, {
    scale: 1.14,
    autoAlpha: 0,
    x: -56,
    transformOrigin: "center center",
    force3D: true,
  });

  gsap.set(parallax, {
    scale: 1.12,
    yPercent: 4,
    transformOrigin: "center center",
    force3D: true,
  });

  const revealTween = gsap.to(reveal, {
    scale: 1,
    autoAlpha: 1,
    x: 0,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      end: "top 48%",
      scrub: 0.85,
      invalidateOnRefresh: true,
    },
  });

  const parallaxTween = gsap.to(parallax, {
    yPercent: -6,
    ease: "none",
    force3D: true,
    scrollTrigger: {
      trigger: media,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.85,
      invalidateOnRefresh: true,
    },
  });

  const onEnter = () => {
    gsap.to(parallax, {
      scale: 1.2,
      duration: 2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    gsap.to(parallax, {
      scale: 1.12,
      duration: 1.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  media.addEventListener("mouseenter", onEnter);
  media.addEventListener("mouseleave", onLeave);

  return () => {
    media.removeEventListener("mouseenter", onEnter);
    media.removeEventListener("mouseleave", onLeave);
    revealTween.scrollTrigger?.kill();
    revealTween.kill();
    parallaxTween.scrollTrigger?.kill();
    parallaxTween.kill();
    gsap.set([reveal, parallax], { clearProps: "transform,opacity" });
  };
}
