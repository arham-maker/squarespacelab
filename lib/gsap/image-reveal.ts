import gsap from "gsap";
import { ScrollTrigger } from "./register";

/** Clip-style image reveal (reference site `.reveal` + `img`), scrubbed to scroll. */
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

    gsap.set(container, { overflow: "hidden" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 88%",
        end: "top 48%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      container,
      { autoAlpha: 0, xPercent: -100 },
      { autoAlpha: 1, xPercent: 0, ease: "none", duration: 1 }
    ).fromTo(
      image,
      { xPercent: 100, scale: 1.3 },
      { xPercent: 0, scale: 1, ease: "none", duration: 1 },
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
