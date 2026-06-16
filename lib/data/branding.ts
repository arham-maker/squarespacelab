import type { PricingPlan } from "@/lib/data/pricing";

export const BRANDING_HERO = {
  label: "Custom",
  title: "Branding Solutions",
  descriptionLines: [
    "A successful brand starts with a solid strategy. We offer in-depth market research and analysis to identify your target audience, competitors, and market trends.",
    "Our tailored branding strategies will position your brand for growth and success in your industry.",
  ],
  cta: { label: "Get Started", href: "/contact" },
} as const;

export const BRANDING_INTRO = {
  titleLines: ["Why is Professional Branding", "Necessary for Your Business?"],
  subtitleLines: [
    "Stay Memorable, Even When You're Not",
    "Around",
  ],
  paragraph:
    "Weak branding can dilute your message and turn potential customers away. A vague or inconsistent brand identity may lead clients to question your professionalism and reliability, driving them to competitors with a clearer presence. Strong branding is not just a luxury; it's a necessity for success. Our branding services define your identity through:",
  bullets: [
    "A distinctive brand image that resonates with your audience",
    "Effective messaging that clearly communicates your values and mission",
    "A strong reputation that highlights the quality and trustworthiness of your business",
  ],
  closing:
    "A strong brand defines who you are and sets you apart in the market. If your brand doesn't fully represent your business, we can help create a unique brand identity that sells your image, along with your products and services.",
} as const;

export const BRANDING_PRICING_INTRO = {
  title: "Prices That Fit Your Budget",
  description:
    "Explore our budget-friendly options and find the perfect package for your brand.",
} as const;

export const BRANDING_PACKAGE_ICON = "/branding/11.webp";

export const BRANDING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    title: "Basic",
    price: "$347",
    originalPrice: "$1,735",
    discount: "80% off !",
    description: "Essential branding assets to establish your visual identity.",
    features: [
      "1 Stationery Design Set Concepts",
      "1 Flyer Design",
      "1 Banner Design Concept (any size)",
      "1 Brochure Design (Bi-fold/Tri-fold)",
      "2 Stock Photos",
      "T-Shirt Design (2 Concepts)",
      "Menu Card Design (2 Concepts)",
      "Free Social Media Banners (any 3)",
      "Free Email Signature",
      "Free Word Doc for Letterhead",
      "3 Revisions",
      "Turn Around 48-72 Hours",
      "Print Ready Formats",
    ],
  },
  {
    id: "startup",
    title: "Startup",
    price: "$497",
    originalPrice: "$2,485",
    discount: "80% off !",
    description: "Expanded concepts for growing brands ready to stand out.",
    features: [
      "2 Stationery Design Set Concepts",
      "2 Flyer Design",
      "2 Banner Design Concept (any size)",
      "2 Brochure Design concept (Bi-fold/Tri-fold)",
      "4 Stock Photos",
      "T-Shirt Design (3 Concepts)",
      "Menu Card Design (3 Concepts)",
      "Free Social Media Banners (any 5)",
      "Free Email Signature",
      "Free Word Doc for Letterhead",
      "4 Revisions",
      "Turn Around 48-72 Hours",
      "Print Ready Formats",
    ],
  },
  {
    id: "professional",
    title: "Professional",
    price: "$647",
    originalPrice: "$3,235",
    discount: "80% off !",
    description: "Complete branding package with unlimited revisions.",
    features: [
      "4 Stationery Design Set Concepts",
      "3 Flyer Design",
      "3 Banner Design Concept (any size)",
      "4 Brochure Design concept (Bi-fold/Tri-fold)",
      "5 Stock Photos",
      "T-Shirt Design (4 Concepts)",
      "Menu Card Design (4 Concepts)",
      "Free Social Media Banners (any 5)",
      "Free Email Signature",
      "Free Word Doc for Letterhead",
      "Unlimited Revisions",
      "Turn Around 48-72 Hours",
      "Print Ready Formats",
    ],
  },
];

export const BRANDING_PORTFOLIO_ITEMS = Array.from({ length: 8 }, (_, index) => {
  const id = index + 1;

  return {
    id: `branding-portfolio-${id}`,
    image: `/branding/portfolio/${id}.webp`,
    alt: `Branding portfolio sample ${id}`,
  };
});

export const BRANDING_STORY = {
  title: "Let Our Experts Craft Your Unique Brand Story—Unique, Engaging, and Memorable",
  description:
    "Are you ready to take your brand to the next level? When you work with our team, it feels like you've got your very own graphic designer by your side. We specialize in creating cohesive graphics that look great across all mediums—print, digital, and in-store. Plus, our quick turnaround time of just 24 to 72 hours means you won't be waiting long for your designs. With SquarespaceLab, your brand's unique personality can truly shine. Whether it's logos, business cards, brochures, or banners, we're here to bring your vision to life and make a real impact together.",
  highlight: "Be the Brand That Leaves a Lasting Impression Everywhere!",
  image: {
    src: "/branding/25.webp",
    alt: "Branding design showcase",
  },
} as const;
