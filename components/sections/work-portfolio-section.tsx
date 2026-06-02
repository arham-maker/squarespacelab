"use client";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Fancybox } from "@fancyapps/ui";
import { WORK_PORTFOLIO_ITEMS } from "@/lib/data/work";
import {
  WORK_PORTFOLIO_FANCYBOX_GROUP,
  bindWorkPortfolioFancybox,
  unbindWorkPortfolioFancybox,
} from "@/lib/fancybox/work-portfolio";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function WorkPortfolioSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-work-portfolio-item]")
    );

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(items, { autoAlpha: 0, y: 36 });

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
            duration: 0.7,
            stagger: 0.1,
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

    bindWorkPortfolioFancybox(section);

    return () => {
      unbindWorkPortfolioFancybox(section);
      Fancybox.close(true);
    };
  }, []);

  return (
    <section ref={sectionRef} className="work-portfolio-section" id="portfolio">
      <Container>
        <ul className="work-portfolio-grid m-0 list-none p-0 m-auto">
          {WORK_PORTFOLIO_ITEMS.map((item) => (
            <li key={item.id} data-work-portfolio-item>
              <article className="work-portfolio-card">
                <a
                  href={item.image}
                  className="work-portfolio-card__media"
                  data-fancybox={WORK_PORTFOLIO_FANCYBOX_GROUP}
                  data-type="image"
                  data-src={item.image}
                  data-width={item.width}
                  data-height={item.height}
                  data-caption={item.title}
                  data-thumb={item.image}
                  aria-label={`View ${item.title} project preview`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={420}
                    height={565}
                    className="work-portfolio-card__img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </a>
                <h3 className="work-portfolio-card__title m-0">{item.title}</h3>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
