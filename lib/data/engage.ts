export const ENGAGE_HEADING = {
  titleLines: ["Engage, Inspire,", "Convert"],
} as const;

export type EngageGrowBlock = {
  id: string;
  subheadingLines: readonly string[];
  image: string;
  label: string;
  description: string;
};

export const ENGAGE_GROW_BLOCKS: EngageGrowBlock[] = [
  {
    id: "captivate",
    subheadingLines: [
      "Websites designed to captivate",
      "your audience and drive action.",
    ],
    image: "/engage/engage-3.webp",
    label: "All-in-One Solutions",
    description:
      "From e-commerce functionality to contact forms, our integrated features provide everything necessary to create a dynamic online presence.",
  },
  {
    id: "integrated-tools",
    subheadingLines: ["Integrated Tools that", "Drive Your Success"],
    image: "/engage/engage-4.webp",
    label: "Streamline Your Bookings",
    description:
      "With integrated scheduling features, managing appointments has never been easier. Keep your calendar organized and your clients happy.",
  },
] as const;

export type EngageFeatureRow = {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
};

export const ENGAGE_FEATURE_ROWS: EngageFeatureRow[] = [
  {
    id: "navigation",
    title: "Seamless Navigation for Enhanced User Experience",
    description:
      "Ensure your visitors enjoy a smooth journey on your site. Intuitive layouts and integrated features keep them engaged and coming back for more.",
    image: "/engage/engage-5.webp",
    imagePosition: "right",
  },
  {
    id: "invoices",
    title: "Effortlessly Manage Client Invoices",
    description:
      "Streamline your workflow with a seamless invoicing system tailored for service-based businesses. Track project statuses, monitor payment progress, and stay on top of important deadlines—all in one place. Focus on delivering quality projects without the hassle of complicated billing.",
    image: "/engage/engage-6.webp",
    imagePosition: "left",
  },
] as const;

export const ENGAGE_CTA = {
  label: "Get Started",
  href: "#contact",
} as const;
