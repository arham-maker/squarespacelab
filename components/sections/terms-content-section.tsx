"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  TERMS_CLAIM_FOLLOW_UP,
  TERMS_CLAIM_INTRO,
  TERMS_CLAIM_ITEMS,
  TERMS_CLAIM_PHONE,
  TERMS_CLAIM_PHONE_HREF,
  TERMS_PAGE_TITLE,
  TERMS_SECTIONS,
} from "@/lib/data/terms";
import { revealOnScroll } from "@/lib/gsap/animations";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function TermsContentSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll("[data-terms-reveal]");
    blocks.forEach((el) => {
      revealOnScroll(el, el, { y: 32, duration: 0.75, start: "top 92%" });
    });
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="terms-content-section">
      <Container>
        <div className="terms-content">
          <h4 data-terms-reveal className="terms-content__page-title mb-4">
            {TERMS_PAGE_TITLE}
          </h4>

          {TERMS_SECTIONS.slice(0, 3).map((block) => (
            <TermsBlock key={block.id} block={block} />
          ))}

          <article data-terms-reveal className="terms-content__block" id="claim-refund">
            <h5 className="terms-content__section-title mb-4">CLAIM YOUR REFUND</h5>
            <p className="terms-content__text m-0">{TERMS_CLAIM_INTRO}</p>
            <ul className="terms-content__list m-0 list-disc ps-5">
              {TERMS_CLAIM_ITEMS.map((item) => (
                <li key={item.id} className="terms-content__list-item">
                  {item.type === "phone" && (
                    <>
                      {item.prefix}
                      <a href={TERMS_CLAIM_PHONE_HREF} className="terms-content__link">
                        {TERMS_CLAIM_PHONE}
                      </a>
                    </>
                  )}
                  {item.type === "link" && (
                    <>
                      {item.prefix}
                      <a href={item.href} className="terms-content__link">
                        {item.label}
                      </a>
                      {item.id === "email" ? "." : null}
                    </>
                  )}
                </li>
              ))}
            </ul>
            {TERMS_CLAIM_FOLLOW_UP.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="terms-content__text m-0">
                {paragraph}
              </p>
            ))}
          </article>

          {TERMS_SECTIONS.slice(3).map((block) => (
            <TermsBlock key={block.id} block={block} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TermsBlock({ block }: { block: (typeof TERMS_SECTIONS)[number] }) {
  return (
    <article
      data-terms-reveal
      className="terms-content__block"
      id={block.id}
    >
      <h5 className="terms-content__section-title mb-4">{block.title}</h5>

      {block.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="terms-content__text m-0">
          {paragraph}
        </p>
      ))}

      {block.list && (
        <ul className="terms-content__list m-0 list-disc ps-5">
          {block.list.map((item) => (
            <li key={item.slice(0, 48)} className="terms-content__list-item">
              {item}
            </li>
          ))}
        </ul>
      )}

      {block.note && (
        <p className="terms-content__text terms-content__note m-0">{block.note}</p>
      )}
    </article>
  );
}
