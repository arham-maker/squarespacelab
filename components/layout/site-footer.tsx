import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import {
  FOOTER_DESCRIPTION,
  FOOTER_DISCLAIMER,
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICES_LEFT,
  FOOTER_SERVICES_RIGHT,
} from "@/lib/data/footer";
import { SITE } from "@/lib/data/site";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-footer-title text-white">{children}</h3>
      <span className="mt-2 block h-[3px] w-[90px] bg-white" aria-hidden />
    </div>
  );
}

function FooterLinkList({
  items,
}: {
  items: readonly ({ label: string; href: string } | string)[];
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => {
        const label = typeof item === "string" ? item : item.label;
        const href = typeof item === "string" ? "#services" : item.href;

        return (
          <li key={`${label}-${index}`}>
            <Link
              href={href}
              className="text-body text-neutral-400 transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="section-padding bg-black text-white">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block cursor-pointer">
              <Image
                src={SITE.logoWhite}
                alt={SITE.name}
                width={340}
                height={75}
                className="h-10 w-auto max-w-[240px] sm:h-12 lg:h-[75px] lg:w-auto lg:max-w-[340px]"
              />
            </Link>
            <p className="text-body mt-4 max-w-sm text-white sm:mt-5">
              {FOOTER_DESCRIPTION}
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>Quick Links</FooterHeading>
            <FooterLinkList items={FOOTER_QUICK_LINKS} />
          </div>

          <div className="lg:col-span-4">
            <FooterHeading>Services</FooterHeading>
            <div className="grid grid-cols-2 gap-x-6 gap-y-0">
              <FooterLinkList items={FOOTER_SERVICES_LEFT} />
              <FooterLinkList items={FOOTER_SERVICES_RIGHT} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>Contact Info</FooterHeading>
            <a
              href={SITE.phoneHref}
              className="text-body inline-flex items-center gap-2.5 text-neutral-400 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 fill-current"
                aria-hidden
              >
                <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2a9.2 9.2 0 002.9.5c.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2A17.8 17.8 0 013 5.2C3 4.5 3.5 4 4.2 4h3.6c.7 0 1.2.5 1.2 1.2 0 1 .2 2 .5 2.9.1.4 0 .9-.3 1.2l-2.2 2.5z" />
              </svg>
              {SITE.phone}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 sm:mt-12 sm:pt-8 lg:mt-14 lg:pt-10">
          <div className="text-footer-small flex flex-wrap items-center justify-center gap-4 text-neutral-400 sm:gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms & Conditions
            </Link>
          </div>
          <p className="text-body mx-auto mt-5 text-center text-white sm:mt-6">
            {FOOTER_DISCLAIMER}
          </p>
        </div>
      </Container>
    </footer>
  );
}
