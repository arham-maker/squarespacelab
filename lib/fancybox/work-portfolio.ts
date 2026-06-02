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

function applyPortfolioWidthFit(
  panzoom: PanzoomInstance,
  trigger?: HTMLElement
) {
  const imageWidth = Number(trigger?.dataset.width);
  const imageHeight = Number(trigger?.dataset.height);
  const container = panzoom.getContainer()?.getBoundingClientRect();

  if (!imageWidth || !container?.width) return;

  const content = panzoom.getContent();
  if (content instanceof HTMLImageElement) {
    content.setAttribute("width", String(imageWidth));
    if (imageHeight) {
      content.setAttribute("height", String(imageHeight));
    }
  }

  requestAnimationFrame(() => {
    const maxDisplayWidth = Math.min(container.width * 0.92, imageWidth);
    const fullScale = panzoom.getScale("full");
    panzoom.execute(PanzoomAction.ZoomTo, {
      scale: fullScale * (maxDisplayWidth / imageWidth),
    });
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

  if (content instanceof HTMLImageElement && !content.complete) {
    content.addEventListener(
      "load",
      () => applyPortfolioWidthFit(panzoom, trigger),
      { once: true }
    );
    return;
  }

  applyPortfolioWidthFit(panzoom, trigger);
}

export function getWorkPortfolioFancyboxOptions(): Partial<FancyboxOptions> {
  return {
    mainClass: "work-fancybox",
    dragToClose: false,
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
          maxScale: 4,
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
    },
  };
}

export function bindWorkPortfolioFancybox(root: HTMLElement = document.body) {
  Fancybox.bind(root, WORK_PORTFOLIO_FANCYBOX_SELECTOR, getWorkPortfolioFancyboxOptions());
}

export function unbindWorkPortfolioFancybox(root: HTMLElement = document.body) {
  Fancybox.unbind(root, WORK_PORTFOLIO_FANCYBOX_SELECTOR);
}
