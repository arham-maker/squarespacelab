export type LpPackage = {
  title: string;
  price: string;
  compareAt: string;
  discount: string;
  deliverables: string[];
};

export const LP_HERO = {
  title: "Build Your Dream Website with Squarespace starting at $199",
  lead:
    "Let us help you create a stunning, responsive website that reflects your brand and vision using the Squarespace platform.",
  trustLine:
    "⭐ Trusted by businesses to design high-performing Squarespace websites",
} as const;

export const LP_TRUSTED_LEFT = Array.from({ length: 6 }, (_, i) => i + 1);
export const LP_TRUSTED_RIGHT = Array.from({ length: 5 }, (_, i) => i + 7);

export const LP_INTRO = {
  title: "Find a Professional Squarespace Designer for Your Business",
  lead: "We design custom Squarespace websites that are fast, scalable, and built to support your business goals.",
  bullets: [
    ["Custom Squarespace design", "Conversion-focused UX"],
    ["Mobile Optimized", "SEO-friendly structure"],
  ],
} as const;

export const LP_PORTFOLIO_SLIDES = [1, 2, 3, 4, 5] as const;

export const LP_PORTFOLIO_GRID = [
  { src: "1.webp", href: "https://gilden-fluid-demo.squarespace.com" },
  { src: "2.webp", href: "https://cimen-fluid-demo.squarespace.com" },
  { src: "3.webp", href: "https://ortiz-fluid-demo.squarespace.com" },
  { src: "4.webp", href: "https://matsuya-fluid-demo.squarespace.com" },
  { src: "5.webp", href: "https://galena-fluid-demo.squarespace.com" },
  { src: "6.webp", href: "https://juniper-fluid-demo.squarespace.com" },
] as const;

export const LP_PROMOTIONAL_PACKAGES: LpPackage[] = [
  {
    title: "Essential Launch",
    price: "$199",
    compareAt: "$995",
    discount: "80% off !",
    deliverables: [
      "1-2 Page Website",
      "Modern Design Template",
      "Contact Form Setup",
      "Minimalist Layout",
      "Delivery In 1-2 Week",
    ],
  },
  {
    title: "Professional Starter",
    price: "$449",
    compareAt: "$2245",
    discount: "80% off !",
    deliverables: [
      "Everything In Essential Launch",
      "Up To 5 Custom-Designed Pages",
      "Newsletter Signup",
      "Stock Image Selection",
      "Google Analytics Setup",
      "Delivery In 2-3 Weeks",
    ],
  },
  {
    title: "Brand Builder",
    price: "$849",
    compareAt: "$4245",
    discount: "80% off !",
    deliverables: [
      "Everything In Professional Starter",
      "Up To 10 Pages",
      "Blog Integration",
      "Social Media Feed Setup",
      "Appointment Booking Setup",
      "Delivery In 2-4 Weeks",
    ],
  },
  {
    title: "Business Pro",
    price: "$1399",
    compareAt: "$6995",
    discount: "80% off !",
    deliverables: [
      "Everything In Brand Builder",
      "Up To 12 Pages",
      "Crm Integration (Mailchimp, Hubspot)",
      "Custom 404 Page",
      "Delivery In 2-4 Weeks",
    ],
  },
  {
    title: "Authority Plus",
    price: "$1899",
    compareAt: "$9495",
    discount: "80% off !",
    deliverables: [
      "Everything In Business Pro",
      "Up To 15 Pages",
      "Animated Elements",
      "Advanced Forms (Multi-Step, Conditional)",
      "Delivery In 3-5 Weeks",
    ],
  },
  {
    title: "Corporate Authority",
    price: "$2699",
    compareAt: "$13495",
    discount: "80% off !",
    deliverables: [
      "Everything In Authority Plus",
      "Unlimited Pages",
      "Membership/Portal Access (If Required)",
      "Multilingual Site Setup",
      "3 Months Free Maintenance",
      "Live Chat Setup",
      "Delivery In 3-6 Weeks",
    ],
  },
];

export const LP_ECOMMERCE_PACKAGES: LpPackage[] = [
  {
    title: "Store Starter",
    price: "$599",
    compareAt: "$2995",
    discount: "80% off !",
    deliverables: [
      "10 Product Uploads",
      "Payment Gateway Setup",
      "Contact Page",
      "Basic Checkout Flow",
    ],
  },
  {
    title: "Shop Builder",
    price: "$1199",
    compareAt: "$5995",
    discount: "50% off !",
    deliverables: [
      "Everything In Store Starter",
      "Up To 50 Products",
      "Tax & Shipping Setup",
      "Discount Coupon & Gift Card",
    ],
  },
  {
    title: "Commerce Pro",
    price: "$1899",
    compareAt: "$9495",
    discount: "50% off !",
    deliverables: [
      "Everything In Shop Builder",
      "Up To 125 Products",
      "Inventory Management Setup",
      "Abandoned Cart Email Setup",
      "Facebook/Instagram Store Integration",
    ],
  },
  {
    title: "Retail Growth",
    price: "$2799",
    compareAt: "$13995",
    discount: "50% off !",
    deliverables: [
      "Everything In Commerce Pro",
      "Up To 250 Products",
      "Blog For Content Marketing",
      "Advanced Product Filters",
    ],
  },
  {
    title: "Ecom Accelerator",
    price: "$3799",
    compareAt: "$18995",
    discount: "50% off !",
    deliverables: [
      "Everything In Retail Growth",
      "Up To 500 Products",
      "Subscription Product Setup",
      "Loyalty / Rewards Program",
      "Affiliate Tracking Setup",
    ],
  },
  {
    title: "Enterprise Commerce",
    price: "$5499",
    compareAt: "$27495",
    discount: "50% off !",
    deliverables: [
      "Everything In Ecom Accelerator",
      "Unlimited Products",
      "Wholesale Pricing Setup",
      "Multi-Language Store Setup",
      "3 Months Post-Launch Support",
    ],
  },
];

