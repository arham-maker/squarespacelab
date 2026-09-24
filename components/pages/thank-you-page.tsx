"use client";

import { useEffect } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThankYouContentSection } from "@/components/sections/thank-you-content-section";
import { ThankYouHeroSection } from "@/components/sections/thank-you-hero-section";

type ThankYouPageProps = {
  fromLp2?: boolean;
};

function stripLingeringLp2Assets() {
  document
    .querySelectorAll(
      'link[data-lp2w], script[data-lp2w], link[href*="/lp2w/assets/css/"], link[href*="unpkg.com/aos"]'
    )
    .forEach((el) => el.remove());
}

export function ThankYouPage({ fromLp2 = false }: ThankYouPageProps) {
  useEffect(() => {
    // Soft nav from /lp2 can leave injected LP2 CSS/JS in <head>
    stripLingeringLp2Assets();
  }, []);

  if (fromLp2) {
    return (
      <div className="thank-you-page thank-you-page--lp2 flex min-h-full flex-1 flex-col">
        <div className="thank-you-hero-block thank-you-hero-block--lp2">
          <SiteHeader inBanner hideNav hideCta logoHref="/lp2" />
          <ThankYouHeroSection variant="lp2" />
        </div>
      </div>
    );
  }

  return (
    <div className="thank-you-page flex min-h-full flex-1 flex-col">
      <div className="thank-you-hero-block">
        <SiteHeader inBanner />
        <ThankYouHeroSection />
      </div>
      <main className="relative z-10 flex flex-1 flex-col">
        <ThankYouContentSection />
      </main>
      <div className="relative z-20">
        <SiteFooter />
      </div>
    </div>
  );
}
