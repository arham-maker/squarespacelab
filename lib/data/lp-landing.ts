import type { LpPackage } from "@/lib/data/lp";
import { SITE } from "@/lib/data/site";

export const LP_LANDING_CONTACT = {
  phone: SITE.phone,
  phoneHref: SITE.phoneHref,
  email: SITE.email,
  emailHref: SITE.emailHref,
  brand: "SquarespaceLab",
} as const;

export const LP_LANDING_HERO = {
  eyebrow: "Elevate Your Website on Squarespace",
  title: "Hire Squarespace Website Designer in the USA",
  lead: "Your website should feel like your brand, not a recycled template. Our Squarespace designers create custom websites that are easy to use, visually clear, and built around your business goals. Everything is designed with intention, from layout to content flow.",
} as const;

export const LP_LANDING_INTRO = {
  title: "Find A Squarespace Designer For Your Business",
  lead: "We create tailored Squarespace websites that load quickly, scale smoothly, and align with what your business needs to grow.",
  bullets: [
    "Custom Squarespace design",
    "Conversion-focused UX",
    "Mobile Optimized",
  ],
} as const;

export const LP_LANDING_PORTFOLIO = {
  title: "Designed by Squarespace Designers Who Understand Brands",
  lead: "Take a look at some of our recent Squarespace projects. Each site is thoughtfully designed, easy to navigate, and built with purpose. We focus on creating websites that feel good to use and help your business move forward, not just look nice on screen.",
} as const;

export const LP_LANDING_PORTFOLIO_ROW1 = [
  "p10.webp",
  "p11.webp",
  "p12.webp",
  "p13.webp",
  "p14.webp",
] as const;

export const LP_LANDING_PORTFOLIO_ROW2 = [
  "p14.webp",
  "p15.webp",
  "p16.webp",
  "p17.webp",
  "p18.webp",
] as const;

export type LpLandingPackage = LpPackage & {
  description: string;
};

