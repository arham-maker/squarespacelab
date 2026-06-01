import gsap from "gsap";

export type MobileMenuElements = {
  root: HTMLElement;
  backdrop: HTMLElement;
  panel: HTMLElement;
  items: HTMLElement[];
  sections?: HTMLElement[];
};

export function setMobileMenuClosed(elements: MobileMenuElements): void {
  const { root, backdrop, panel, items, sections = [] } = elements;

  gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
  gsap.set(backdrop, { autoAlpha: 0 });
  gsap.set(panel, { xPercent: 100 });
  gsap.set([...items, ...sections], { autoAlpha: 0, y: 28 });
}

export function openMobileMenu(
  elements: MobileMenuElements,
  reducedMotion: boolean
): gsap.core.Timeline {
  const { root, backdrop, panel, items, sections = [] } = elements;

  if (reducedMotion) {
    gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(backdrop, { autoAlpha: 1 });
    gsap.set(panel, { xPercent: 0 });
    gsap.set([...items, ...sections], { autoAlpha: 1, y: 0 });
    return gsap.timeline();
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  tl.set(root, { pointerEvents: "auto" })
    .to(root, { autoAlpha: 1, duration: 0.25 })
    .to(backdrop, { autoAlpha: 1, duration: 0.35 }, 0)
    .to(panel, { xPercent: 0, duration: 0.55, ease: "power4.out" }, 0.05)
    .to(
      sections,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
      },
      0.2
    )
    .to(
      items,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.045,
        ease: "power2.out",
      },
      0.28
    );

  return tl;
}

export function closeMobileMenu(
  elements: MobileMenuElements,
  reducedMotion: boolean
): gsap.core.Timeline {
  const { root, backdrop, panel, items, sections = [] } = elements;

  if (reducedMotion) {
    setMobileMenuClosed(elements);
    return gsap.timeline();
  }

  const tl = gsap.timeline({
    defaults: { ease: "power3.in" },
    onComplete: () => setMobileMenuClosed(elements),
  });

  tl.to(items, {
    autoAlpha: 0,
    y: 20,
    duration: 0.2,
    stagger: { each: 0.02, from: "end" },
  })
    .to(
      sections,
      {
        autoAlpha: 0,
        y: 16,
        duration: 0.18,
        stagger: 0.03,
      },
      0.05
    )
    .to(panel, { xPercent: 100, duration: 0.4, ease: "power3.in" }, 0.12)
    .to(backdrop, { autoAlpha: 0, duration: 0.25 }, 0.2)
    .to(root, { autoAlpha: 0, duration: 0.2 }, 0.28)
    .set(root, { pointerEvents: "none" });

  return tl;
}

export type HamburgerElements = {
  top: HTMLElement;
  middle: HTMLElement;
  bottom: HTMLElement;
};

export function animateHamburgerOpen(
  lines: HamburgerElements,
  reducedMotion: boolean
): void {
  if (reducedMotion) {
    gsap.set(lines.top, { y: 8, rotation: 45 });
    gsap.set(lines.middle, { autoAlpha: 0 });
    gsap.set(lines.bottom, { y: -8, rotation: -45 });
    return;
  }

  gsap.to(lines.top, {
    y: 8,
    rotation: 45,
    duration: 0.35,
    ease: "power2.inOut",
  });
  gsap.to(lines.middle, { autoAlpha: 0, duration: 0.2 });
  gsap.to(lines.bottom, {
    y: -8,
    rotation: -45,
    duration: 0.35,
    ease: "power2.inOut",
  });
}

export function animateHamburgerClose(
  lines: HamburgerElements,
  reducedMotion: boolean
): void {
  if (reducedMotion) {
    gsap.set(lines.top, { y: 0, rotation: 0 });
    gsap.set(lines.middle, { autoAlpha: 1 });
    gsap.set(lines.bottom, { y: 0, rotation: 0 });
    return;
  }

  gsap.to(lines.top, {
    y: 0,
    rotation: 0,
    duration: 0.35,
    ease: "power2.inOut",
  });
  gsap.to(lines.middle, { autoAlpha: 1, duration: 0.25, delay: 0.05 });
  gsap.to(lines.bottom, {
    y: 0,
    rotation: 0,
    duration: 0.35,
    ease: "power2.inOut",
  });
}

export function toggleServicesList(
  list: HTMLElement,
  isOpen: boolean,
  reducedMotion: boolean
): gsap.core.Timeline {
  if (reducedMotion) {
    gsap.set(list, { height: isOpen ? "auto" : 0, autoAlpha: isOpen ? 1 : 0 });
    return gsap.timeline();
  }

  return gsap.timeline().to(list, {
    height: isOpen ? "auto" : 0,
    autoAlpha: isOpen ? 1 : 0,
    duration: 0.4,
    ease: "power2.inOut",
  });
}
