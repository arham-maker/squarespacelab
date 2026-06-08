"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { SERVICE_LINKS } from "@/lib/data/site";
import { registerGsapPlugins } from "@/lib/gsap/register";

export function ServicesDropdown() {
  const reducedMotion = usePrefersReducedMotion();
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const skipCloseAnimationRef = useRef(true);

  const getItems = () =>
    itemsRef.current.filter((item): item is HTMLLIElement => item !== null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const items = getItems();
    if (!items.length) return;

    if (reducedMotion) {
      gsap.set(items, { autoAlpha: open ? 1 : 0, yPercent: 0, clearProps: "transform" });
      return;
    }

    if (open) {
      gsap.to(items, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
      });
      return;
    }

    if (skipCloseAnimationRef.current) {
      gsap.set(items, { yPercent: 150, autoAlpha: 0 });
      skipCloseAnimationRef.current = false;
      return;
    }

    gsap.to(items, {
      yPercent: 150,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.in",
      overwrite: true,
    });
  }, [open, reducedMotion]);

  const handleEnter = () => {
    clearTimeout(closeTimerRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 100);
  };

  return (
    <div
      className={`services-nav ${open ? "is-open" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className="nav-link services-nav__trigger flex items-center gap-1"
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={handleEnter}
        onBlur={(event) => {
          if (!event.currentTarget.closest(".services-nav")?.contains(event.relatedTarget as Node)) {
            handleLeave();
          }
        }}
      >
        Services
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden
          className="services-nav__caret mt-0.5"
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

      <ul className="services-nav__dropdown m-0 list-none p-0">
        {SERVICE_LINKS.map((service, index) => (
          <li
            key={service.href}
            ref={(element) => {
              itemsRef.current[index] = element;
            }}
            className="services-nav__item"
          >
            <Link href={service.href} className="services-nav__link">
              {service.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
