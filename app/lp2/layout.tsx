import type { Metadata } from "next";
import Script from "next/script";
import { Lp2LiveChatClicks } from "./lp2-live-chat-clicks";

export const metadata: Metadata = {
  title:
    "Struggling to Find a Squarespace Designer? Hire a Pro for a Stunning Site!",
  description:
    "Hire a Squarespace website designer in the USA for custom design, redesign, ecommerce, memberships, SEO, support, and conversion-focused Squarespace development.",
};

export default function Lp2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <link rel="stylesheet" href="/lp2/assets/css/layout.css" />
      <link rel="stylesheet" href="/lp2/assets/css/style.css" />
      {children}
      <Lp2LiveChatClicks />
      <Script src="/lp2/assets/js/jquery.js" strategy="afterInteractive" />
      <Script src="/lp2/assets/js/custom.js" strategy="afterInteractive" />
      <Script
        id="lp2-ze-snippet"
        src="https://static.zdassets.com/ekr/snippet.js?key=7bd390f1-a972-410d-873b-1a1be1c32f80"
        strategy="afterInteractive"
      />
      <Script id="lp2-livechat" strategy="afterInteractive">
        {`
          function setButtonURL() {
            if (typeof zE === "function") {
              zE('webWidget', 'open');
              return;
            }
            if (typeof $zopim !== "undefined" && $zopim.livechat && $zopim.livechat.window) {
              $zopim.livechat.window.show();
            }
          }
          window.setButtonURL = setButtonURL;
        `}
      </Script>
    </div>
  );
}
