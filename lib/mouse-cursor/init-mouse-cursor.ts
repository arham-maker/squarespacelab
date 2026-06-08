const HOVER_SELECTOR =
  "a, button, img, .cursor-pointer, [data-cursor-card], input, textarea, select, label[for]";

const HEADER_HOVER_SELECTOR =
  "header .nav-link, header .services-nav__trigger";

/** Links that expand the cursor to the large green ring. */
const BIG_HOVER_SELECTOR =
  "[aria-label='Mobile navigation'] a, [aria-label='Mobile navigation'] button[data-menu-item], .templates-showcase__tab";

export function initMouseCursor(): () => void {
  const inner = document.querySelector<HTMLElement>(".cursor-inner");

  if (!inner) return () => {};

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!finePointer.matches) {
    return () => {};
  }

  document.body.classList.add("has-mouse-cursor");
  inner.style.visibility = "visible";

  const onMouseMove = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    inner.style.transform = `translate(${x}px, ${y}px)`;

    const target = document.elementFromPoint(x, y);
    const skipCursor = target?.closest(
      ".projects-marquee__viewport, .work-fancybox"
    );
    const inHeader = target?.closest("header");
    const headerHoverTarget =
      !skipCursor && target?.closest(HEADER_HOVER_SELECTOR);
    const hoverTarget =
      !skipCursor && !inHeader && target?.closest(HOVER_SELECTOR);
    const bigHoverTarget =
      !skipCursor && target?.closest(BIG_HOVER_SELECTOR);

    inner.classList.toggle("cursor-header-hover", Boolean(headerHoverTarget));
    inner.classList.toggle("cursor-hover", Boolean(hoverTarget));
    inner.classList.toggle("active", Boolean(bigHoverTarget));
  };

  const onMouseLeave = () => {
    inner.classList.remove("cursor-hover", "cursor-header-hover", "active");
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onMouseLeave);

  const onPointerChange = () => {
    if (!finePointer.matches) {
      inner.style.visibility = "hidden";
      document.body.classList.remove("has-mouse-cursor");
    }
  };

  finePointer.addEventListener("change", onPointerChange);

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    finePointer.removeEventListener("change", onPointerChange);
    document.body.classList.remove("has-mouse-cursor");
    inner.classList.remove("cursor-hover", "cursor-header-hover", "active");
    inner.style.visibility = "hidden";
    inner.style.removeProperty("transform");
  };
}
