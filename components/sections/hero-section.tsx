"use client";

import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { SITE } from "@/lib/data/site";
import { openLiveChat } from "@/lib/livechat";

export function HeroSection() {
  return (
    <section
      id="hero"
      data-hero-section
      className="home-hero relative flex min-h-0 flex-1 flex-col justify-center"
    >
      <Container className="home-hero__container py-6 sm:py-8 lg:py-10">
        <div
          data-hero-fg
          className="home-hero__text flex flex-col items-start will-change-transform"
        >
          <h1 className="home-hero__title text-display-hero text-black">
            <span className="block">
              <span>Start </span>
              <span className="home-hero__title-light">Selling</span>
            </span>
            <span className="block">Today!</span>
          </h1>
          <p className="home-hero__desc text-body mt-5 text-black sm:mt-6">
            Our experts provide customizable e-commerce solutions, ensuring a
            smooth shopping experience for your customers.
          </p>
          <div className="home-hero__actions">
            <CtaButton opensLeadForm className="home-hero__cta-btn">
              Get started
            </CtaButton>
            <button
              type="button"
              className="btn btn-outline home-hero__live-chat"
              onClick={() => openLiveChat()}
            >
              Live Chat
            </button>
            <a
              href={SITE.phoneHref}
              className="btn btn-outline home-hero__call-now"
            >
              Call Now
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
