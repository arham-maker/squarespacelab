import {
  Fancybox,
  type CarouselSlide,
  type FancyboxOptions,
  type PanzoomInstance,
  PanzoomAction,
} from "@fancyapps/ui";
import { getLenis } from "@/lib/lenis/init-lenis";

export const WORK_PORTFOLIO_FANCYBOX_GROUP = "work-portfolio";
export const WORK_PORTFOLIO_FANCYBOX_SELECTOR = `[data-fancybox="${WORK_PORTFOLIO_FANCYBOX_GROUP}"]`;

function setImageDimensions(
  panzoom: PanzoomInstance,
  trigger?: HTMLElement
) {
  const imageWidth = Number(trigger?.dataset.width);
  const imageHeight = Number(trigger?.dataset.height);
  const content = panzoom.getContent();

  if (!(content instanceof HTMLImageElement) || !imageWidth) return;

  content.setAttribute("width", String(imageWidth));
  if (imageHeight) {
    content.setAttribute("height", String(imageHeight));
  }
}

/** Open tall portfolio mocks at ~92% viewport width instead of full-page fit (tiny strip). */
function applyPortfolioWidthFit(
  panzoom: PanzoomInstance,
  trigger?: HTMLElement
) {
  const container = panzoom.getContainer()?.getBoundingClientRect();
  if (!container?.width) return;

  setImageDimensions(panzoom, trigger);

  const run = () => {
    const wrapper = panzoom.getWrapper()?.getBoundingClientRect();
    if (!wrapper?.width) return;

    const targetWidth = container.width * 0.92;
    const scaleFactor = targetWidth / wrapper.width;
    const currentScale = panzoom.getTransform(true).scale;
    const nextScale = currentScale * scaleFactor;
    const maxScale = panzoom.getScale("max");

    panzoom.execute(PanzoomAction.ZoomTo, {
      scale: Math.min(nextScale, maxScale),
    });
  };

  // Measure after Panzoom lays out at default "fit whole image" scale.
  requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
}

function onPortfolioPanzoomReady(
  _fancybox: unknown,
  _carousel: unknown,
  slide: CarouselSlide
) {
  const panzoom = slide.panzoomRef;
  if (!panzoom) return;

  const trigger = slide.triggerEl as HTMLElement | undefined;
  const content = panzoom.getContent();

  const apply = () => applyPortfolioWidthFit(panzoom, trigger);

  if (content instanceof HTMLImageElement && !content.complete) {
    content.addEventListener("load", apply, { once: true });
    return;
  }

  apply();
}

export function getWorkPortfolioFancyboxOptions(): Partial<FancyboxOptions> {
  return {
    mainClass: "work-fancybox",
    dragToClose: false,
    zoomEffect: false,
    Carousel: {
      Toolbar: {
        display: {
          left: ["counter"],
          middle: [],
          right: ["toggleFull", "autoplay", "thumbs", "close"],
        },
      },
      Thumbs: {
        type: "classic",
        minCount: 2,
      },
      Zoomable: {
        Panzoom: {
          clickAction: PanzoomAction.IterateZoom,
          maxScale: 8,
          panMode: "drag",
        },
      },
    },
    on: {
      ready: () => {
        getLenis()?.stop();
      },
      destroy: () => {
        getLenis()?.start();
      },
      "Carousel.panzoom:ready": onPortfolioPanzoomReady,
      "Carousel.change": (_fancybox, carousel) => {
        const slide = carousel.getPage()?.slides[0];
        if (slide?.panzoomRef) {
          onPortfolioPanzoomReady(_fancybox, carousel, slide);
        }
      },
    },
  };
}

export function bindWorkPortfolioFancybox(root: HTMLElement = document.body) {
  Fancybox.bind(root, WORK_PORTFOLIO_FANCYBOX_SELECTOR, getWorkPortfolioFancyboxOptions());
}

export function unbindWorkPortfolioFancybox(root: HTMLElement = document.body) {
  Fancybox.unbind(root, WORK_PORTFOLIO_FANCYBOX_SELECTOR);
}
