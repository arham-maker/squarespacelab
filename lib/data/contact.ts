export const CONTACT_HERO = {
  title: "Get in Touch with Us",
  subtitle: "We'd love to hear from you.",
} as const;

export const CONTACT_PARTNER_LOGOS = [
  {
    id: "upcity",
    src: "/contact/partners/upcity.png",
    alt: "Featured on UpCity",
    width: 210,
    height: 50,
  },
  {
    id: "hudsonville",
    src: "/contact/partners/hudsonville.png",
    alt: "Hudsonville Area Chamber of Commerce",
    width: 197,
    height: 66,
  },
  {
    id: "fort-myers",
    src: "/contact/partners/fort-myers.png",
    alt: "Greater Fort Myers Chamber of Commerce",
    width: 91,
    height: 114,
  },
] as const;

export const CONTACT_FORM = {
  title: "Collaborate with Our Experts Today",
  description:
    "Whether you have questions or need support, we're here to help you every step of the way. Complete the form below, and we promise to respond within 24 hours.",
  submitLabel: "Submit",
  termsHref: "/terms-and-conditions",
  privacyHref: "/privacy",
} as const;
