"use client";

import { usePathname } from "next/navigation";
import { MarqueeTopbar } from "./marquee-topbar";

/** Disclaimer marquee — hidden on contact (and other inner pages as needed). */
export function ConditionalMarqueeTopbar() {
  const pathname = usePathname();

  if (
    pathname === "/contact" ||
    pathname === "/thankyou" ||
    pathname === "/thankyou-lp2" ||
    pathname === "/our-pricing" ||
    pathname === "/our-work" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/privacy-policy" ||
    pathname === "/digital-marketing" ||
    pathname === "/logo-design" ||
    pathname === "/web-design" ||
    pathname === "/branding" ||
    pathname === "/graphic-design" ||
    pathname === "/email-hosting" ||
    pathname === "/advertising" ||
    pathname === "/your-all-in-one" ||
    pathname === "/social-media" ||
    pathname === "/support" ||
    pathname === "/lp0"
  ) {
    return null;
  }

  return <MarqueeTopbar />;
}
