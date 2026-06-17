import { LP_ASSETS } from "@/components/lp/lp-assets";

export const LP2_LEAD_FORM = {
  staticTitle: "Looking for a Professional Squarespace Website Solution?",
  staticLead: "Get in touch with our experts today.",
  packageLead: "Get in touch with our experts today.",
  image: {
    src: `${LP_ASSETS}/images/money-back-image.jpg`,
    alt: "Squarespace website consultation",
  },
  fields: {
    name: { placeholder: "Full Name *", name: "name" },
    email: { placeholder: "Email Address *", name: "email" },
    phone: { placeholder: "Phone Number *", name: "phone" },
    message: { placeholder: "Message (optional)", name: "message" },
  },
  submitLabel: "Get Started",
  thankYouPath: "/thankyou",
} as const;
