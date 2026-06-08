"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRegStar } from "react-icons/fa";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { GRAPHIC_DESIGN_CATEGORIES } from "@/lib/data/graphic-design";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function GraphicDesignServicesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const boxes = section.querySelectorAll("[data-gd-service-box]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(boxes, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(boxes, { autoAlpha: 0, y: 48 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          if (hasRevealedRef.current) return;
          hasRevealedRef.current = true;
          gsap.to(boxes, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.14,
            ease: "power2.out",
          });
        },
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="graphic-design-services-section"
      aria-label="Graphic design service categories"
    >
      <Container className="graphic-design-services-section__container">
        <div className="graphic-design-services-section__grid">
          {GRAPHIC_DESIGN_CATEGORIES.map((category) => {
            const variantClass =
              category.variant === "pattern"
                ? "graphic-design-service-box--pattern"
                : "graphic-design-service-box--light";

            return (
              <article
                key={category.id}
                data-gd-service-box
                className={`graphic-design-service-box ${variantClass}`}
              >
                <h4 className="text-gd-service-title">
                  {category.titleLines ? (
                    category.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))
                  ) : (
                    category.title
                  )}
                </h4>
                <ul
                  className={`graphic-design-service-box__list m-0 list-none p-0 ${
                    category.twoColumns ? "graphic-design-service-box__list--cols" : ""
                  }`}
                >
                  {category.items.map((item) => (
                    <li key={item} className="text-gd-service-item">
                      <FaRegStar className="graphic-design-service-box__icon" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
