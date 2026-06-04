"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { EmailHostingDifferenceSection } from "@/components/sections/email-hosting-difference-section";
import { EmailHostingHeroSection } from "@/components/sections/email-hosting-hero-section";
import { EmailHostingIntroSection } from "@/components/sections/email-hosting-intro-section";
import { EmailHostingWhySection } from "@/components/sections/email-hosting-why-section";
import { PricingTrustedPartnersSection } from "@/components/sections/pricing-trusted-partners-section";

export function EmailHostingPage() {
  return (
    <div className="email-hosting-page flex min-h-full flex-1 flex-col">
      <div className="email-hosting-hero-block">
        <SiteHeader inBanner />
        <EmailHostingHeroSection />
      </div>
      <main className="relative z-10 flex flex-1 flex-col">
        <EmailHostingIntroSection />
        <EmailHostingWhySection />
        <EmailHostingDifferenceSection />
        <PricingTrustedPartnersSection />
      </main>
      <div className="relative z-20">
        <SiteFooter />
      </div>
    </div>
  );
}
