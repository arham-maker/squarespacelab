"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CtaButton } from "@/components/ui/cta-button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { registerGsapPlugins } from "@/lib/gsap/register";
import {
  closeMobileMenu,
  openMobileMenu,
  setMobileMenuClosed,
  toggleServicesList,
  type MobileMenuElements,
} from "@/lib/gsap/mobile-menu";
import { NAV_LINKS, SERVICE_LINKS, SITE } from "@/lib/data/site";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const linkClass = "text-menu block py-3 text-black";

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const servicesListRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstRender = useRef(true);

  const getElements = (): MobileMenuElements | null => {
    const root = rootRef.current;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!root || !backdrop || !panel) return null;

    const items = gsap.utils.toArray<HTMLElement>(
      panel.querySelectorAll("[data-menu-item]")
    );
    const sections = gsap.utils.toArray<HTMLElement>(
      panel.querySelectorAll("[data-menu-section]")
    );

    return { root, backdrop, panel, items, sections };
  };

  useLayoutEffect(() => {
    registerGsapPlugins();
    const elements = getElements();
    if (!elements) return;

    setMobileMenuClosed(elements);
  }, []);

  useLayoutEffect(() => {
    const elements = getElements();
    if (!elements) return;

    timelineRef.current?.kill();

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isOpen) return;
    }

    if (isOpen) {
      timelineRef.current = openMobileMenu(elements, reducedMotion);
    } else {
      timelineRef.current = closeMobileMenu(elements, reducedMotion);
    }
  }, [isOpen, reducedMotion]);

  useEffect(() => {
    if (!servicesListRef.current) return;
    toggleServicesList(
      servicesListRef.current,
      servicesExpanded,
      reducedMotion
    );
  }, [servicesExpanded, reducedMotion]);

  useEffect(() => {
    if (!isOpen) setServicesExpanded(false);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={rootRef}
      className="invisible fixed inset-0 z-[100] lg:hidden"
      aria-hidden={!isOpen}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        className="absolute inset-0 flex w-full flex-col bg-primary-light will-change-transform"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div
          data-menu-section
          className="container-main flex items-center justify-between border-b border-neutral-200/80 py-5"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Menu
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-neutral-300 text-black"
            aria-label="Close menu"
          >
            <span className="sr-only">Close</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path
                d="M2 2l14 14M16 2L2 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="container-main flex flex-1 flex-col overflow-y-auto py-6">
          <div data-menu-section className="mb-2">
            <button
              type="button"
              data-menu-item
              className="text-menu flex w-full items-center justify-between py-3 text-left text-black"
              onClick={() => setServicesExpanded((open) => !open)}
              aria-expanded={servicesExpanded}
            >
              Services
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                className={`transition-transform duration-300 ${servicesExpanded ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              ref={servicesListRef}
              className="h-0 overflow-hidden opacity-0"
            >
              <div className="border-l border-neutral-300 pl-4">
                {SERVICE_LINKS.map((service) => (
                  <Link
                    key={service}
                    href="#services"
                    data-menu-item
                    className="text-nav block py-2.5 text-neutral-700"
                    onClick={onClose}
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div data-menu-section className="border-t border-neutral-200/80 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-menu-item
                className={linkClass}
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href={SITE.phoneHref}
            data-menu-item
            className={`${linkClass} border-t border-neutral-200/80`}
            onClick={onClose}
          >
            {SITE.phone}
          </a>

          <div data-menu-item className="mt-6">
            <CtaButton href="#contact" className="w-full text-center" onClick={onClose}>
              Get Started
            </CtaButton>
          </div>
        </nav>
      </div>
    </div>
  );
}
