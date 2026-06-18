import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ConditionalMarqueeTopbar } from "@/components/layout/conditional-marquee-topbar";
import { LeadFormProvider } from "@/components/providers/lead-form-provider";
import { AutoPopupProvider } from "@/components/providers/auto-popup-provider";
import { LiveChatAutoOpenProvider } from "@/components/providers/livechat-auto-open-provider";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { LiveChatWidget } from "@/components/livechat/livechat-widget";
import { LiveChatWidgetConfig } from "@/components/livechat/livechat-widget-config";
import { MouseCursor } from "@/components/ui/mouse-cursor";
import "./globals.css";
import "./lp/lp-lead-modal.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Professional Squarespace Web Design Services | SquarespaceLab",
  description:
    "Custom Squarespace web design and e-commerce solutions. Expert designers, rapid turnaround, and free consultation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Script
          id="bing-uet"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,t,u,o){w[u]=w[u]||[],o.ts=(new Date).getTime();var n=d.createElement(t);n.src="https://bat.bing.net/bat.js?ti="+o.ti+("uetq"!=u?"&q="+u:""),n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&"loaded"!==s&&"complete"!==s||(o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad"),n.onload=n.onreadystatechange=null)};var i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i)})(window,document,"script","uetq",{ti:"343254508",enableAutoSpaTracking:true});`,
          }}
        />
        <ConditionalMarqueeTopbar />
        <GsapProvider>
        <LeadFormProvider>
          <LiveChatAutoOpenProvider>
            <AutoPopupProvider>
              <SmoothScrollProvider>
              {children}
              <MouseCursor />
              <LiveChatWidget />
              <LiveChatWidgetConfig />
              </SmoothScrollProvider>
            </AutoPopupProvider>
          </LiveChatAutoOpenProvider>
        </LeadFormProvider>
        </GsapProvider>
      </body>
    </html>
  );
}
