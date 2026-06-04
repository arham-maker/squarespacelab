export type FormSubmissionType = "contact" | "get-started" | "package";

export type FormSubmissionPayload = {
  formType: FormSubmissionType;
  fields: Record<string, string>;
};
