export type TemplateCategory = {
  id: string;
  label: string;
  image: string;
};

/** Reference template preview dimensions (squarespacemasters.com). */
export const TEMPLATE_PREVIEW_WIDTH = 1057;
export const TEMPLATE_PREVIEW_HEIGHT = 680;

/** Template categories from https://www.squarespacemasters.com/ */
export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "online-store",
    label: "Online Store",
    image: "/templates/online-store.webp",
  },
  {
    id: "local-business",
    label: "Local Business",
    image: "/templates/local-business.webp",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    image: "/templates/portfolio.webp",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    image: "/templates/restaurant.webp",
  },
  {
    id: "services",
    label: "Services",
    image: "/templates/services.webp",
  },
  {
    id: "personal-cv",
    label: "Personal & CV",
    image: "/templates/personal-cv.webp",
  },
  {
    id: "courses",
    label: "Courses",
    image: "/templates/courses.webp",
  },
  {
    id: "memberships",
    label: "Memberships",
    image: "/templates/memberships.webp",
  },
];

export const TEMPLATES_INTRO = {
  titleLines: [
    "Customized Website Templates For Every Need",
    "For Every Purpose",
  ],
  description:
    "Explore a wide range of Squarespace templates crafted to suit any purpose. Each template offers modern designs and customizable layouts, ensuring a unique online presence.",
  cta: { label: "Get Started", href: "#contact" },
} as const;
