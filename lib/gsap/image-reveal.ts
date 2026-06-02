import gsap from "gsap";
import { ScrollTrigger } from "./register";

/** Clip-style image reveal (reference site `.reveal` + `img`). */
export function initImageReveal(
  scope: ParentNode,
  reducedMotion: boolean
): () => void {
  const containers = Array.from(
    scope.querySelectorAll<HTMLElement>("[data-image-reveal]")
  );

  if (!containers.length) return () => {};

  if (reducedMotion) {
    containers.forEach((container) => {
      const image = container.querySelector("img");
      gsap.set(container, { autoAlpha: 1, clearProps: "transform" });
      if (image) gsap.set(image, { clearProps: "transform" });
    });
    return () => {};
  }

  const timelines: gsap.core.Timeline[] = [];

  containers.forEach((container) => {
    const image = container.querySelector<HTMLElement>("img");
    if (!image) return;

    gsap.set(container, { autoAlpha: 0, overflow: "hidden" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 88%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    tl.set(container, { autoAlpha: 1 })
      .from(container, {
        xPercent: -100,
        duration: 1.5,
        ease: "power2.out",
      })
      .from(
        image,
        {
          xPercent: 100,
          scale: 1.3,
          duration: 1.5,
          ease: "power2.out",
        },
        "<"
      );

    timelines.push(tl);
  });

  return () => {
    timelines.forEach((tl) => {
      tl.scrollTrigger?.kill();
      tl.kill();
    });
    containers.forEach((container) => {
      const image = container.querySelector("img");
      gsap.set(container, { clearProps: "all" });
      if (image) gsap.set(image, { clearProps: "all" });
    });
  };
}
