export type FormSubmissionType =
  | "contact"
  | "get-started"
  | "package"
  | "auto-popup";

export type FormSubmissionPayload = {
  formType: FormSubmissionType;
  fields: Record<string, string>;
};
