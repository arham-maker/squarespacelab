const HOVER_SELECTOR =
  "a, button, img, .cursor-pointer, [data-cursor-card], input, textarea, select, label[for]";

export function initMouseCursor(): () => void {
  const inner = document.querySelector<HTMLElement>(".cursor-inner");
  const outer = document.querySelector<HTMLElement>(".cursor-outer");

  if (!inner || !outer) return () => {};

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!finePointer.matches) {
    return () => {};
  }

  document.body.classList.add("has-mouse-cursor");
  inner.style.visibility = "visible";
  outer.style.visibility = "visible";

  const onMouseMove = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    outer.style.transform = `translate(${x}px, ${y}px)`;
    inner.style.transform = `translate(${x}px, ${y}px)`;

    const target = document.elementFromPoint(x, y);
    const hoverTarget = target?.closest(HOVER_SELECTOR);
    const cardTarget = target?.closest("[data-cursor-card]");

    inner.classList.toggle("cursor-hover", Boolean(hoverTarget));
    outer.classList.toggle("cursor-hover", Boolean(hoverTarget));
    inner.classList.toggle("active", Boolean(cardTarget));
  };

  const onMouseLeave = () => {
    inner.classList.remove("cursor-hover", "active");
    outer.classList.remove("cursor-hover");
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onMouseLeave);

  const onPointerChange = () => {
    if (!finePointer.matches) {
      inner.style.visibility = "hidden";
      outer.style.visibility = "hidden";
      document.body.classList.remove("has-mouse-cursor");
    }
  };

  finePointer.addEventListener("change", onPointerChange);

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    finePointer.removeEventListener("change", onPointerChange);
    document.body.classList.remove("has-mouse-cursor");
    inner.classList.remove("cursor-hover", "active");
    outer.classList.remove("cursor-hover");
    inner.style.visibility = "hidden";
    outer.style.visibility = "hidden";
    inner.style.removeProperty("transform");
    outer.style.removeProperty("transform");
  };
}
