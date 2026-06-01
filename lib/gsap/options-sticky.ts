import { MEDIA_DESKTOP } from "@/lib/breakpoints";

/** Match right-column track height to the left image so sticky text has scroll range. */
function syncTrackHeight(
  mediaCol: HTMLElement,
  trackCol: HTMLElement
): number {
  if (!window.matchMedia(MEDIA_DESKTOP).matches) {
    trackCol.style.minHeight = "";
    return 0;
  }

  const mediaHeight = mediaCol.offsetHeight;
  if (mediaHeight > 0) {
    trackCol.style.minHeight = `${mediaHeight}px`;
  }
  return mediaHeight;
}

export function initOptionsSectionLayout(
  section: HTMLElement,
  mediaCol: HTMLElement,
  trackCol: HTMLElement
): () => void {
  let retryTimer: number | undefined;

  const setup = (attempt = 0) => {
    const isDesktop = window.matchMedia(MEDIA_DESKTOP).matches;
    if (!isDesktop) {
      trackCol.style.minHeight = "";
      return;
    }

    const mediaHeight = syncTrackHeight(mediaCol, trackCol);
    if (mediaHeight <= 0 && attempt < 40) {
      retryTimer = window.setTimeout(() => setup(attempt + 1), 100);
    }
  };

  setup();

  const onSync = () => setup();

  const resizeObserver = new ResizeObserver(() => {
    window.requestAnimationFrame(onSync);
  });

  resizeObserver.observe(section);
  resizeObserver.observe(mediaCol);

  const mediaQuery = window.matchMedia(MEDIA_DESKTOP);
  mediaQuery.addEventListener("change", onSync);
  window.addEventListener("load", onSync);

  return () => {
    clearTimeout(retryTimer);
    resizeObserver.disconnect();
    mediaQuery.removeEventListener("change", onSync);
    window.removeEventListener("load", onSync);
    trackCol.style.minHeight = "";
  };
}
