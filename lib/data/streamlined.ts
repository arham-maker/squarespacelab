export type StreamlinedSlide = {
  id: string;
  title: string;
  image: string;
};

export type StreamlinedStep = {
  id: string;
  title: string;
  description: string;
};

export const STREAMLINED = {
  titleLines: ["Streamlined", "Solutions For", "Your Business"],
  subtitle: "A User-Friendly Platform That Puts You First.",
} as const;

export const STREAMLINED_SLIDES: StreamlinedSlide[] = [
  { id: "beauty", title: "Beauty", image: "/home/streamlined-beauty.webp" },
  { id: "fitness", title: "Fitness", image: "/home/streamlined-fitness.webp" },
  {
    id: "photography",
    title: "Photography",
    image: "/home/streamlined-photography.webp",
  },
] as const;

export const STREAMLINED_STEPS: StreamlinedStep[] = [
  {
    id: "share-requirements",
    title: "Share Your Requirements",
    description:
      "We start by understanding your needs and goals. Share your vision for the website, including your target audience and any specific features you want. This includes discussing your branding, style preferences, and essential functionalities. By gathering all this information, we ensure that the design aligns perfectly with your expectations. We aim to create a clear roadmap for the project so we can proceed confidently and effectively.",
  },
  {
    id: "design-development",
    title: "Design And Development",
    description:
      "Once we have gathered your requirements, our team begins the design and development phase. We will create a customized website that reflects your brand and meets your needs. During this phase, we focus on layout, color schemes, and user experience. You will have the opportunity to review initial designs and provide feedback. Our developers will ensure that the website is functional, mobile-friendly, and optimized for performance.",
  },
  {
    id: "finalize-launch",
    title: "Finalize And Launch",
    description:
      "We will review the website together to ensure everything meets your expectations. You can suggest any last-minute changes, which we'll address promptly. Once you are satisfied with the final product, we will prepare for launch. This includes testing all features to ensure they work correctly. After final approval, we will make your website live. We'll also guide you in managing your site and provide ongoing support as needed.",
  },
] as const;
