"use client";

import { useEffect } from "react";

type AosInstance = {
  init: (options?: Record<string, unknown>) => void;
  refresh: () => void;
  refreshHard: () => void;
};

function revealVisibleAosElements(root: ParentNode) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  root.querySelectorAll<HTMLElement>("[data-aos]:not(.aos-animate)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.08) {
      el.classList.add("aos-animate");
    }
  });
}

export function LpInit() {
  useEffect(() => {
    let cleaned = false;
    let aosScrollTimer: number | undefined;
    let aosFallbackObserver: IntersectionObserver | undefined;
    let aosResizeObserver: ResizeObserver | undefined;

    async function init() {
      const [{ default: AOS }, { default: $ }] = await Promise.all([
        import("aos"),
        import("jquery"),
      ]);

      const win = window as Window & { jQuery?: typeof $; $?: typeof $ };
      win.jQuery = $;
      win.$ = $;

      await import("aos/dist/aos.css");
      await import("slick-carousel/slick/slick.css");
      await import("slick-carousel/slick/slick-theme.css");
      await import("slick-carousel/slick/slick.js");

      if (cleaned) return;

      const aos = AOS as AosInstance;

      aos.init({
        once: true,
        duration: 1000,
        offset: 80,
        anchorPlacement: "top-bottom",
        debounceDelay: 50,
        throttleDelay: 99,
        disableMutationObserver: false,
      });

      const refreshAos = () => {
        if (cleaned) return;
        aos.refresh();
        revealVisibleAosElements(document);
      };

      const refreshAosHard = () => {
        if (cleaned) return;
        aos.refreshHard();
        revealVisibleAosElements(document);
      };

      requestAnimationFrame(refreshAosHard);

      const onWindowLoad = () => refreshAosHard();
      window.addEventListener("load", onWindowLoad);

      const onAosScroll = () => {
        if (cleaned) return;
        window.clearTimeout(aosScrollTimer);
        aosScrollTimer = window.setTimeout(refreshAos, 120);
      };

      $(window).on("scroll", onAosScroll);

      aosFallbackObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            if (!el.classList.contains("aos-animate")) {
              el.classList.add("aos-animate");
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.08,
        }
      );

      document.querySelectorAll(".lp-root [data-aos]").forEach((el) => {
        aosFallbackObserver?.observe(el);
      });

      if ("ResizeObserver" in window) {
        aosResizeObserver = new ResizeObserver(() => {
          refreshAos();
        });
        const lpRoot = document.querySelector(".lp-root");
        if (lpRoot) aosResizeObserver.observe(lpRoot);
      }

      const $portfolio = $(".portfolio-slider");
      if ($portfolio.length && !$portfolio.hasClass("slick-initialized")) {
        $portfolio.slick({
          dots: false,
          arrows: false,
          infinite: true,
          autoplay: true,
          speed: 300,
          slidesToShow: 4,
          responsive: [
            { breakpoint: 1500, settings: { slidesToShow: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            {
              breakpoint: 600,
              settings: { slidesToShow: 1, arrows: false, centerPadding: "60px" },
            },
          ],
        });
        refreshAosHard();
      }

      $(".accordion-list > li > .answer").hide();

      const onAccordionClick = function (this: HTMLElement, e: JQuery.ClickEvent) {
        e.preventDefault();
        const $li = $(this);
        if ($li.hasClass("active")) {
          $li.removeClass("active").find(".answer").slideUp();
        } else {
          $(".accordion-list > li.active .answer").slideUp();
          $(".accordion-list > li.active").removeClass("active");
          $li.addClass("active").find(".answer").slideDown();
        }
        refreshAos();
        return false;
      };

      $(".accordion-list > li").on("click", onAccordionClick);

      const onScroll = () => {
        const scroll = $(window).scrollTop() ?? 0;
        const header = $("header");
        if (scroll >= 1) header.addClass("sticky");
        else header.removeClass("sticky");
      };

      $(window).on("scroll", onScroll);
      onScroll();

      const onCounterScroll = () => {
        const $goto = $(".goto");
        if (!$goto.length) return;

        const top = $goto.first().offset()?.top ?? 0;
        const winTop = $(window).scrollTop() ?? 0;
        const winH = $(window).height() ?? 0;

        if (winTop >= top - winH && !$goto.first().hasClass("animated")) {
          $(".count").each(function () {
            const $el = $(this);
            const target = parseInt($el.text(), 10) || 0;
            $el.prop("Counter", 0).animate(
              { Counter: target },
              {
                duration: 4000,
                easing: "swing",
                step(now: number) {
                  $el.text(Math.ceil(now).toString());
                },
              }
            );
          });
          $goto.addClass("animated");
        }
      };

      $(window).on("scroll", onCounterScroll);

      const onMenuToggle = function (this: HTMLElement) {
        $(this).toggleClass("open");
        $(".menuWrap").toggleClass("open");
        $("body").toggleClass("ovr-hiddn");
      };

      $(".menu-Bar").on("click", onMenuToggle);

      return () => {
        window.removeEventListener("load", onWindowLoad);
        window.clearTimeout(aosScrollTimer);
        $(window).off("scroll", onAosScroll);
        $(window).off("scroll", onScroll);
        $(window).off("scroll", onCounterScroll);
        $(".accordion-list > li").off("click", onAccordionClick);
        $(".menu-Bar").off("click", onMenuToggle);
        aosFallbackObserver?.disconnect();
        aosResizeObserver?.disconnect();
        if ($portfolio.hasClass("slick-initialized")) {
          $portfolio.slick("unslick");
        }
      };
    }

    let teardown: (() => void) | undefined;

    init().then((dispose) => {
      teardown = dispose;
    });

    return () => {
      cleaned = true;
      teardown?.();
    };
  }, []);

  return null;
}
