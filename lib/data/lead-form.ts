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
  submitLabel: "Submit",
  thankYouPath: "/thankyou",
} as const;
