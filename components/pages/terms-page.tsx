"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TermsContentSection } from "@/components/sections/terms-content-section";
import { TermsHeroSection } from "@/components/sections/terms-hero-section";

export function TermsPage() {
  return (
    <div className="terms-page flex min-h-full flex-1 flex-col">
      <div className="terms-hero-block">
        <SiteHeader inBanner />
        <TermsHeroSection />
      </div>
      <main className="relative z-10 flex flex-1 flex-col bg-white">
        <TermsContentSection />
      </main>
      <div className="relative z-20">
        <SiteFooter />
      </div>
    </div>
  );
}
