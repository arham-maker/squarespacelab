"use client";

import { useEffect } from "react";

function loadStylesheet(href: string) {
  if (document.querySelector(`link[data-lp2w="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.lp2w = href;
  document.head.appendChild(link);
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-lp2w="${src}"]`
    );
    if (existing) {
      if (existing.dataset.loaded === "1") resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.lp2w = src;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

declare global {
  interface Window {
    setButtonURL?: () => void;
    AOS?: { init: (opts: Record<string, unknown>) => void };
    openLiveChat?: () => void;
    __squarespacelabOpenLiveChat?: () => void;
    zE?: (...args: unknown[]) => void;
  }
}

/** Loads Wix-shell CSS/JS outside the React render tree (avoids script-tag warnings). */
export function Lp2ClientAssets() {
  useEffect(() => {
    loadStylesheet("/lp2w/assets/css/layout.css");
    loadStylesheet("/lp2w/assets/css/style.css");
    loadStylesheet("https://unpkg.com/aos@2.3.1/dist/aos.css");

    let cancelled = false;

    (async () => {
      try {
        await loadScript("/lp2w/assets/js/jquery.js");
        if (cancelled) return;
        await loadScript("/lp2w/assets/js/custom.js");
        if (cancelled) return;
        await loadScript("https://unpkg.com/aos@2.3.1/dist/aos.js");
        if (cancelled) return;

        window.setButtonURL = () => {
          if (typeof window.openLiveChat === "function") {
            window.openLiveChat();
            return;
          }
          if (typeof window.__squarespacelabOpenLiveChat === "function") {
            window.__squarespacelabOpenLiveChat();
            return;
          }
          if (typeof window.zE === "function") {
            try {
              window.zE("webWidget", "show");
              window.zE("webWidget", "open");
            } catch {
              try {
                window.zE("messenger", "open");
              } catch {
                /* ignore */
              }
            }
          }
        };

        window.AOS?.init({
          duration: 500,
          easing: "ease-in-out",
          once: true,
          anchorPlacement: "bottom-bottom",
          disable: "mobile",
        });

        const init = (
          window as Window & { initLp2wSliders?: () => void }
        ).initLp2wSliders;
        init?.();
      } catch {
        /* assets optional on soft-nav failure */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
