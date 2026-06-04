"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SOCIAL_MEDIA_SERVICES } from "@/lib/data/social-media";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function SocialMediaServicesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasRevealedRef = useRef(false);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll("[data-sm-services-reveal]");

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(targets, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(targets, { autoAlpha: 0, y: 32 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => {
          if (hasRevealedRef.current) return;
          hasRevealedRef.current = true;
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="social-media-services-section"
      aria-label="Social media services"
    >
      <Container>
        <div className="social-media-services-section__grid">
          {SOCIAL_MEDIA_SERVICES.map((service) => (
            <article
              key={service.id}
              data-sm-services-reveal
              className="social-media-service-card"
            >
              <h3 className="text-sm-service-title m-0">{service.title}</h3>
              <p className="text-sm-service-desc m-0">{service.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
