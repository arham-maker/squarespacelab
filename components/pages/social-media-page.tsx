"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SocialMediaBenefitsSection } from "@/components/sections/social-media-benefits-section";
import { SocialMediaCtaSection } from "@/components/sections/social-media-cta-section";
import { SocialMediaHeroSection } from "@/components/sections/social-media-hero-section";
import { SocialMediaServicesSection } from "@/components/sections/social-media-services-section";
import { SocialMediaWhySection } from "@/components/sections/social-media-why-section";
import { PricingTrustedPartnersSection } from "@/components/sections/pricing-trusted-partners-section";

export function SocialMediaPage() {
  return (
    <div className="social-media-page flex min-h-full flex-1 flex-col">
      <div className="social-media-hero-block">
        <SiteHeader inBanner />
        <SocialMediaHeroSection />
      </div>
      <main className="relative z-10 flex flex-1 flex-col">
        <SocialMediaBenefitsSection />
        <SocialMediaServicesSection />
        <SocialMediaWhySection />
        <SocialMediaCtaSection />
        <PricingTrustedPartnersSection />
      </main>
      <div className="relative z-20">
        <SiteFooter />
      </div>
    </div>
  );
}
