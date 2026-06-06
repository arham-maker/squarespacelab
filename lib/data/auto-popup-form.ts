import { LEAD_FORM } from "@/lib/data/lead-form";

export const AUTO_POPUP_FORM = {
  title: LEAD_FORM.title,
  titleHighlight: LEAD_FORM.titleHighlight,
  image: LEAD_FORM.image,
  fields: {
    name: LEAD_FORM.fields.name,
    phone: LEAD_FORM.fields.phone,
    email: LEAD_FORM.fields.email,
    message: { placeholder: "Message (optional)", name: "message" },
  },
  submitLabel: LEAD_FORM.submitLabel,
  thankYouPath: LEAD_FORM.thankYouPath,
  delayMs: 30_000,
  sessionStorageKey: "squarespacedev-auto-popup-seen",
  excludedPaths: ["/lp", "/thankyou"],
} as const;
