"use client";

import type { ReactNode } from "react";
import { useLeadForm } from "@/components/providers/lead-form-provider";
import { openLiveChat } from "@/lib/livechat";
import type { LpPackage } from "@/lib/data/lp";
import { lpImage } from "@/components/lp/lp-assets";

type LpCtaProps = {
  className?: string;
  children: ReactNode;
  icon?: boolean;
};

export function LpCtaButton({ className = "", children, icon }: LpCtaProps) {
  const { openLeadForm } = useLeadForm();

  return (
    <a
      href="javascript:;"
      className={`theme-btn popstatic ${className}`.trim()}
      onClick={(e) => {
        e.preventDefault();
        openLeadForm();
      }}
    >
      {children}
      {icon ? <i className="fas fa-arrow-right" /> : null}
    </a>
  );
}

export function LpPackageButton({
  pkg,
  category,
  className = "theme-btn w-100 text-center popdynamic",
  children = "Let's Get Started",
}: {
  pkg: LpPackage;
  category: string;
  className?: string;
  children?: ReactNode;
}) {
  const { openLeadForm } = useLeadForm();

  return (
    <a
      href="javascript:;"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openLeadForm({
          name: pkg.title,
          price: pkg.price,
          category,
          details: pkg.deliverables.join("\n"),
        });
      }}
    >
      {children}
    </a>
  );
}

export function LpLiveChatButton({
  className = "theme-btn bordered",
  iconSrc,
  label = "Live Chat",
}: {
  className?: string;
  iconSrc?: string;
  label?: string;
}) {
  return (
    <a
      href="javascript:;"
      className={["open-livechat", className].filter(Boolean).join(" ")}
      title={label}
      onClick={(e) => {
        e.preventDefault();
        openLiveChat();
      }}
    >
      {iconSrc ? <img src={lpImage(iconSrc)} alt="" /> : null}
      {label}
    </a>
  );
}