export const LP_LANDING_PROMOTIONAL_PACKAGES: LpLandingPackage[] = [
  {
    title: "Quick Launch",
    price: "$199",
    compareAt: "$1000",
    discount: "80% Off",
    description: "Get online fast with a professional designer.",
    deliverables: [
      "1-2 Pages",
      "Squarespace Modern Template Setup",
      "Basic Branding (Colors & Fonts Applied)",
      "Contact Form Setup",
      "Delivery 1-2 Weeks",
    ],
  },
  {
    title: "Startup Spark",
    price: "$499",
    compareAt: "$2495",
    discount: "80% Off",
    description: "Choose the design that best represents your brand.",
    deliverables: [
      "Everything in Quick Launch, plus:",
      "Up to 5 Pages",
      "Custom Layout Adjustments",
      "Mobile + Tablet Optimized",
      "Speed Optimization",
      "Delivery 2-3 Weeks",
    ],
  },
  {
    title: "Growth Builder",
    price: "$899",
    compareAt: "$4495",
    discount: "80% Off",
    description: "Double the expertise for a conversion-focused site.",
    deliverables: [
      "Everything in Startup Spark, plus:",
      "Up to 8 Pages",
      "Conversion-Focused Structure & CTAs",
      "Email Integration (Mailchimp / Flodesk etc.)",
      "Analytics Setup",
      "Delivery 2-4 Weeks",
    ],
  },
  {
    title: "Professional Presence",
    price: "$1499",
    compareAt: "$7495",
    discount: "80% Off",
    description: "Your brand elevated with professional UX strategy.",
    deliverables: [
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
    title: "Membership Platform",
    price: "$2499",
    compareAt: "$12495",
    discount: "80% Off",
    description: "Designed to position you as an industry leader.",
    deliverables: [
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
    title: "Industry Leader",
    price: "$3999",
    compareAt: "$19995",
    discount: "80% Off",
    description: "White-glove design. Unlimited possibilities.",
    deliverables: [
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

export const LP_LANDING_ECOMMERCE_PACKAGES: LpLandingPackage[] = [
  {
    title: "Store Kickoff",
    price: "$399",
    compareAt: "$1995",
    discount: "80% Off",
    description: "Get your store online fast with a professional touch.",
    deliverables: [
      "Up to 5 Products",
      "Modern Layout",
      "Checkout & Payment Setup",
    ],
  },
  {
    title: "Store Starter",
    price: "$699",
    compareAt: "$3495",
    discount: "80% Off",
    description: "Two layouts + one winner - designed to sell.",
    deliverables: [
      "Everything in Store Kickoff, plus:",
      "Up to 10 Products",
      "Mobile + Tablet Optimized",
      "Custom Store Layout & Categories",
      "Conversion-Ready Checkout",
      "Inventory Setup",
    ],
  },
  {
    title: "Sales Booster",
    price: "$1099",
    compareAt: "$5495",
    discount: "80% Off",
    description: "Double the expertise for higher sales.",
    deliverables: [
      "Everything in Store Starter, plus:",
      "Up to 25 Products",
      "Custom Product Pages + UX Optimization",
      "Shipping & Tax Setup",
      "Upsell & Cross-Sell Features",
      "Analytics Integration",
    ],
  },
  {
    title: "Ecommerce Pro",
    price: "$1599",
    compareAt: "$7995",
    discount: "80% Off",
    description: "Professional team + advanced UX for serious growth.",
    deliverables: [
      "Everything in Sales Booster, plus:",
      "Up to 50 Products",
      "Coupons & Discounts Setup",
      "Conversion-Focused Product Pages",
      "Email Automation Setup",
      "Priority Support",
    ],
  },
  {
    title: "Store Authority",
    price: "$2199",
    compareAt: "$10995",
    discount: "80% Off",
    description: "Designed for scaling and dominating your niche.",
    deliverables: [
      "Everything in Ecommerce Pro, plus:",
      "Unlimited Products",
      "Advanced Automation & Abandoned Cart Flows",
      "Speed & Performance Optimization",
      "Analytics & Reporting",
    ],
  },
  {
    title: "Ecommerce Empire",
    price: "$3199",
    compareAt: "$15995",
    discount: "80% Off",
    description: "Elite team + white-glove ecommerce execution.",
    deliverables: [
      "Everything in Store Authority, plus:",
      "Enterprise-Level Store Build",
      "Memberships / Subscriptions",
      "Full CRO Strategy",
      "Dedicated Project Manager",
    ],
  },
];

export const LP_LANDING_REDESIGN_PACKAGES: LpLandingPackage[] = [
  {
    title: "Quick Refresh",
    price: "$249",
    compareAt: "$1245",
    discount: "80% Off",
    description: "Fast visual refresh. Real designer at work.",
    deliverables: ["Redesign 2 Pages", "Modern Layout", "CTA Improvements"],
  },
  {
    title: "Modern Makeover",
    price: "$449",
    compareAt: "$2245",
    discount: "80% Off",
    description: "Two options + one winner - modern & conversion-friendly.",
    deliverables: [
      "Everything in Quick Refresh, plus:",
      "Redesign 4 Pages",
      "Navigation & Layout Cleanup",
      "Mobile + Tablet Optimized",
    ],
  },
  {
    title: "Conversion Reset",
    price: "$749",
    compareAt: "$3745",
    discount: "80% Off",
    description: "Designer + UX expert team for measurable results.",
    deliverables: [
      "Everything in Modern Makeover, plus:",
      "Redesign 6 Pages",
      "Lead Capture Forms & CTA Strategy",
      "Speed Optimization",
    ],
  },
  {
    title: "Redesign Pro",
    price: "$1149",
    compareAt: "$5745",
    discount: "80% Off",
    description: "Strategic redesign for professional impact.",
    deliverables: [
      "Everything in Conversion Reset, plus:",
      "Redesign Up to 10 Pages",
      "Conversion-Focused UX",
      "Speed & Performance Optimization",
      "Analytics Setup",
    ],
  },
  {
    title: "Brand Reinvention",
    price: "$1699",
    compareAt: "$8495",
    discount: "80% Off",
    description: "Full redesign for maximum authority & credibility.",
    deliverables: [
      "Everything in Redesign Pro, plus:",
      "Up to 12 Pages",
      "Advanced UX Funnels & Custom Branding",
    ],
  },
  {
    title: "Digital Domination",
    price: "$2399",
    compareAt: "$11995",
    discount: "80% Off",
    description: "Elite-level redesign. White-glove service.",
    deliverables: [
      "Everything in Brand Reinvention, plus:",
      "Unlimited Pages",
      "Full UX/UI Overhaul + CRO Strategy",
      "Dedicated Project Manager",
    ],
  },
];

export const LP_LANDING_PROCESS = [
  {
    title: "Discovery & Planning",
    text: "At this stage, our squarespace designers team takes time to understand your business, goals, and audience. Through focused discussions and research, we create a clear plan that guides the entire project.",
  },
  {
    title: "Design & Development",
    text: "With the strategy in place, our squarespace website developer build your website step by step. Every detail is crafted to look great, function smoothly, and deliver a seamless user experience.",
  },
  {
    title: "Launch & Ongoing Support",
    text: "After final approvals, we launch your website with care. We also provide ongoing support and maintenance to ensure your site stays updated and performs at its best.",
  },
] as const;

export const LP_LANDING_SERVICES = [
  {
    image: "ser1_1x.webp",
    title: "Template Customization",
    text: "We customize Squarespace templates to match your brand identity and business goals. From layouts and colors to fonts and visuals, every element is refined to create a website that feels uniquely yours.",
  },
  {
    image: "ser2_1x.webp",
    title: "Mobile Optimization",
    text: "Your website is fully optimized for mobile, tablet, and desktop users. We ensure fast load times, smooth navigation, and a consistent experience across all screen sizes so visitors can engage effortlessly.",
  },
  {
    image: "ser3_1x.webp",
    title: "Blog Integration",
    text: "We set up a seamless blog experience that makes publishing simple and engaging. With intuitive tools, clean layouts, and optimized structure, you can easily share updates, articles, and insights with your audience.",
  },
  {
    image: "ser4_1x.webp",
    title: "Analytics & Performance Tracking",
    text: "We integrate powerful analytics tools to help you track traffic, user behavior, and performance metrics. This allows you to understand how visitors interact with your site and make informed decisions to improve results.",
  },
  {
    image: "ser5_1x.webp",
    title: "SEO Optimization",
    text: "Improve your visibility on search engines with SEO strategies built specifically for your Squarespace website. We optimize site structure, on page content, and technical elements to help attract the right traffic and support long term growth.",
  },
  {
    image: "ser6_1x.webp",
    title: "Maintenance & Support",
    text: "Keep your website running smoothly with reliable ongoing support. From updates and performance checks to troubleshooting and improvements, we ensure your site stays secure, fast, and fully functional at all times.",
  },
] as const;

export const LP_LANDING_FAQ = [
  {
    q: "What is Squarespace, and how does it work?",
    a: "Squarespace is an all-in-one website building platform that allows you to create beautiful, functional websites without needing to code. It provides customizable templates, drag-and-drop tools, and built-in hosting, making it easy to launch a professional-looking site quickly. You can manage your content, design, and e-commerce features all in one place.",
  },
  {
    q: "Why should I choose Squarespace for my website?",
    a: "Squarespace offers a user-friendly interface, stunning templates, and seamless integration of design and functionality. It's ideal for businesses or individuals looking for a clean, professional website without the complexity of coding. Whether you're creating a blog, portfolio, or online store, Squarespace's all-in-one solution ensures your website is both easy to manage and visually appealing.",
  },
  {
    q: "Can your Squarespace designers help redesign my existing Squarespace site?",
    a: "Absolutely! We specialize in redesigning existing Squarespace websites, improving both design and functionality. Whether you need a complete overhaul or a few updates to refresh your site, our team will work with you to enhance your online presence and ensure your website aligns with your current goals.",
  },
  {
    q: "Will my Squarespace website be mobile-friendly?",
    a: "Yes! Every website built on Squarespace is automatically mobile-optimized. This means your site will look great and function perfectly on smartphones and tablets without any additional work on your end. We also ensure that the design and layout are responsive to create the best experience for mobile visitors.",
  },
  {
    q: "Do you provide SEO services for Squarespace websites?",
    a: "Yes, we offer comprehensive SEO services for Squarespace websites. We'll optimize your site's content, meta tags, images, and overall structure to help you rank higher on search engines, drive organic traffic, and improve visibility. Our SEO strategies are designed to help your site get noticed by the right audience.",
  },
] as const;

export const LP_LANDING_ADVANTAGES = [
  { image: "adv1_1x.webp", title: "Rapid & Thorough Support" },
  { image: "adv4_1x.webp", title: "Mobile-Responsive Design" },
  { image: "adv2_1x.webp", title: "Money-Back Guarantee" },
] as const;

export const LP_LANDING_DISCLAIMER =
  'SquarespaceLab is an independent company that provides design and development services for e-commerce solutions. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Squarespace, or any of its subsidiaries or affiliates. The name "Squarespace" as well as related names, marks, emblems, and images are registered trademarks of their respective owners.';
