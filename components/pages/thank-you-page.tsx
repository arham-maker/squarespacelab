"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThankYouContentSection } from "@/components/sections/thank-you-content-section";
import { ThankYouHeroSection } from "@/components/sections/thank-you-hero-section";

export function ThankYouPage() {
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
