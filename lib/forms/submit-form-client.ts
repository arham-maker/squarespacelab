import type { FormSubmissionPayload } from "@/lib/forms/types";

export async function submitForm(payload: FormSubmissionPayload): Promise<void> {
  const response = await fetch("/api/submit-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error ?? "Unable to submit form. Please try again.");
  }
}

export function getFormString(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function getFormCheckbox(formData: FormData, name: string): string {
  return formData.get(name) === "on" ? "Yes" : "No";
}
