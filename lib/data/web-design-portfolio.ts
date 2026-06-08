export const WEB_DESIGN_PORTFOLIO_TABS = [
  { id: "all", label: "All" },
  { id: "auto-repair", label: "Auto Repair" },
  { id: "body-shop", label: "Body Shop" },
  { id: "construction", label: "Construction" },
  { id: "real-estate", label: "Real Estate" },
  { id: "home-services", label: "Home Services" },
  { id: "health-services", label: "Health Services" },
] as const;

export type WebDesignPortfolioTabId =
  (typeof WEB_DESIGN_PORTFOLIO_TABS)[number]["id"];

export type WebDesignPortfolioCategory =
  | "auto-repair"
  | "body-shop"
  | "construction"
  | "ecommerce"
  | "health-services"
  | "home-services"
  | "real-estate";

export type WebDesignPortfolioItem = {
  id: string;
  title: string;
  category: WebDesignPortfolioCategory;
  categoryLabel: string;
  image: string;
  width: number;
  height: number;
  alt: string;
};

export const WEB_DESIGN_PORTFOLIO_ITEMS: WebDesignPortfolioItem[] = [
  {
    id: "detailing-division",
    title: "Detailing Division",
    category: "auto-repair",
    categoryLabel: "Auto Repair",
    image: "/portfolio/detailing-division.webp",
    width: 1920,
    height: 7835,
    alt: "Detailing Division website design preview",
  },
  {
    id: "glow-girl",
    title: "Glow Girl",
    category: "body-shop",
    categoryLabel: "Body Shop",
    image: "/portfolio/glow-girl.webp",
    width: 1440,
    height: 5600,
    alt: "Glow Girl website design preview",
  },
  {
    id: "constructo",
    title: "Construction",
    category: "construction",
    categoryLabel: "Constructions",
    image: "/portfolio/constructo.webp",
    width: 2880,
    height: 11862,
    alt: "Construction website design preview",
  },
  {
    id: "5-trees",
    title: "5Trees",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    image: "/portfolio/5-trees-clothing.webp",
    width: 1920,
    height: 7171,
    alt: "5Trees website design preview",
  },
  {
    id: "axis-care",
    title: "Axiscare",
    category: "health-services",
    categoryLabel: "Health Services",
    image: "/portfolio/axis-care.webp",
    width: 640,
    height: 3974,
    alt: "Axiscare website design preview",
  },
  {
    id: "green-cleaning",
    title: "Green Cleaning",
    category: "home-services",
    categoryLabel: "Home Services",
    image: "/portfolio/green-cleaning.webp",
    width: 1920,
    height: 10126,
    alt: "Green Cleaning website design preview",
  },
  {
    id: "bee-home",
    title: "Beehome",
    category: "real-estate",
    categoryLabel: "Real Estate",
    image: "/portfolio/bee-home.webp",
    width: 1440,
    height: 6014,
    alt: "Beehome website design preview",
  },
  {
    id: "divine-works",
    title: "Divine Works",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    image: "/portfolio/divine-works-360.webp",
    width: 1920,
    height: 8603,
    alt: "Divine Works website design preview",
  },
  {
    id: "full-spectrum",
    title: "Full Spectrum",
    category: "auto-repair",
    categoryLabel: "Auto Repairs",
    image: "/portfolio/full-spectrum-detail.webp",
    width: 1600,
    height: 5866,
    alt: "Full Spectrum website design preview",
  },
];

export function getWebDesignPortfolioItemsForTab(
  tabId: WebDesignPortfolioTabId
): WebDesignPortfolioItem[] {
  if (tabId === "all") {
    return WEB_DESIGN_PORTFOLIO_ITEMS;
  }

  return WEB_DESIGN_PORTFOLIO_ITEMS.filter((item) => item.category === tabId);
}
