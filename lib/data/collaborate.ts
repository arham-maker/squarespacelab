import { SITE } from "@/lib/data/site";

export const COLLABORATE_CARDS = [
  {
    id: "call",
    title: "Need Help Right Away?",
    description: "Click here to call anytime, day or night",
    href: SITE.phoneHref,
  },
  {
    id: "email",
    title: "Want to Get in Touch?",
    description: "Click here to send your email",
    href: SITE.emailHref,
  },
] as const;
