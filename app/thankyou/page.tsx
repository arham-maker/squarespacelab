import type { Metadata } from "next";
import Script from "next/script";
import { redirect } from "next/navigation";
import { ThankYouPage } from "@/components/pages/thank-you-page";

export const metadata: Metadata = {
  title: "Thank You | SquarespaceLab",
  description:
    "Thanks! We have received your request. Expect a quick reply from our Squarespace experts.",
};

type ThankYouRouteProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ThankYou({ searchParams }: ThankYouRouteProps) {
  const params = await searchParams;
  const from = firstValue(params.from);
  // Support both ?from=lp2 and legacy ?from-lp2 without breaking /thankyou
  const wantsLp2 =
    from === "lp2" ||
    Object.prototype.hasOwnProperty.call(params, "from-lp2");

  if (wantsLp2) {
    redirect("/thankyou-lp2");
  }

  return (
    <>
      <Script id="bing-uet-signup" strategy="afterInteractive">
        {`window.uetq = window.uetq || [];window.uetq.push('event', 'signup', {});`}
      </Script>
      <ThankYouPage />
    </>
  );
}
