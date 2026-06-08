"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";
import { MobileMenu } from "./mobile-menu";
import { MobileMenuTrigger } from "./mobile-menu-trigger";
import { ServicesDropdown } from "./services-dropdown";
import { SiteLogo } from "./site-logo";
import { CtaButton } from "@/components/ui/cta-button";
import { NAV_LINKS, SITE } from "@/lib/data/site";

type SiteHeaderProps = {
  /** Fixed under the marquee bar (inner pages) */
  fixedBelowMarquee?: boolean;
  /** Transparent header over a page banner (e.g. contact) */
  inBanner?: boolean;
};

export function SiteHeader({
  fixedBelowMarquee = false,
  inBanner = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerClass = inBanner
    ? "site-header--banner relative z-50 border-b border-transparent bg-transparent pt-4"
    : fixedBelowMarquee
      ? "site-header--inner fixed inset-x-0 z-50 border-b border-neutral-200/60 bg-primary-light/95 pt-4 backdrop-blur-sm"
      : "relative z-10 border-b border-neutral-200/60 bg-transparent pt-4";

  const fixedTop =
    fixedBelowMarquee && pathname !== "/contact"
      ? "var(--marquee-topbar-height)"
      : fixedBelowMarquee
        ? 0
        : undefined;

  return (
    <header
      className={headerClass}
      style={fixedBelowMarquee ? { top: fixedTop } : undefined}
    >
      <Container>
        <div className="flex h-14 items-center justify-between gap-4 sm:gap-6 lg:h-[72px]">
          <SiteLogo />

          <nav className="hidden items-center gap-8 lg:flex">
            <ServicesDropdown />

            {NAV_LINKS.map((link) => {
              const isActive =
                (link.href === "/contact" && pathname === "/contact") ||
                (link.href === "/our-pricing" && pathname === "/our-pricing") ||
                (link.href === "/our-work" && pathname === "/our-work");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-8 lg:flex">
            <a href={SITE.phoneHref} className="nav-link">
              {SITE.phone}
            </a>
            <CtaButton opensLeadForm>Get Started</CtaButton>
          </div>

          <MobileMenuTrigger
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          />
        </div>
      </Container>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
