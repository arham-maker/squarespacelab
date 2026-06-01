import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data/site";

export function SiteLogo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      <Image
        src="/logo.webp"
        alt={SITE.name}
        width={400}
        height={64}
        priority
        className="h-7 w-auto max-w-[200px] sm:h-8 sm:max-w-[260px] lg:h-auto lg:max-w-[400px]"
      />
    </Link>
  );
}
