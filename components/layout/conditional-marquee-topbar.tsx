"use client";

import { usePathname } from "next/navigation";
import { MarqueeTopbar } from "./marquee-topbar";

/** Disclaimer marquee — hidden on contact (and other inner pages as needed). */
export function ConditionalMarqueeTopbar() {
  const pathname = usePathname();

  if (
    pathname === "/contact" ||
    pathname === "/our-pricing" ||
    pathname === "/our-work" ||
    pathname === "/terms-and-conditions"
  ) {
    return null;
  }

  return <MarqueeTopbar />;
}
