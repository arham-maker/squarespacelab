import { ScrollTrigger } from "./register";

export type ProjectsMarqueeTargets = {
  section: HTMLElement;
  viewport: HTMLElement;
  track: HTMLElement;
};

/** Constant autoplay drift (px/s). */
const AUTO_SPEED = 9;

/** Scroll velocity → track motion scale (keep low for gentle response). */
const SCROLL_VELOCITY_FACTOR = 1.0028;

/** How quickly scroll influence eases in/out each frame (lower = smoother). */
const SCROLL_LERP = 1.045;

export function waitForTrackImages(track: HTMLElement): Promise<void> {
  const images = Array.from(track.querySelectorAll("img"));
  if (!images.length) return Promise.resolve();

  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    )
  ).then(() => undefined);
}

function measureLoopWidth(track: HTMLElement): number {
  const firstSet = track.querySelector<HTMLElement>("[data-marquee-set]");
  if (!firstSet) return 0;

  const width = firstSet.scrollWidth || firstSet.getBoundingClientRect().width;
  return width > 0 ? width : 0;
}

function wrapPosition(x: number, loopWidth: number): number {
  if (loopWidth <= 0) return x;
  while (x <= -loopWidth) x += loopWidth;
  while (x > 0) x -= loopWidth;
  return x;
}

export function initProjectsMarqueeScroll(
  { section, viewport, track }: ProjectsMarqueeTargets,
  reducedMotion: boolean
): () => void {
  let scrollTrigger: ScrollTrigger | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let retryTimer: number | undefined;
  let resizeTimer: number | undefined;
  let rafId = 0;
  let lastFrameTime = 0;

  let loopWidth = 0;
  let positionX = 0;
  let rawScrollVelocity = 0;
  let smoothScrollRate = 0;

  const deactivate = () => {
    cancelAnimationFrame(rafId);
    track.classList.remove("projects-marquee__track--active");
    track.style.removeProperty("transform");
    viewport.classList.remove("projects-marquee__viewport--scroll");
  };

  const measure = (): boolean => {
    const next = measureLoopWidth(track);
    if (next > 0) {
      loopWidth = next;
      positionX = wrapPosition(positionX, loopWidth);
      return true;
    }
    return false;
  };

  const frame = (time: number) => {
    rafId = requestAnimationFrame(frame);

    if (loopWidth <= 0) {
      measure();
      lastFrameTime = time;
      return;
    }

    const delta =
      lastFrameTime > 0 ? Math.min((time - lastFrameTime) / 1000, 0.032) : 0;
    lastFrameTime = time;

    const targetScrollRate = rawScrollVelocity * SCROLL_VELOCITY_FACTOR;
    smoothScrollRate += (targetScrollRate - smoothScrollRate) * SCROLL_LERP;

    positionX -= AUTO_SPEED * delta;
    positionX += smoothScrollRate * delta;
    positionX = wrapPosition(positionX, loopWidth);

    track.style.transform = `translate3d(${positionX.toFixed(2)}px, 0, 0)`;
  };

  const startLoop = () => {
    cancelAnimationFrame(rafId);
    lastFrameTime = 0;
    rafId = requestAnimationFrame(frame);
  };

  const activate = (): boolean => {
    if (!measure()) return false;

    track.classList.add("projects-marquee__track--active");
    viewport.classList.remove("projects-marquee__viewport--scroll");
    startLoop();
    return true;
  };

  const tryActivate = (attempt = 0) => {
    if (activate()) {
      ScrollTrigger.refresh();
      return;
    }

    if (attempt < 40) {
      retryTimer = window.setTimeout(() => tryActivate(attempt + 1), 100);
    }
  };

  if (reducedMotion) {
    deactivate();
    viewport.classList.add("projects-marquee__viewport--scroll");
    return () => {
      deactivate();
      clearTimeout(retryTimer);
      clearTimeout(resizeTimer);
      scrollTrigger?.kill();
    };
  }

  deactivate();
  tryActivate();

  scrollTrigger = ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      rawScrollVelocity = self.getVelocity();
    },
  });

  resizeObserver = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (measure() && track.classList.contains("projects-marquee__track--active")) {
        startLoop();
      } else {
        tryActivate();
      }
    }, 250);
  });

  resizeObserver.observe(track);
  track.querySelectorAll("[data-marquee-set]").forEach((set) => {
    resizeObserver?.observe(set);
  });

  const onLoad = () => tryActivate();
  window.addEventListener("load", onLoad);

  return () => {
    scrollTrigger?.kill();
    resizeObserver?.disconnect();
    window.removeEventListener("load", onLoad);
    clearTimeout(retryTimer);
    clearTimeout(resizeTimer);
    deactivate();
  };
}
