export const SOCIAL_MEDIA_HERO = {
  label: "Expert",
  title: "Social Media Marketing Services",
  description:
    "We help you find, engage, and convert your target audience on social media.",
} as const;

export const SOCIAL_MEDIA_BENEFITS = {
  titleLines: ["How Does SMM", "Benefit You?"],
  bullets: [
    "Reach and attract a larger audience by being active on social platforms.",
    "Interact with your audience directly and build strong, lasting relationships.",
    "Turn followers into customers through targeted, persuasive social media campaigns.",
    "Consistent engagement and content strengthen customer trust and loyalty.",
  ],
} as const;

export const SOCIAL_MEDIA_SERVICES = [
  {
    id: "strategy",
    title: "Social Media Strategy Development",
    description:
      "A successful social media presence starts with a clear plan. Our team analyzes your goals and audience to craft a strategy that aligns with your brand. We consider what content will resonate, which platforms to focus on, and how to schedule posts for maximum impact.",
  },
  {
    id: "content",
    title: "Content Creation and Management",
    description:
      "From eye-catching images to engaging captions, we create content that brings your brand's personality to life. We manage your content calendar, ensuring your posts are consistent, relevant, and optimized to build an engaging presence across all platforms.",
  },
  {
    id: "advertising",
    title: "Social Media Advertising",
    description:
      "Amplify your reach and get your message to the right people with paid social ads. We create targeted ad campaigns that drive visibility, engagement, and conversions. Each ad is carefully designed to capture attention and deliver results.",
  },
  {
    id: "community",
    title: "Community Engagement and Management",
    description:
      "Social media is a two-way street, and engaging with followers is key. Our team actively monitors and engages with your audience, responding to comments, answering questions, and building a positive brand reputation that keeps customers coming back.",
  },
] as const;

export const SOCIAL_MEDIA_WHY = {
  titleLines: ["Why Choose", "Us?"],
  description:
    "Ready to elevate your brand on social media? We specialize in marketing that speaks directly to your unique voice and goals. We believe in more than just posting content — we build strategies that engage, grow, and convert. From personalized content to targeted advertising, our team ensures every move boosts your visibility and builds real connections with your audience.",
  image: {
    src: "/social-media/28.webp",
    alt: "Social media marketing strategy preview",
  },
} as const;

export const SOCIAL_MEDIA_CTA = {
  title: "Let's Start Social Media Marketing",
  highlight: "It's time to reach your ideal audience.",
  description: "Get started with social media marketing that drives real results.",
  cta: { label: "Chat with an Expert", href: "/contact" },
} as const;
