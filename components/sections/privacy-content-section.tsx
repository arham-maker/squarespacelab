"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  PRIVACY_PAGE_TITLE,
  PRIVACY_SECTIONS,
  type PrivacyContentSection,
} from "@/lib/data/privacy";
import { revealOnScroll } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function PrivacyContentSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll("[data-privacy-reveal]");
    blocks.forEach((el) => {
      revealOnScroll(el, el, { y: 32, duration: 0.75, start: "top 92%" });
    });
  }, [reducedMotion]);

  const [introSection, ...bodySections] = PRIVACY_SECTIONS;

  return (
    <section ref={sectionRef} className="terms-content-section">
      <Container>
        <div className="terms-content">
          <h4 data-privacy-reveal className="terms-content__page-title mb-4">
            {PRIVACY_PAGE_TITLE}
          </h4>

          {introSection && (
            <PrivacyBlock key={introSection.id} block={introSection} hideTitle />
          )}

          {bodySections.map((block) => (
            <PrivacyBlock key={block.id} block={block} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function PrivacyBlock({
  block,
  hideTitle = false,
}: {
  block: PrivacyContentSection;
  hideTitle?: boolean;
}) {
  return (
    <article
      data-privacy-reveal
      className="terms-content__block"
      id={block.id}
    >
      {!hideTitle && (
        <h5 className="terms-content__section-title mb-4">{block.title}</h5>
      )}

      {block.contactLink ? (
        <p className="terms-content__text m-0">
          If you have any confusion or concerns regarding our privacy policies,
          you can contact us via our{" "}
          <Link href="/contact" className="terms-content__link">
            contact us form
          </Link>
          .
        </p>
      ) : (
        block.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="terms-content__text m-0">
            {paragraph}
          </p>
        ))
      )}
    </article>
  );
}
