import gsap from "gsap";

export type FaqAccordionParts = {
  answer: HTMLElement;
  icon: HTMLElement;
};

export function setFaqItemClosed({ answer, icon }: FaqAccordionParts): void {
  gsap.set(answer, { height: 0, autoAlpha: 0, overflow: "hidden" });
  gsap.set(icon, { scale: 1 });
  icon.textContent = "+";
}

export function openFaqItem(
  { answer, icon }: FaqAccordionParts,
  reducedMotion: boolean
): gsap.core.Timeline {
  if (reducedMotion) {
    gsap.set(answer, { height: "auto", autoAlpha: 1, overflow: "hidden" });
    icon.textContent = "−";
    return gsap.timeline();
  }

  gsap.set(answer, { height: "auto", autoAlpha: 0, overflow: "hidden" });
  const targetHeight = answer.scrollHeight;

  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

  tl.fromTo(
    answer,
    { height: 0, autoAlpha: 0 },
    { height: targetHeight, autoAlpha: 1, duration: 0.5 }
  ).to(
    icon,
    {
      scale: 0.85,
      duration: 0.15,
      onComplete: () => {
        icon.textContent = "−";
      },
    },
    0
  ).to(icon, { scale: 1, duration: 0.2 }, 0.12);

  return tl;
}

export function closeFaqItem(
  { answer, icon }: FaqAccordionParts,
  reducedMotion: boolean,
  onComplete?: () => void
): gsap.core.Timeline {
  if (reducedMotion) {
    setFaqItemClosed({ answer, icon });
    onComplete?.();
    return gsap.timeline();
  }

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => {
      gsap.set(answer, { height: 0, overflow: "hidden" });
      onComplete?.();
    },
  });

  tl.to(answer, { height: 0, autoAlpha: 0, duration: 0.4 })
    .to(
      icon,
      {
        scale: 0.85,
        duration: 0.12,
        onComplete: () => {
          icon.textContent = "+";
        },
      },
      0.05
    )
    .to(icon, { scale: 1, duration: 0.18 }, 0.18);

  return tl;
}

export function revealFaqSection(
  elements: HTMLElement[],
  reducedMotion: boolean
): void {
  if (reducedMotion) {
    gsap.set(elements, { autoAlpha: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    elements,
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.07,
      ease: "power2.out",
      overwrite: true,
    }
  );
}
