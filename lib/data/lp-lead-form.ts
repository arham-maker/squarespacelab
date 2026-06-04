import { LP_ASSETS } from "@/components/lp/lp-assets";

export const LP_LEAD_FORM = {
  title: "Work with expert Squarespace designers",
  image: {
    src: `${LP_ASSETS}/images/money-back-image_1x.webp`,
    alt: "Squarespace design consultation",
  },
  fields: {
    name: { placeholder: "Your Full Name*", name: "fullName" },
    email: { placeholder: "Email Address*", name: "email" },
    phone: { placeholder: "Phone Number*", name: "phone" },
    industry: { placeholder: "Business Industry", name: "businessIndustry" },
  },
  submitLabel: "Get Started Now!",
  thankYouPath: "/thankyou",
} as const;

export const LP_PHONE_COUNTRIES = [
  { dial: "+1", label: "US" },
  { dial: "+92", label: "PK" },
  { dial: "+44", label: "UK" },
  { dial: "+61", label: "AU" },
  { dial: "+91", label: "IN" },
] as const;
