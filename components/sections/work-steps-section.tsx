"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WORK_STEPS } from "@/lib/data/work";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function WorkStepsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const heading = section.querySelector("[data-work-steps-heading]");
    const steps = gsap.utils.toArray<HTMLElement>(
      section.querySelectorAll("[data-work-step]")
    );

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([heading, ...steps].filter(Boolean), {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      gsap.set([heading, ...steps].filter(Boolean), { autoAlpha: 0, y: 32 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (hasRevealedRef.current) return;
          hasRevealedRef.current = true;
          gsap.to(heading, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
          });
          gsap.to(steps, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            delay: 0.15,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="work-steps-section" aria-labelledby="work-steps-heading">
      <Container>
        <h4
          id="work-steps-heading"
          data-work-steps-heading
          className="work-steps-section__title m-0 text-center"
        >
          {WORK_STEPS.title}
        </h4>
        <ol className="work-steps-grid m-0 list-none p-0">
          {WORK_STEPS.steps.map((step) => (
            <li key={step.id} data-work-step className="work-step">
              <span className="work-step__number" aria-hidden>
                {step.number}
              </span>
              <p className="work-step__text m-0">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
