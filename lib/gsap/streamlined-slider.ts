import gsap from "gsap";

export type StreamlinedSliderTargets = {
  viewport: HTMLElement;
  track: HTMLElement;
  progress: HTMLElement;
};

const AUTO_SPEED = 40;

function measureLoopWidth(track: HTMLElement): number {
  const firstSet = track.querySelector<HTMLElement>("[data-streamlined-set]");
  if (!firstSet) return 0;
  return firstSet.scrollWidth || firstSet.getBoundingClientRect().width || 0;
}

function wrapPosition(x: number, loopWidth: number): number {
  if (loopWidth <= 0) return x;
  while (x <= -loopWidth) x += loopWidth;
  while (x > 0) x -= loopWidth;
  return x;
}

export function initStreamlinedSlider(
  { viewport, track, progress }: StreamlinedSliderTargets,
  reducedMotion: boolean
): () => void {
  if (reducedMotion) {
    gsap.set(track, { clearProps: "transform" });
    gsap.set(progress, { width: "100%" });
    return () => {};
  }

  let loopWidth = 0;
  let positionX = 0;
  let lastFrameTime = 0;
  let rafId = 0;
  let resizeTimer: number | undefined;

  const measure = (): boolean => {
    const next = measureLoopWidth(track);
    if (next <= 0) return false;
    loopWidth = next;
    positionX = wrapPosition(positionX, loopWidth);
    return true;
  };

  const setProgress = () => {
    if (loopWidth <= 0) return;
    const travelled = Math.abs(positionX % loopWidth);
    const ratio = loopWidth ? travelled / loopWidth : 0;
    progress.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
  };

  const frame = (time: number) => {
    rafId = requestAnimationFrame(frame);
    const delta =
      lastFrameTime > 0 ? Math.min((time - lastFrameTime) / 1000, 0.032) : 0;
    lastFrameTime = time;

    if (!loopWidth) {
      if (!measure()) return;
    }

    positionX -= AUTO_SPEED * delta;
    positionX = wrapPosition(positionX, loopWidth);
    track.style.transform = `translate3d(${positionX.toFixed(2)}px,0,0)`;
    setProgress();
  };

  const start = () => {
    cancelAnimationFrame(rafId);
    lastFrameTime = 0;
    rafId = requestAnimationFrame(frame);
  };

  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (measure()) {
        setProgress();
        start();
      }
    }, 180);
  };

  viewport.classList.add("streamlined-slider--active");
  measure();
  start();

  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(viewport);
  track.querySelectorAll("[data-streamlined-set]").forEach((set) => {
    resizeObserver.observe(set);
  });

  return () => {
    cancelAnimationFrame(rafId);
    clearTimeout(resizeTimer);
    resizeObserver.disconnect();
    viewport.classList.remove("streamlined-slider--active");
    gsap.set(track, { clearProps: "transform" });
    progress.style.width = "";
  };
}
