import {
  Fancybox,
  type FancyboxOptions,
  type PanzoomInstance,
  PanzoomAction,
} from "@fancyapps/ui";

export const WORK_PORTFOLIO_FANCYBOX_SELECTOR =
  '[data-fancybox="work-portfolio"]';

function getWidthFitScale(panzoom: PanzoomInstance): number | undefined {
  const { width: imageWidth } = panzoom.getFullDim();
  const container = panzoom.getContainer()?.getBoundingClientRect();

  if (!imageWidth || !container?.width) {
    return undefined;
  }

  const maxDisplayWidth = Math.min(container.width * 0.92, imageWidth);
  const fullScale = panzoom.getScale("full");

  return fullScale * (maxDisplayWidth / imageWidth);
}

export function getWorkPortfolioFancyboxOptions(): Partial<FancyboxOptions> {
  return {
    mainClass: "work-fancybox",
    Carousel: {
      Toolbar: {
        display: {
          left: ["counter"],
          middle: [],
          right: ["toggleFull", "autoplay", "thumbs", "close"],
        },
      },
      Zoomable: {
        Panzoom: {
          clickAction: PanzoomAction.IterateZoom,
          maxScale: 3,
          panMode: "drag",
        },
      },
    },
    on: {
      "Carousel.panzoom:ready": (_fancybox, _carousel, slide) => {
        const panzoom = slide.panzoomRef;
        if (!panzoom) return;

        const scale = getWidthFitScale(panzoom);
        if (!scale) return;

        panzoom.execute(PanzoomAction.ZoomTo, { scale });
      },
    },
  };
}

export function bindWorkPortfolioFancybox(): void {
  Fancybox.bind(
    WORK_PORTFOLIO_FANCYBOX_SELECTOR,
    getWorkPortfolioFancyboxOptions()
  );
}

export function unbindWorkPortfolioFancybox(): void {
  Fancybox.unbind(WORK_PORTFOLIO_FANCYBOX_SELECTOR);
}