export const LP_PROCESS_STEPS = [
  {
    title: "Discovery & Planning",
    text: "We start by getting to know your business, goals, and target audience. Through in-depth consultation and research, we lay out a strategic plan that forms the foundation of your website.",
  },
  {
    title: "Design & Development",
    text: "Next, we will design and develop the website with your approval. Our development team ensures your site is not only visually stunning but also functional and user-friendly.",
  },
  {
    title: "Launch & Ongoing Support",
    text: "Once everything is perfect, we launch your website and ensure a smooth transition. But it doesn't end there—we provide ongoing support and maintenance to keep your site running optimally.",
  },
] as const;

export const LP_SERVICES = [
  {
    image: "ser1_1x.webp",
    title: "Template Customization",
    text: "We tailor Squarespace templates to your specific needs, making them unique to your brand.",
  },
  {
    image: "ser2_1x.webp",
    title: "Mobile Optimization",
    text: "Our mobile optimization ensures your site looks great and functions perfectly on any device.",
  },
  {
    image: "ser3_1x.webp",
    title: "Blog Integration",
    text: "Engage your audience with an integrated blog, complete with easy-to-use publishing tools.",
  },
  {
    image: "ser4_1x.webp",
    title: "Analytics & Performance Tracking",
    text: "Stay informed with integrated analytics to monitor your website's performance and user behavior.",
  },
  {
    image: "ser5_1x.webp",
    title: "SEO Optimization",
    text: "Enhance your search engine rankings and boost traffic with our tailored SEO services.",
  },
  {
    image: "ser6_1x.webp",
    title: "Maintenance & Support",
    text: "Get peace of mind with our ongoing support to keep your website running at peak performance.",
  },
] as const;

export const LP_COUNTERS = [
  { value: 75, label: "Faster Load", sub: "Time Improvement", duration: 1000 },
  { value: 60, label: "Increased Traffic", sub: "Visitor Growth", duration: 1200 },
  { value: 85, label: "User Satisfaction", sub: "Enhanced Experience", duration: 1400 },
] as const;

export const LP_FAQ_LEFT = [
  {
    q: "What is Squarespace, and how does it work?",
    a: "Squarespace is a user-friendly website builder that allows individuals and businesses to create professional websites without needing advanced technical skills.",
  },
  {
    q: "Why should I choose Squarespace for my website?",
    a: "Squarespace offers visually appealing templates, responsive design, and built-in features for e-commerce, SEO, and content management, making it an ideal choice for businesses.",
  },
  {
    q: "Can you help redesign my existing Squarespace site?",
    a: "Yes! We specialize in redesigning Squarespace websites to enhance functionality, improve design, and boost user experience.",
  },
  {
    q: "Will my Squarespace website be mobile-friendly?",
    a: "Absolutely! All of our Squarespace websites are fully responsive, ensuring they look great and function well on all devices.",
  },
  {
    q: "Do you provide SEO services for Squarespace websites?",
    a: "Yes, we implement SEO best practices to ensure your Squarespace website is optimized for search engines and can attract more organic traffic.",
  },
] as const;

export const LP_FAQ_RIGHT = [
  {
    q: "How long does it take to build a Squarespace website?",
    a: "The timeline varies depending on the project's complexity, but a standard website typically takes 4-6 weeks from start to launch.",
  },
  {
    q: "Can I update my Squarespace site on my own?",
    a: "Yes! Squarespace's intuitive interface makes it easy for you to make updates and manage content on your own. We also provide training if needed.",
  },
  {
    q: "Do you offer ongoing maintenance for Squarespace websites?",
    a: "Yes, we offer ongoing support and maintenance to keep your Squarespace website updated, secure, and running smoothly.",
  },
  {
    q: "What if I need custom functionality on my Squarespace site?",
    a: "We can integrate custom features and third-party tools to ensure your Squarespace site meets your specific needs.",
  },
] as const;

export const LP_ADVANTAGES = [
  { image: "adv1_1x.webp", title: "Fast & Friendly Support" },
  { image: "adv2_1x.webp", title: "Money-Back Guarantee" },
  { image: "adv3_1x.webp", title: "Unlimited Revisions" },
  { image: "adv4_1x.webp", title: "Mobile Responsive Designs" },
] as const;
