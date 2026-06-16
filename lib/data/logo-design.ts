import type { PricingPlan } from "@/lib/data/pricing";

export const LOGO_DESIGN_HERO = {
  label: "Get a Logo Design",
  title: "That Tells Your Story!",
  description:
    "Every brand has a story to tell, and your logo should reflect that. Our design team specializes in creating logos that convey your brand's message and values. Ready to get started?",
  cta: { label: "Get In Touch", href: "/contact" },
} as const;

export const LOGO_DESIGN_PACKAGE_ICON = "/logo-design/11.webp";

export const LOGO_DESIGN_INTRO_IMAGES = [
  {
    src: "/logo-design/19.webp",
    alt: "Professional logo design concept preview",
  },
  {
    src: "/logo-design/20.webp",
    alt: "Brand logo design showcase",
  },
] as const;

export const LOGO_DESIGN_INTRO = {
  titleLines: ["Why is a", "Professional Logo", "Design Necessary?"],
  paragraphs: [
    "A poorly crafted logo can send the wrong message, undermining trust and damaging first impressions. This can lead potential customers to question your brand's quality, causing you to lose business to competitors who present themselves better. A professionally designed logo is the cornerstone of your brand identity.",
    'If "first impressions are everything," then a powerful logo is essential for leaving a lasting impact. An eye-catching logo doesn\'t just look good; it instantly communicates your values and uniqueness. A professionally designed logo for your business should:',
  ],
  bullets: [
    "Clearly reflect your business identity and core message",
    "Be memorable, unique, and professional",
    "Inspire trust and encourage customer loyalty",
    "Stand out across all platforms and materials, from business cards to websites",
  ],
} as const;

export const LOGO_DESIGN_PRICING_INTRO = {
  title: "Prices That Fit Your Budget",
  description:
    "Explore our budget-friendly options and find the perfect package for your brand.",
} as const;

export const LOGO_DESIGN_PLANS: PricingPlan[] = [
  {
    id: "basic",
    title: "Basic",
    price: "$29",
    originalPrice: "$145",
    discount: "80% off !",
    description: "Get started with professional logo concepts.",
    features: [
      "3 Logo Design Concepts",
      "3 Revisions",
      "1 Dedicated Designer",
      "Free Color Options",
      "Free Grayscale Format",
      "24 to 48 hours TAT",
      "All File Formats (webp, JPG)",
      "100% Ownership Rights",
      "100% Money Back Guarantee",
    ],
  },
  {
    id: "startup",
    title: "Startup",
    price: "$69",
    originalPrice: "$345",
    discount: "80% off !",
    description: "More concepts and unlimited revisions for growing brands.",
    features: [
      "5 Logo Design Concepts",
      "Unlimited Revisions",
      "2 Dedicated Designers",
      "Free Color Options",
      "Free Grayscale Format",
      "Free Icon",
      "24 To 48 Hours TAT",
      "All File Formats (Ai, PSD, EPS, webp, JPG, PDF)",
      "100% Ownership Rights",
      "100% Money Back Guarantee",
    ],
  },
  {
    id: "professional",
    title: "Professional",
    price: "$119",
    originalPrice: "$595",
    discount: "80% off !",
    description: "Stationery design and website savings included.",
    features: [
      "8 Logo Design Concepts",
      "Unlimited Revisions",
      "3 Dedicated Designers",
      "Free Stationery Design (Business Card, Letterhead, Envelope)",
      "Free Icon",
      "Free Color Options",
      "Free Grayscale Format",
      "24 To 48 Hours TAT",
      "$50 Off On Website Order",
      "All File Formats (Ai, PSD, EPS, webp, JPG, PDF)",
      "100% Ownership Rights",
      "100% Money Back Guarantee",
    ],
  },
  {
    id: "business",
    title: "Business",
    price: "$199",
    originalPrice: "$995",
    discount: "80% off !",
    description: "Unlimited concepts with social media designs.",
    features: [
      "Unlimited Logo Design Concepts",
      "Unlimited Revisions",
      "4 Dedicated Designers",
      "Free Stationery Design (Business Card, Letterhead, Folder, Envelopes)",
      "Social Media Designs",
      "Free Color Options",
      "Free Grayscale Format",
      "$50 Off On Website Order",
      "Free Icon",
      "24 To 48 Hours TAT",
      "All File Formats (Ai, PSD, EPS, webp, JPG, PDF)",
      "100% Ownership Rights",
      "100% Money Back Guarantee",
    ],
  },
  {
    id: "business-plus",
    title: "Business Plus",
    price: "$299",
    originalPrice: "$1495",
    discount: "80% off !",
    description: "Corporate brochure and expanded design support.",
    features: [
      "Unlimited Logo Design Concepts",
      "Unlimited Revisions",
      "6 Dedicated Designers",
      "Free Stationery Design (Business Card, Letterhead, Folder, Envelopes)",
      "Free Corporate Brochure (2 Pages)",
      "Social Media Designs",
      "$50 Off On Website Order",
      "Free Color Options",
      "Free Grayscale Format",
      "24 To 48 Hours TAT",
      "All File Formats (Ai, PSD, EPS, webp, JPG, PDF)",
      "100% Ownership Rights",
      "100% Money Back Guarantee",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    price: "$499",
    originalPrice: "$2495",
    discount: "80% off !",
    description: "Full brand package with website and dedicated support.",
    features: [
      "Unlimited Logo Design Concepts",
      "Unlimited Revisions",
      "3 Dedicated Design Teams",
      "Free Stationery Design (Business Card, Letterhead, Envelope, Compliment Slip)",
      "Complete Brochure (4 Pages)",
      "Flyer/Brochure Design",
      "3 Pages Custom Website Design",
      "Social Media Designs",
      "Free Email Signature",
      "Free Fav Icon",
      "Dedicated Account Manager",
      "Free Color Options",
      "Free Grayscale Format",
      "24 To 48 Hours TAT",
      "All File Formats (Ai, PSD, EPS, webp, JPG, PDF)",
      "100% Ownership Rights",
      "100% Money Back Guarantee",
    ],
  },
];

export const LOGO_DESIGN_TESTIMONIAL = {
  quote:
    "Right from the beginning to the very end, my experience with SquarespaceLab was incredible. They really listen to you and give you what YOU WANT. The team is ever helpful and supportive whenever I hit them up for any guidance or updates. They created a logo that perfectly embodies my business's personality and mission. I am 100% satisfied.",
  image: {
    src: "/logo-design/21.webp",
    alt: "Logo design client showcase",
  },
} as const;

export const LOGO_DESIGN_PORTFOLIO_ITEMS = Array.from({ length: 8 }, (_, index) => {
  const id = index + 1;

  return {
    id: `logo-portfolio-${id}`,
    image: `/logo-design/portfolio/${id}.webp`,
    alt: `Logo design portfolio sample ${id}`,
  };
});
