"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./container";
import { MobileMenu } from "./mobile-menu";
import { MobileMenuTrigger } from "./mobile-menu-trigger";
import { SiteLogo } from "./site-logo";
import { CtaButton } from "@/components/ui/cta-button";
import { NAV_LINKS, SERVICE_LINKS, SITE } from "@/lib/data/site";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="relative z-10 border-b border-neutral-200/60 bg-transparent pt-4">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4 sm:gap-6 lg:h-[72px]">
          <SiteLogo />

          <nav className="hidden items-center gap-8 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="nav-link flex items-center gap-1"
                aria-expanded={servicesOpen}
              >
                Services
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden
                  className="mt-0.5"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] border border-neutral-200 bg-white py-2 shadow-lg">
                  {SERVICE_LINKS.map((service) => (
                    <Link
                      key={service}
                      href="#services"
                      className="nav-link block px-4 py-2 hover:bg-neutral-50"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-8 lg:flex">
            <a href={SITE.phoneHref} className="nav-link">
              {SITE.phone}
            </a>
            <CtaButton href="#contact">Get Started</CtaButton>
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
