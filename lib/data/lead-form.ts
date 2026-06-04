import { SITE } from "@/lib/data/site";

export const LEAD_FORM = {
  title: "Get Your Custom",
  titleHighlight: "Squarespace Web Design",
  image: {
    src: "/get-started/popup-img.jpg",
    alt: "Squarespace web design consultation",
  },
  fields: {
    name: { placeholder: "Full Name", name: "fullName" },
    email: { placeholder: "Email Address", name: "email" },
    phone: { placeholder: "Phone Number", name: "phone" },
  },
  checkboxes: [
    {
      id: "lead-consent-marketing",
      name: "consentMarketing",
      label: `I provide my consent to receive B2B marketing communications from ${SITE.name}`,
    },
    {
      id: "lead-consent-sms",
      name: "consentSms",
      label:
        "Message and data rates may apply. Reply STOP to opt out. Text 'HELP' for help. 4 messages/month.",
    },
    {
      id: "lead-consent-terms",
      name: "consentTerms",
      label: "terms",
    },
  ],
  submitLabel: "Submit",
  thankYouPath: "/thankyou",
  termsHref: "/terms-and-conditions",
  privacyHref: "/privacy-policy",
} as const;
