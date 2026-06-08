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

export const PRICING_PLANS: Record<PricingTabId, PricingPlan[]> = {
  promotional: promotionalPlans,
  ecommerce: ecommercePlans,
};

export const PRICING_TRUSTED_PARTNERS = {
  title: "OUR TRUSTED PARTNERS WORLDWIDE",
  titleLines: ["OUR TRUSTED PARTNERS WORLDW", "IDE"] as const,
  badges: [
    { src: "/pricing/partners/1.webp", alt: "UpCity Best of Michigan", width: 143, height: 149 },
    { src: "/pricing/partners/2.webp", alt: "Squarespace Partner Legend", width: 106, height: 105 },
    {
      src: "/pricing/partners/3.webp",
      alt: "Premier Squarespace Web Designer Award",
      width: 106,
      height: 101,
    },
    { src: "/pricing/partners/4.webp", alt: "Clutch Top Creative Agency", width: 86, height: 91 },
    {
      src: "/pricing/partners/5.webp",
      alt: "Best Rated Facebook Marketing Agencies 2023",
      width: 106,
      height: 105,
    },
    { src: "/pricing/partners/7.webp", alt: "Featured on UpCity", width: 202, height: 50 },
    { src: "/pricing/partners/8.webp", alt: "GoDaddy Pro Plus", width: 176, height: 56 },
    {
      src: "/pricing/partners/10.webp",
      alt: "Expertise Best Advertising Agencies 2020",
      width: 122,
      height: 96,
    },
    { src: "/pricing/partners/11.webp", alt: "Alignable Highly Recommended", width: 115, height: 87 },
    { src: "/pricing/partners/12.webp", alt: "Jobber Partner", width: 87, height: 87 },
    {
      src: "/pricing/partners/13.webp",
      alt: "Meta Certified Creative Strategy Professional",
      width: 92,
      height: 91,
    },
    { src: "/pricing/partners/14.webp", alt: "Best Search TOPSEOs", width: 106, height: 105 },
    { src: "/pricing/partners/15.webp", alt: "Yext", width: 57, height: 57 },
  ],
} as const;
