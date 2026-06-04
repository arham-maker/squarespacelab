"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PricingTrustedPartnersSection } from "@/components/sections/pricing-trusted-partners-section";
import { SupportBusinessSection } from "@/components/sections/support-business-section";
import { SupportCareSection } from "@/components/sections/support-care-section";
import { SupportCtaSection } from "@/components/sections/support-cta-section";
import { SupportExpertsSection } from "@/components/sections/support-experts-section";
import { SupportHeroSection } from "@/components/sections/support-hero-section";

export function SupportPage() {
  return (
    <div className="support-page flex min-h-full flex-1 flex-col">
      <div className="support-hero-block">
        <SiteHeader inBanner />
        <SupportHeroSection />
      </div>
      <main className="relative z-10 flex flex-1 flex-col">
        <SupportExpertsSection />
        <SupportCareSection />
        <SupportBusinessSection />
        <SupportCtaSection />
        <PricingTrustedPartnersSection />
      </main>
      <div className="relative z-20">
        <SiteFooter />
      </div>
    </div>
  );
}
