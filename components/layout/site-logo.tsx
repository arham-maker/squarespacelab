import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data/site";

export function SiteLogo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
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
