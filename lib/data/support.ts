import { SITE } from "@/lib/data/site";

export const SUPPORT_HERO = {
  label: "Get Expert",
  title: "Squarespace Support",
  subtitle: "Your One-Stop Solution for Squarespace Support",
  description:
    "Our dedicated support team is here to help you navigate any challenges with your Squarespace website. From setup to optimization, we offer all-in-one support to keep your website looking and working great.",
} as const;

export const SUPPORT_EXPERTS = {
  titleLines: [
    "Your Go-To Experts",
    "for Reliable Website",
    "Support",
  ],
  subtitle:
    "Whether it's routine updates or troubleshooting issues, we're here to help whenever you need.",
  bullets: [
    "Site Setup and Configuration",
    "Custom Design Assistance",
    "SEO Optimization",
    "Content Management Support",
    "Technical Troubleshooting",
    "E-commerce Integration",
    "Performance Optimization",
    "Ongoing Site Maintenance",
  ],
} as const;

export const SUPPORT_CARE = {
  label: "Your Website, Our Expert Care",
  lead: "We manage your site's performance, resolve issues, and ensure it's always ready to impress visitors.",
  description:
    "Our expert support service is designed to keep your website running at its best without the hassle. From troubleshooting technical issues to ensuring your site is optimized and up-to-date, we handle the details so you can focus on what you do best. With reliable, hands-on assistance tailored to your needs, we ensure your site is always working smoothly and ready to impress your visitors.",
  image: {
    src: "/support/26.webp",
    alt: "Squarespace website support and maintenance preview",
  },
} as const;

export const SUPPORT_BUSINESS = {
  title:
    "Get Back to Business with Our Reliable Squarespace Support – We Handle the Tech, You Drive Success!",
  description:
    "Our dedicated support ensures that your website functions optimally and stays updated, saving you time and reducing stress.",
  phoneLabel: "Need help? Get in touch with us at",
  phone: SITE.phone,
  phoneHref: SITE.phoneHref,
} as const;

export const SUPPORT_CTA = {
  title: "Have Questions About Squarespace? Talk to Our Experts!",
  description:
    "Maximize the potential of your site with support from our experts who know Squarespace inside and out.",
  cta: { label: "Chat with an Expert", href: "/contact" },
} as const;
