export const PRICING_HERO = {
  title: "Budget-friendly Packages",
} as const;

export const PRICING_INTRO = {
  title: "Prices That Fit Your Budget",
  description:
    "Explore our budget-friendly options and find the perfect package for your brand.",
} as const;

export const PRICING_TABS = [
  { id: "promotional", label: "Promotional Website" },
  { id: "ecommerce", label: "E-Commerce Website" },
  { id: "redesign", label: "Redesign" },
] as const;

export type PricingTabId = (typeof PRICING_TABS)[number]["id"];

export type PricingPlan = {
  id: string;
  title: string;
  price: string;
  originalPrice: string;
  discount: string;
  description: string;
  features: string[];
};

export const PRICING_PACKAGE_ICON = "/pricing/package-icon.png";

const promotionalPlans: PricingPlan[] = [
  {
    id: "quick-launch",
    title: "Quick Launch",
    price: "$199",
    originalPrice: "$1000",
    discount: "80% Off",
    description: "Get online fast with a professional designer.",
    features: [
      "1-2 Pages",
      "Squarespace Modern Template Setup",
      "Basic Branding (Colors & Fonts Applied)",
      "Contact Form Setup",
      "Delivery 1-2 Weeks",
    ],
  },
  {
    id: "startup-spark",
    title: "Startup Spark",
    price: "$499",
    originalPrice: "$2495",
    discount: "80% Off",
    description: "Choose the design that best represents your brand.",
    features: [
      "Everything in Quick Launch, plus:",
      "Up to 5 Pages",
      "Custom Layout Adjustments",
      "Mobile + Tablet Optimized",
      "Speed Optimization",
      "Delivery 2-3 Weeks",
    ],
  },
  {
    id: "growth-builder",
    title: "Growth Builder",
    price: "$899",
    originalPrice: "$4495",
    discount: "80% Off",
    description: "Double the expertise for a conversion-focused site",
    features: [
      "Everything in Startup Spark, plus:",
      "Up to 8 Pages",
      "Conversion-Focused Structure & CTAs",
      "Email Integration (Mailchimp / Flodesk etc.)",
      "Analytics Setup",
      "Delivery 2-4 Weeks",
    ],
  },
  {
    id: "professional-presence",
    title: "Professional Presence",
    price: "$1499",
    originalPrice: "$7495",
    discount: "80% Off",
    description: "Your brand — elevated with professional UX strategy.",
    features: [
      "Everything in Growth Builder, plus:",
      "Up to 10 Pages",
      "Lead Capture Form Setup",
      "Booking System or Calendar Integration",
      "Blog Setup + Structure",
      "Advance Animations & Scroll Effects",
      "Custom CSS Styling",
      "Social Media Integration",
      "Priority Support",
      "Delivery 2-4 Weeks",
    ],
  },
  {
    id: "membership-platform",
    title: "Membership Platform",
    price: "$2499",
    originalPrice: "$12495",
    discount: "80% Off",
    description: "Designed to position you as an industry leader.",
    features: [
      "Everything in Professional Presence, plus:",
      "Squarespace Membership Setup",
      "Tiered Member Access",
      "Gated Content Setup",
      "Course / Resource Structure",
      "Payment Integration",
      "Email Automation Setup",
      "30 Days Post-Launch Support",
      "Delivery 3-6 Weeks",
    ],
  },
  {
    id: "industry-leader",
    title: "Industry Leader",
    price: "$3999",
    originalPrice: "$19995",
    discount: "80% Off",
    description: "White-glove design. Unlimited possibilities.",
    features: [
      "Everything in Membership Platform, plus:",
      "Advanced Custom Code (CSS / JS)",
      "API & Third-Party Integrations",
      "Custom Features & Interactive Sections",
      "Advanced Performance Optimization",
      "Structured Data Setup",
      "45 Days Post-Launch Support",
      "Delivery 3-6 Weeks",
    ],
  },
];

const ecommercePlans: PricingPlan[] = [
  {
    id: "store-kickoff",
    title: "Store Kickoff",
    price: "$399",
    originalPrice: "$1995",
    discount: "80% Off",
    description: "Get your store online fast with a professional touch.",
    features: [
      "Up to 5 Products",
      "Modern Layout",
      "Checkout & Payment Setup",
    ],
  },
  {
    id: "store-starter",
    title: "Store Starter",
    price: "$699",
    originalPrice: "$3495",
    discount: "80% Off",
    description: "Two layouts + one winner — designed to sell.",
    features: [
      "Everything in Store Kickoff, plus:",
      "Up to 10 Products",
      "Mobile + Tablet Optimized",
      "Custom Store Layout & Categories",
      "Conversion-Ready Checkout",
      "Inventory Setup",
    ],
  },
  {
    id: "sales-booster",
    title: "Sales Booster",
    price: "$1099",
    originalPrice: "$5495",
    discount: "80% Off",
    description: "Double the expertise for higher sales.",
    features: [
      "Everything in Store Starter, plus:",
      "Up to 25 Products",
      "Custom Product Pages + UX Optimization",
      "Shipping & Tax Setup",
      "Upsell & Cross-Sell Features",
      "Analytics Integration",
    ],
  },
  {
    id: "ecommerce-pro",
    title: "Ecommerce Pro",
    price: "$1599",
    originalPrice: "$7995",
    discount: "80% Off",
    description: "Professional team + advanced UX for serious growth.",
    features: [
      "Everything in Sales Booster, plus:",
      "Up to 50 Products",
      "Coupons & Discounts Setup",
      "Conversion-Focused Product Pages",
      "Email Automation Setup",
      "Priority Support",
    ],
  },
  {
    id: "store-authority",
    title: "Store Authority",
    price: "$2199",
    originalPrice: "$10995",
    discount: "80% Off",
    description: "Designed for scaling and dominating your niche.",
    features: [
      "Everything in Ecommerce Pro, plus:",
      "Unlimited Products",
      "Advanced Automation & Abandoned Cart Flows",
      "Speed & Performance Optimization",
      "Analytics & Reporting",
    ],
  },
  {
    id: "ecommerce-empire",
    title: "Ecommerce Empire",
    price: "$3199",
    originalPrice: "$15995",
    discount: "80% Off",
    description: "Elite team + white-glove ecommerce execution.",
    features: [
      "Everything in Store Authority, plus:",
      "Enterprise-Level Store Build",
      "Memberships / Subscriptions",
      "Full CRO Strategy",
      "Dedicated Project Manager",
    ],
  },
];

