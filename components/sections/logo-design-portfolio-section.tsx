"use client";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { LOGO_DESIGN_PORTFOLIO_ITEMS } from "@/lib/data/logo-design";
import { Fancybox } from "@fancyapps/ui";
import {
  bindWorkPortfolioFancybox,
  unbindWorkPortfolioFancybox,
  WORK_PORTFOLIO_FANCYBOX_GROUP,
} from "@/lib/fancybox/work-portfolio";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function LogoDesignPortfolioSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-ld-portfolio-item]")
    );

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(items, { autoAlpha: 0, y: 28 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => {
          if (hasRevealedRef.current || !items.length) return;
          hasRevealedRef.current = true;
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    bindWorkPortfolioFancybox(section, { showCaption: false });

    return () => {
      unbindWorkPortfolioFancybox(section);
      Fancybox.close(true);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="logo-design-portfolio-section"
      aria-label="Logo design portfolio"
    >
      <Container>
        <ul className="logo-design-portfolio-grid m-0 list-none p-0">
          {LOGO_DESIGN_PORTFOLIO_ITEMS.map((item) => (
            <li key={item.id} data-ld-portfolio-item>
              <a
                href={item.image}
                className="logo-design-portfolio-grid__link"
                data-fancybox={WORK_PORTFOLIO_FANCYBOX_GROUP}
                data-type="image"
                data-src={item.image}
                data-thumb={item.image}
                aria-label={`View logo design portfolio item ${item.id}`}
              >
                <Image
                  src={item.image}
                  alt=""
                  width={420}
                  height={420}
                  className="logo-design-portfolio-grid__img"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
