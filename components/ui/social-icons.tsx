import { AiFillFacebook } from "react-icons/ai";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { ComponentType } from "react";

const ICON_CLASS = "h-[25px] w-[25px] shrink-0";

export type SocialIconName = "facebook" | "x" | "linkedin" | "instagram";

const icons: Record<SocialIconName, ComponentType<{ className?: string }>> = {
  facebook: AiFillFacebook,
  x: FaXTwitter,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
};

export function SocialIcon({ name }: { name: SocialIconName }) {
  const Icon = icons[name];
  return <Icon className={ICON_CLASS} aria-hidden />;
}
