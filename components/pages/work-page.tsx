"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PricingTrustedPartnersSection } from "@/components/sections/pricing-trusted-partners-section";
import { WorkHeroSection } from "@/components/sections/work-hero-section";
import { WorkPortfolioSection } from "@/components/sections/work-portfolio-section";
import { WorkStepsSection } from "@/components/sections/work-steps-section";

export function WorkPage() {
  return (
    <div className="work-page flex min-h-full flex-1 flex-col">
      <div className="work-hero-block">
        <SiteHeader inBanner />
        <WorkHeroSection />
      </div>
      <main className="relative z-10 flex flex-1 flex-col">
        <WorkPortfolioSection />
        <WorkStepsSection />
        <PricingTrustedPartnersSection />
      </main>
      <div className="relative z-20">
        <SiteFooter />
      </div>
    </div>
  );
}
