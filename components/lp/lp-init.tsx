"use client";

import { useEffect } from "react";

export function LpInit() {
  useEffect(() => {
    let cleaned = false;

    async function init() {
      const [{ default: AOS }, { default: $ }] = await Promise.all([
        import("aos"),
        import("jquery"),
      ]);

      // Slick registers against the global jQuery instance (jQuery 3.x required).
      const win = window as Window & { jQuery?: typeof $; $?: typeof $ };
      win.jQuery = $;
      win.$ = $;

      await import("aos/dist/aos.css");
      await import("slick-carousel/slick/slick.css");
      await import("slick-carousel/slick/slick-theme.css");
      await import("slick-carousel/slick/slick.js");

      if (cleaned) return;

      AOS.init({ once: true, duration: 1000 });

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
        $(window).off("scroll", onScroll);
        $(window).off("scroll", onCounterScroll);
        $(".accordion-list > li").off("click", onAccordionClick);
        $(".menu-Bar").off("click", onMenuToggle);
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
