import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ConditionalMarqueeTopbar } from "@/components/layout/conditional-marquee-topbar";
import { LeadFormProvider } from "@/components/providers/lead-form-provider";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { LiveChatProvider } from "@/components/providers/livechat-provider";
import "./globals.css";
import "./lp0/lp-lead-modal.css";
import "./get-started-modal.css";

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
        <Script id="ze-settings" strategy="beforeInteractive">
          {`window.zESettings={webWidget:{zIndex:999999,offset:{horizontal:"20px",vertical:"20px"}}};`}
        </Script>
        <Script
          id="ze-snippet"
          src="https://static.zdassets.com/ekr/snippet.js?key=923e51fa-97d5-49a2-9055-0fb23e466aba"
          strategy="beforeInteractive"
        />
        <Script
          id="bing-uet"
          src="/js/bing-uet.js"
          strategy="afterInteractive"
        />
        <Script
          id="microsoft-clarity"
          src="/js/microsoft-clarity.js"
          strategy="afterInteractive"
        />
        <ConditionalMarqueeTopbar />
        <GsapProvider>
          <LeadFormProvider>
            <SmoothScrollProvider>
              <LiveChatProvider />
              {children}
            </SmoothScrollProvider>
          </LeadFormProvider>
        </GsapProvider>
      </body>
    </html>
  );
}
