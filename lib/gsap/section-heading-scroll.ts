import gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

export const SECTION_HEADING_FADED = "rgba(255, 255, 255, 0.21)";
export const SECTION_HEADING_SOLID = "rgb(255, 255, 255)";
export const SECTION_HEADING_FADED_DARK = "rgba(0, 0, 0, 0.3)";
export const SECTION_HEADING_SOLID_DARK = "#000000";

const CHAR_SELECTOR = "[data-scroll-heading-char]";

export type SectionHeadingScrollOptions = {
  trigger?: Element;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  /** Stagger between letters within the scrubbed timeline (0–1 scale) */
  staggerEach?: number;
  fadedColor?: string;
  solidColor?: string;
};

const DEFAULT_START = "top 88%";
const DEFAULT_END = "top 38%";
const DEFAULT_SCRUB = 0.9;
const DEFAULT_STAGGER = 0.035;

function splitTextIntoCharSpans(text: string, parent: HTMLElement): HTMLElement[] {
  const chars: HTMLElement[] = [];

  for (const char of text) {
    const span = document.createElement("span");
    span.setAttribute("data-scroll-heading-char", "");

    if (char === " ") {
      span.textContent = " ";
      span.className = "inline";
    } else {
      span.textContent = char;
      span.className = "inline-block";
    }

    parent.appendChild(span);
    chars.push(span);
  }

  return chars;
}

function splitHeadingIntoChars(heading: HTMLElement): HTMLElement[] {
  const existing = heading.querySelectorAll<HTMLElement>(CHAR_SELECTOR);
  if (existing.length > 0) {
    return Array.from(existing);
  }

  const lineEls = heading.querySelectorAll<HTMLElement>(
    "[data-scroll-heading-line]"
  );

  if (lineEls.length > 0) {
    const lineTexts = Array.from(lineEls).map(
      (line) => line.textContent?.trim() ?? ""
    );

    heading.setAttribute("aria-label", lineTexts.join(" "));
    heading.dataset.scrollHeadingLines = JSON.stringify(lineTexts);

    const chars: HTMLElement[] = [];

    lineEls.forEach((line) => {
      const text = line.textContent?.trim() ?? "";
      line.textContent = "";
      chars.push(...splitTextIntoCharSpans(text, line));
    });

    heading.dataset.scrollHeadingSplit = "true";
    return chars;
  }

  const text = (heading.textContent ?? "").trim();
  if (!text) return [];

  heading.setAttribute("aria-label", text);
  heading.textContent = "";

  const chars = splitTextIntoCharSpans(text, heading);

  heading.dataset.scrollHeadingSplit = "true";
  return chars;
}

export function restoreSectionHeading(heading: HTMLElement): void {
  const savedLines = heading.getAttribute("data-scroll-heading-lines");

  if (savedLines) {
    const lines = JSON.parse(savedLines) as string[];
    heading.textContent = "";

    lines.forEach((line) => {
      const lineEl = document.createElement("span");
      lineEl.className = "block";
      lineEl.setAttribute("data-scroll-heading-line", "");
      lineEl.textContent = line;
      heading.appendChild(lineEl);
    });

    heading.removeAttribute("data-scroll-heading-lines");
  } else {
    const label = heading.getAttribute("aria-label");
    if (!label) return;
    heading.textContent = label;
  }

  heading.removeAttribute("aria-label");
  delete heading.dataset.scrollHeadingSplit;
}

export function initSectionHeadingScroll(
  heading: HTMLElement,
  reducedMotion: boolean,
  options: SectionHeadingScrollOptions = {}
): (() => void) | void {
  const {
    trigger = heading.closest("section") ?? heading,
    start = DEFAULT_START,
    end = DEFAULT_END,
    scrub = DEFAULT_SCRUB,
    staggerEach = DEFAULT_STAGGER,
    fadedColor = SECTION_HEADING_FADED,
    solidColor = SECTION_HEADING_SOLID,
  } = options;

  const cleanup = () => restoreSectionHeading(heading);

  if (reducedMotion) {
    gsap.set(heading, { color: solidColor, clearProps: "transform" });
    return cleanup;
  }

  const chars = splitHeadingIntoChars(heading);
  if (!chars.length) return cleanup;

  gsap.set(chars, { color: fadedColor });

  const tween = gsap.to(chars, {
    color: solidColor,
    ease: "none",
    stagger: { each: staggerEach, from: "start" },
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    cleanup();
  };
}

export function initSectionHeadingScrollElements(
  scope: ParentNode,
  reducedMotion: boolean
): void {
  const headings = scope.querySelectorAll<HTMLElement>("[data-scroll-heading]");

  headings.forEach((heading) => {
    const trigger =
      heading.closest<HTMLElement>("[data-scroll-heading-trigger]") ??
      heading.closest("section") ??
      heading;

    const start = heading.getAttribute("data-scroll-heading-start") ?? undefined;
    const end = heading.getAttribute("data-scroll-heading-end") ?? undefined;
    const scrubAttr = heading.getAttribute("data-scroll-heading-scrub");
    const staggerAttr = heading.getAttribute("data-scroll-heading-stagger");

    initSectionHeadingScroll(heading, reducedMotion, {
      trigger,
      start,
      end,
      scrub: scrubAttr ? Number.parseFloat(scrubAttr) : undefined,
      staggerEach: staggerAttr ? Number.parseFloat(staggerAttr) : undefined,
    });
  });
}
