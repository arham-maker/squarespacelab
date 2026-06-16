import type { LpPackage } from "@/lib/data/lp";
import { SITE } from "@/lib/data/site";

export const LP2_CONTACT = {
  phone: SITE.phone,
  phoneHref: SITE.phoneHref,
  email: SITE.email,
  emailHref: SITE.emailHref,
  brand: "SquarespaceLab",
} as const;

export const LP2_PORTFOLIO_ROW1 = [
  "p10.webp",
  "p11.webp",
  "p12.webp",
  "p13.webp",
  "p14.webp",
] as const;

export const LP2_PORTFOLIO_ROW2 = [
  "p14.webp",
  "p15.webp",
  "p16.webp",
  "p17.webp",
  "p18.webp",
] as const;

const VIDEO_DELIVERABLES = [
  "30 Second Video",
  "Professional Script",
  "Storyboard",
  "Animation",
  "Voice - Over & Sound Effects",
  "2 weeks delivery",
  "Unlimited Revisions",
] as const;

export const LP2_PROMOTIONAL_PACKAGES: LpPackage[] = [
  {
    title: "Starter",
    price: "$199",
    compareAt: "$995",
    discount: "80% off!",
    deliverables: [
      "1–2 Page Website",
      "Modern Design Template",
      "Contact Form",
      "Social Media Links",
      "Delivery in 1–2 Weeks",
    ],
  },
  {
    title: "Essential",
    price: "$449",
    compareAt: "$2245",
    discount: "80% off!",
    deliverables: [
      "Includes everything in Starter, plus:",
      "Up to 5 Custom-Designed Pages",
      "Cross Browser Compatible",
      "Image Optimization",
      "Custom Favicon",
      "Delivery in 2–3 Weeks",
    ],
  },
  {
    title: "Growth",
    price: "$849",
    compareAt: "$4245",
    discount: "80% off!",
    deliverables: [
      "Includes everything in Essential, plus:",
      "Up to 8 Pages",
      "Unlimited Design Revisions",
      "Mobile Responsive Designs",
      "Embedded Video (Customer will provide)",
      "Click-to-Call and WhatsApp Chat",
      "Delivery in 2–4 Weeks",
    ],
  },
  {
    title: "Pro",
    price: "$1399",
    compareAt: "$6995",
    discount: "80% off!",
    deliverables: [
      "Includes everything in Growth, plus:",
      "Up to 10 Pages",
      "Analytics Integration",
      "Advanced Animations & Scroll Effects",
      "Lead Capture Forms",
      "Google Maps",
      "Priority Support",
      "Delivery in 2–4 Weeks",
    ],
  },
  {
    title: "Elite",
    price: "$1899",
    compareAt: "$9495",
    discount: "80% off!",
    deliverables: [
      "Includes everything in Pro, plus:",
      "Booking System or Calendar Integration",
      "Sliding Banners",
      "Email Auto Responder",
      "Multi-language Setup (Up to 2 Languages)",
      "Blog & Newsletter Integration",
      "30 Days Post-Launch Support",
      "1 Hour Strategy Call Included",
      "Delivery in 3–5 Weeks",
    ],
  },
  {
    title: "Ultimate",
    price: "$2699",
    compareAt: "$13495",
    discount: "80% off!",
    deliverables: [
      "Includes everything in Elite, plus:",
      "Unlimited Pages",
      "Custom Illustrations or Icons",
      "Membership/Portal Access (If Required)",
      "Custom Animations",
      "3 Months Free Maintenance",
      "VIP Support Access",
      "Delivery in 3–6 Weeks",
    ],
  },
];

export const LP2_ECOMMERCE_PACKAGES: LpPackage[] = [
  {
    title: "Basic Store",
    price: "$599",
    compareAt: "$2995",
    discount: "80% off!",
    deliverables: [
      "Up to 10 Products",
      "Mobile & Tablet Friendly",
      "Payment Gateway Setup",
      "Product Categories",
      "Basic Checkout Flow",
      "Email Notifications",
      "Social Media Links",
      "Delivery in 2–4 Weeks",
    ],
  },
  {
    title: "Pro Store",
    price: "$1399",
    compareAt: "$6995",
    discount: "50% off!",
    deliverables: [
      "Includes everything in Basic Store, plus:",
      "Up to 50 Products",
      "Product Variants (Size, Color, etc.)",
      "Discount Coupons & Gift Cards",
      "Abandoned Cart Recovery",
      "Google Analytics",
      "Blog Setup (Optional)",
      "Delivery in 3–5 Weeks",
    ],
  },
  {
    title: "Advanced Store",
    price: "$2999",
    compareAt: "$14995",
    discount: "50% off!",
    deliverables: [
      "Includes everything in Pro Store, plus:",
      "Up to 200 Products",
      "Digital Downloads or Subscriptions",
      "Facebook Pixel",
      "Wishlist & Product Quick View",
      "Instagram Shop Integration",
      "CRM or Email Marketing Integration",
      "Conversion-Focused Design",
      "Priority Launch Support",
      "Delivery in 4–6 Weeks",
    ],
  },
  {
    title: "Enterprise Store",
    price: "$4499",
    compareAt: "$22495",
    discount: "50% off!",
    deliverables: [
      "Includes everything in Advanced Store, plus:",
      "Unlimited Products",
      "Marketplace/Multi-vendor Capable",
      "POS & Inventory Sync",
      "Multilingual Store Setup",
      "Sales Funnel or Upsell Integration",
      "Automated Email Campaigns",
      "3 Months Premium Support & Maintenance",
      "Launch Strategy & Marketing Checklist",
      "Delivery in 6–7 Weeks",
    ],
  },
];

export type Lp2VideoPackage = LpPackage & {
  subtitle?: string;
  hideChat?: boolean;
};

export const LP2_VIDEO_PACKAGES: Lp2VideoPackage[] = [
  {
    title: "Typography",
    price: "$899",
    compareAt: "$4495",
    discount: "80% off!",
    deliverables: [...VIDEO_DELIVERABLES],
    hideChat: true,
  },
  {
    title: "Motion Graphics",
    subtitle: "Extended Commercial License",
    price: "$1099",
    compareAt: "$5495",
    discount: "80% off!",
    deliverables: [...VIDEO_DELIVERABLES],
    hideChat: true,
  },
  {
    title: "Explainer Videos",
    price: "$1299",
    compareAt: "$6495",
    discount: "80% off!",
    deliverables: [...VIDEO_DELIVERABLES],
    hideChat: true,
  },
];

export const LP2_DISCLAIMER =
  'SquarespaceLab is an independent company that provides design and development services for e-commerce solutions. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Squarespace, or any of its subsidiaries or affiliates. The name "Squarespace" as well as related names, marks, emblems, and images are registered trademarks of their respective owners.';
