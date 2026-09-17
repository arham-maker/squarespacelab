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

type AosApi = {
  init: (opts: Record<string, unknown>) => void;
  refresh?: () => void;
  refreshHard?: () => void;
};

declare global {
  interface Window {
    AOS?: AosApi;
  }
}

function revealVisibleAosElements() {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  document
    .querySelectorAll<HTMLElement>(
      ".lp-landing-root [data-aos]:not(.aos-animate)"
    )
    .forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.95 && rect.bottom > 0) {
        el.classList.add("aos-animate");
      }
    });
}

/** Loads Wix-shell CSS/JS outside the React render tree (avoids script-tag warnings). */
export function Lp2ClientAssets() {
  useEffect(() => {
    loadStylesheet("/lp2w/assets/css/layout.css");
    loadStylesheet("/lp2w/assets/css/style.css");
    loadStylesheet("https://unpkg.com/aos@2.3.1/dist/aos.css");

    let cancelled = false;
    let aosScrollTimer: number | undefined;
    let aosFallbackObserver: IntersectionObserver | undefined;
    let aosSafetyTimer: number | undefined;

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

        // Hero should never wait on scroll animation.
        document
          .querySelectorAll<HTMLElement>(
            ".lp-landing-root .mainBanner [data-aos], .lp-landing-root header [data-aos]"
          )
          .forEach((el) => el.classList.add("aos-animate"));

        const aos = window.AOS;
        aos?.init({
          duration: 700,
          easing: "ease-out-cubic",
          once: true,
          offset: 60,
          anchorPlacement: "top-bottom",
          debounceDelay: 50,
          throttleDelay: 99,
          disable: false,
        });

        const refreshAos = () => {
          if (cancelled) return;
          aos?.refresh?.();
          revealVisibleAosElements();
        };

        const refreshAosHard = () => {
          if (cancelled) return;
          aos?.refreshHard?.();
          revealVisibleAosElements();
        };

        requestAnimationFrame(refreshAosHard);
        window.addEventListener("load", refreshAosHard);

        const onScroll = () => {
          window.clearTimeout(aosScrollTimer);
          aosScrollTimer = window.setTimeout(refreshAos, 100);
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        aosFallbackObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              (entry.target as HTMLElement).classList.add("aos-animate");
            });
          },
          {
            root: null,
            rootMargin: "0px 0px -6% 0px",
            threshold: 0.05,
          }
        );

        document
          .querySelectorAll(".lp-landing-root [data-aos]")
          .forEach((el) => aosFallbackObserver?.observe(el));

        // Final safety: if anything is still hidden after layout settles, show it.
        aosSafetyTimer = window.setTimeout(() => {
          document
            .querySelectorAll<HTMLElement>(
              ".lp-landing-root [data-aos]:not(.aos-animate)"
            )
            .forEach((el) => {
              const rect = el.getBoundingClientRect();
              if (rect.top < window.innerHeight * 1.2) {
                el.classList.add("aos-animate");
              }
            });
          refreshAos();
        }, 1800);

        const init = (
          window as Window & { initLp2wSliders?: () => void }
        ).initLp2wSliders;
        init?.();
        window.setTimeout(refreshAosHard, 400);
      } catch {
        // If AOS fails to load, force content visible.
        document
          .querySelectorAll<HTMLElement>(".lp-landing-root [data-aos]")
          .forEach((el) => el.classList.add("aos-animate"));
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(aosScrollTimer);
      window.clearTimeout(aosSafetyTimer);
      aosFallbackObserver?.disconnect();
    };
  }, []);

  return null;
}
