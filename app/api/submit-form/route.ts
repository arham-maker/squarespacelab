import { sendFormEmail } from "@/lib/forms/send-form-email";
import type { FormSubmissionPayload } from "@/lib/forms/types";

function isValidPayload(body: unknown): body is FormSubmissionPayload {
  if (!body || typeof body !== "object") return false;

  const record = body as Record<string, unknown>;
  const formType = record.formType;
  const fields = record.fields;

  if (
    formType !== "contact" &&
    formType !== "get-started" &&
    formType !== "package"
  ) {
    return false;
  }
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    return false;
  }

  return Object.values(fields).every((value) => typeof value === "string");
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isValidPayload(body)) {
      return Response.json({ error: "Invalid form data." }, { status: 400 });
    }

    const email = body.fields.email?.trim();
    if (!email) {
      return Response.json({ error: "Email is required." }, { status: 400 });
    }

    await sendFormEmail(body);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Form submission failed:", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to submit form. Please try again.",
      },
      { status: 500 }
    );
  }
}
