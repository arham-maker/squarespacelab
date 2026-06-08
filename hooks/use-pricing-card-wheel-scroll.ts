import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getLenis } from "@/lib/lenis/init-lenis";

const SCROLL_DURATION = 0.55;
const SCROLL_EASE = "power2.out";

export function usePricingCardWheelScroll() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    const features = featuresRef.current;
    if (!body || !features) return;

    const scrollState = { y: features.scrollTop };
    let quickScroll: gsap.QuickToFunc | null = null;

    const syncScrollState = () => {
      scrollState.y = features.scrollTop;
      quickScroll?.(scrollState.y);
    };

    const clearPrevent = () => {
      body.removeAttribute("data-lenis-prevent");
      features.removeAttribute("data-lenis-prevent");
    };

    const setPrevent = () => {
      body.setAttribute("data-lenis-prevent", "");
      features.setAttribute("data-lenis-prevent", "");
    };

    const forwardToPage = (deltaY: number) => {
      const lenis = getLenis();
      if (!lenis) return;
      lenis.scrollTo(lenis.targetScroll + deltaY, { programmatic: false });
    };

    const clampScroll = (value: number) => {
      const maxScroll = features.scrollHeight - features.clientHeight;
      return Math.min(maxScroll, Math.max(0, value));
    };

    const animateTo = (nextY: number) => {
      scrollState.y = clampScroll(nextY);
      quickScroll?.(scrollState.y);
    };

    quickScroll = gsap.quickTo(scrollState, "y", {
      duration: SCROLL_DURATION,
      ease: SCROLL_EASE,
      onUpdate: () => {
        features.scrollTop = scrollState.y;
      },
    });

    const onWheel = (event: WheelEvent) => {
      if (features.scrollHeight <= features.clientHeight) {
        clearPrevent();
        return;
      }

      const { deltaY } = event;
      const maxScroll = features.scrollHeight - features.clientHeight;
      const currentScroll = scrollState.y;
      const scrollingDown = deltaY > 0;
      const scrollingUp = deltaY < 0;
      const atTop = currentScroll <= 0;
      const atBottom = currentScroll >= maxScroll - 1;

      if ((scrollingDown && atBottom) || (scrollingUp && atTop)) {
        clearPrevent();
        if (event.cancelable) event.preventDefault();
        forwardToPage(deltaY);
        return;
      }

      const nextScroll = clampScroll(currentScroll + deltaY);
      const applied = nextScroll - currentScroll;

      setPrevent();
      if (event.cancelable) event.preventDefault();
      animateTo(nextScroll);

      const remainder = deltaY - applied;
      const hitBoundary = nextScroll <= 0 || nextScroll >= maxScroll - 1;

      if (remainder !== 0 && hitBoundary) {
        clearPrevent();
        forwardToPage(remainder);
      }
    };

    const onLeave = () => {
      clearPrevent();
    };

    body.addEventListener("wheel", onWheel, { passive: false, capture: true });
    body.addEventListener("mouseleave", onLeave);
    features.addEventListener("scroll", syncScrollState, { passive: true });

    return () => {
      body.removeEventListener("wheel", onWheel, { capture: true });
      body.removeEventListener("mouseleave", onLeave);
      features.removeEventListener("scroll", syncScrollState);
      gsap.killTweensOf(scrollState);
      clearPrevent();
    };
  }, []);

  return { bodyRef, featuresRef };
}
