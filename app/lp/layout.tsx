import type { Metadata } from "next";
import Script from "next/script";
import "./lp-lead-modal.css";
import "./lp-variant-overrides.css";
import "./lp-landing-enhancements.css";

export const metadata: Metadata = {
  title:
    "Custom Squarespace Website Design & Development Services | SquarespaceLab",
  description:
    "Hire a Squarespace website designer in the USA for custom design, ecommerce, memberships, SEO, support, and conversion-focused Squarespace development.",
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <link rel="stylesheet" href="/lp/assets/css/layout.css" />
      <link rel="stylesheet" href="/lp/assets/css/style.css" />
      <link
        rel="preload"
        as="image"
        href="/lp/assets/images/banner/banner-image.png"
      />
      {children}
      <Script id="lp-livechat" strategy="afterInteractive">
        {`
          function setButtonURL() {
            if (typeof zE === "function") {
              try {
                zE("messenger", "open");
              } catch (error) {
                zE("webWidget", "open");
              }
            }
          }
          window.setButtonURL = setButtonURL;
        `}
      </Script>
    </div>
  );
}
