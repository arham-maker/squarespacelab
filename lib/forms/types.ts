export type FormSubmissionType = "contact" | "get-started";

export type FormSubmissionPayload = {
  formType: FormSubmissionType;
  fields: Record<string, string>;
};