const redesignPlans: PricingPlan[] = [
  {
    id: "quick-refresh",
    title: "Quick Refresh",
    price: "$249",
    originalPrice: "$1245",
    discount: "80% Off",
    description: "Fast visual refresh. Real designer at work.",
    features: ["Redesign 2 Pages", "Modern Layout", "CTA Improvements"],
  },
  {
    id: "modern-makeover",
    title: "Modern Makeover",
    price: "$449",
    originalPrice: "$2245",
    discount: "80% Off",
    description: "Two options + one winner — modern & conversion-friendly.",
    features: [
      "Everything in Quick Refresh, plus:",
      "Redesign 4 Pages",
      "Navigation & Layout Cleanup",
      "Mobile + Tablet Optimized",
    ],
  },
  {
    id: "conversion-reset",
    title: "Conversion Reset",
    price: "$749",
    originalPrice: "$3745",
    discount: "80% Off",
    description: "Designer + UX expert team for measurable results.",
    features: [
      "Everything in Modern Makeover, plus:",
      "Redesign 6 Pages",
      "Lead Capture Forms & CTA Strategy",
      "Speed Optimization",
    ],
  },
  {
    id: "redesign-pro",
    title: "Redesign Pro",
    price: "$1149",
    originalPrice: "$5745",
    discount: "80% Off",
    description: "Strategic redesign for professional impact.",
    features: [
      "Everything in Conversion Reset, plus:",
      "Redesign Up to 10 Pages",
      "Conversion-Focused UX",
      "Speed & Performance Optimization",
      "Analytics Setup",
    ],
  },
  {
    id: "brand-reinvention",
    title: "Brand Reinvention",
    price: "$1699",
    originalPrice: "$8495",
    discount: "80% Off",
    description: "Full redesign for maximum authority & credibility.",
    features: [
      "Everything in Redesign Pro, plus:",
      "Up to 12 Pages",
      "Advanced UX Funnels & Custom Branding",
    ],
  },
  {
    id: "digital-domination",
    title: "Digital Domination",
    price: "$2399",
    originalPrice: "$11995",
    discount: "80% Off",
    description: "Elite-level redesign. White-glove service.",
    features: [
      "Everything in Brand Reinvention, plus:",
      "Unlimited Pages",
      "Full UX/UI Overhaul + CRO Strategy",
      "Dedicated Project Manager",
    ],
  },
];

export const PRICING_PLANS: Record<PricingTabId, PricingPlan[]> = {
  promotional: promotionalPlans,
  ecommerce: ecommercePlans,
  redesign: redesignPlans,
};

export const PRICING_TRUSTED_PARTNERS = {
  title: "OUR TRUSTED PARTNERS WORLDWIDE",
  titleLines: ["OUR TRUSTED PARTNERS WORLDW", "IDE"] as const,
  badges: [
    { src: "/pricing/partners/1.webp", alt: "UpCity Best of Michigan" },
    { src: "/pricing/partners/2.webp", alt: "Squarespace Partner Legend" },
    {
      src: "/pricing/partners/3.webp",
      alt: "Premier Squarespace Web Designer Award",
    },
    { src: "/pricing/partners/4.webp", alt: "Clutch Top Creative Agency" },
    {
      src: "/pricing/partners/5.webp",
      alt: "Best Rated Facebook Marketing Agencies 2023",
    },
    { src: "/pricing/partners/6.webp", alt: "Featured on UpCity" },
    { src: "/pricing/partners/7.webp", alt: "GoDaddy Pro Plus" },
    {
      src: "/pricing/partners/8.webp",
      alt: "Expertise Best Advertising Agencies 2020",
    },
    { src: "/pricing/partners/9.webp", alt: "Alignable Highly Recommended" },
    { src: "/pricing/partners/10.webp", alt: "Jobber Partner" },
    {
      src: "/pricing/partners/11.webp",
      alt: "Meta Certified Creative Strategy Professional",
    },
    { src: "/pricing/partners/12.webp", alt: "Best Search TOPSEOs" },
    { src: "/pricing/partners/13.webp", alt: "Yext" },
  ],
} as const;
