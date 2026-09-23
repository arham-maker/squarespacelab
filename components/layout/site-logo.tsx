import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data/site";

type SiteLogoProps = {
  href?: string;
};

export function SiteLogo({ href = "/" }: SiteLogoProps) {
  return (
    <Link href={href} className="inline-flex shrink-0 cursor-pointer items-center">
      <Image
        src={SITE.logoBlack}
        alt={SITE.name}
        width={339}
        height={75}
        priority
        className="h-7 w-auto max-w-[200px] sm:h-8 sm:max-w-[260px] lg:h-auto lg:w-[400px] lg:max-w-[400px]"
      />
    </Link>
  );
}
