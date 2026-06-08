import gsap from "gsap";

export function initTemplatesShowcasePages(
  book: HTMLElement,
  activeId: string,
  reducedMotion: boolean
): () => void {
  const pages = gsap.utils.toArray<HTMLElement>(
    book.querySelectorAll("[data-template-page]")
  );
  const active = book.querySelector<HTMLElement>(
    `[data-template-page="${activeId}"]`
  );

  if (!pages.length || !active) return () => {};

  pages.forEach((page) => {
    page.classList.toggle("is-active", page === active);
  });

  if (reducedMotion) {
    pages.forEach((page) => {
      const isActive = page === active;
      page.style.visibility = isActive ? "visible" : "hidden";
      page.style.opacity = isActive ? "1" : "0";
      page.style.transform = "none";
    });
    return () => {};
  }

  gsap.set(pages, { autoAlpha: 0, xPercent: -100 });
  gsap.set(active, { autoAlpha: 1, xPercent: 0 });

  return () => {
    gsap.killTweensOf(pages);
  };
}

export function animateTemplatesShowcasePage(
  book: HTMLElement,
  activeId: string,
  reducedMotion: boolean
) {
  const pages = gsap.utils.toArray<HTMLElement>(
    book.querySelectorAll("[data-template-page]")
  );
  const active = book.querySelector<HTMLElement>(
    `[data-template-page="${activeId}"]`
  );

  if (!pages.length || !active) return;

  pages.forEach((page) => {
    page.classList.toggle("is-active", page === active);
  });

  if (reducedMotion) {
    pages.forEach((page) => {
      const isActive = page === active;
      page.style.visibility = isActive ? "visible" : "hidden";
      page.style.opacity = isActive ? "1" : "0";
      page.style.transform = "none";
    });
    return;
  }

  gsap.to(pages, {
    autoAlpha: 0,
    xPercent: -100,
    duration: 0.5,
    ease: "power2.out",
    overwrite: true,
  });

  gsap.to(active, {
    autoAlpha: 1,
    xPercent: 0,
    duration: 0.5,
    ease: "power2.out",
    overwrite: true,
  });
}
