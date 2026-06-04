import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConditionalMarqueeTopbar } from "@/components/layout/conditional-marquee-topbar";
import { LeadFormProvider } from "@/components/providers/lead-form-provider";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { MouseCursor } from "@/components/ui/mouse-cursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Professional Squarespace Web Design Services | Squarespacedev",
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
        <ConditionalMarqueeTopbar />
        <GsapProvider>
          <LeadFormProvider>
            <SmoothScrollProvider>
              {children}
              <MouseCursor />
            </SmoothScrollProvider>
          </LeadFormProvider>
        </GsapProvider>
      </body>
    </html>
  );
}
