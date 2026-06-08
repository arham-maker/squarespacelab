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

const FIT_SCALE_TOLERANCE = 0.03;
const fitScales = new WeakMap<PanzoomInstance, number>();

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

function rememberFitScale(panzoom: PanzoomInstance) {
  fitScales.set(panzoom, panzoom.getTransform(true).scale);
}

function isPortfolioFitView(panzoom: PanzoomInstance): boolean {
  const fitScale = fitScales.get(panzoom);
  const currentScale = panzoom.getTransform(true).scale;

  if (fitScale === undefined) {
    return currentScale <= 1 + FIT_SCALE_TOLERANCE;
  }

  return currentScale <= fitScale * (1 + FIT_SCALE_TOLERANCE);
}

function getPortfolioZoomInScale(panzoom: PanzoomInstance): number {
  const container = panzoom.getContainer()?.getBoundingClientRect();
  const wrapper = panzoom.getWrapper()?.getBoundingClientRect();

  if (!container?.width || !wrapper?.width) {
    const fitScale = fitScales.get(panzoom) ?? 1;
    return fitScale * 2;
  }

  const targetWidth = container.width * 0.92;
  const currentScale = panzoom.getTransform(true).scale;
  const nextScale = currentScale * (targetWidth / wrapper.width);
  const maxScale = panzoom.getScale("max");

  return Math.min(nextScale, maxScale);
}

/** Toggle: click zooms in to readable width, click again fits whole mock. */
function portfolioClickAction(
  panzoom: PanzoomInstance
): PanzoomAction | number {
  return isPortfolioFitView(panzoom)
    ? getPortfolioZoomInScale(panzoom)
    : PanzoomAction.Reset;
}

/** Fit the entire portfolio mock in view on open (reference lightbox behavior). */
function fitWholePortfolioImage(
  panzoom: PanzoomInstance,
  trigger?: HTMLElement
) {
  setImageDimensions(panzoom, trigger);
  panzoom.execute(PanzoomAction.Reset);

  requestAnimationFrame(() => {
    rememberFitScale(panzoom);
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

  const apply = () => fitWholePortfolioImage(panzoom, trigger);

  if (content instanceof HTMLImageElement && !content.complete) {
    content.addEventListener("load", apply, { once: true });
    return;
  }

  requestAnimationFrame(apply);
}

export function getWorkPortfolioFancyboxOptions(
  options: { showCaption?: boolean } = {}
): Partial<FancyboxOptions> {
  const showCaption = options.showCaption !== false;

  return {
    mainClass: showCaption ? "work-fancybox" : "work-fancybox work-fancybox--no-caption",
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
          clickAction: portfolioClickAction,
          maxScale: 8,
          panMode: "drag",
        },
      },
      ...(showCaption
        ? {}
        : {
            captionEl: () => null,
            formatCaption: () => "",
          }),
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

export function bindWorkPortfolioFancybox(
  root: HTMLElement = document.body,
  options: { showCaption?: boolean } = {}
) {
  Fancybox.bind(root, WORK_PORTFOLIO_FANCYBOX_SELECTOR, getWorkPortfolioFancyboxOptions(options));
}

export function unbindWorkPortfolioFancybox(root: HTMLElement = document.body) {
  Fancybox.unbind(root, WORK_PORTFOLIO_FANCYBOX_SELECTOR);
}
