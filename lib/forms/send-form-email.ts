import { FORM_RECIPIENT_EMAIL } from "@/lib/data/forms";
import {
  buildFormEmailHtml,
  buildFormEmailSubject,
  buildFormEmailText,
  getFormEmailLogoAttachment,
} from "@/lib/forms/form-email-template";
import type { FormSubmissionPayload } from "@/lib/forms/types";
import fs from "node:fs";

function getRecipientEmail(): string {
  return process.env.FORM_RECIPIENT_EMAIL?.trim() || FORM_RECIPIENT_EMAIL;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure =
    process.env.SMTP_SECURE === "true" || port === 465;

  return { host, user, pass, port, secure };
}

function smtpIsConfigured(): boolean {
  return getSmtpConfig() !== null;
}

function formatSmtpError(error: unknown): string {
  const err = error as { code?: string; responseCode?: number };

  if (err.code === "EAUTH" || err.responseCode === 535) {
    return "SMTP login failed. Use your full email as SMTP_USER, wrap SMTP_PASSWORD in quotes if it contains # or =, and confirm the webmail password in Mail Configuration.";
  }

  return error instanceof Error
    ? error.message
    : "Unable to send email. Please try again.";
}

function getLogoAttachment() {
  const attachment = getFormEmailLogoAttachment();
  if (!fs.existsSync(attachment.path)) return undefined;
  return attachment;
}

async function sendViaSmtp(payload: FormSubmissionPayload): Promise<void> {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error("SMTP is not configured.");
  }

  const nodemailer = await import("nodemailer");
  const logoAttachment = getLogoAttachment();

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure && config.port === 587,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  const recipient = getRecipientEmail();
  const text = buildFormEmailText(payload);
  const html = buildFormEmailHtml(payload);
  const attachments = logoAttachment ? [logoAttachment] : undefined;
  const subject = buildFormEmailSubject(payload);

  // When SMTP login is a different mailbox (e.g. arham@), BCC that account so
  // you still receive a copy while the primary notification goes to support@.
  const bcc =
    process.env.FORM_BCC_EMAIL?.trim() ||
    (config.user.toLowerCase() !== recipient.toLowerCase()
      ? config.user
      : undefined);

  try {
    const result = await transporter.sendMail({
      from: {
        name: "SquarespaceLab Website",
        address: config.user,
      },
      sender: config.user,
      to: recipient,
      bcc,
      envelope: {
        from: config.user,
        to: bcc ? [recipient, bcc] : [recipient],
      },
      replyTo: payload.fields.email || undefined,
      subject,
      text,
      html,
      attachments,
      headers: {
        "X-Entity-Ref-ID": `form-${Date.now()}`,
      },
    });

    if (process.env.NODE_ENV !== "production") {
      console.info("Form email dispatched:", {
        to: recipient,
        bcc: bcc ?? null,
        from: config.user,
        messageId: result.messageId,
        accepted: result.accepted,
        rejected: result.rejected,
      });
    }

    if (result.rejected.length > 0) {
      throw new Error(`Message rejected by server: ${result.rejected.join(", ")}`);
    }
  } catch (error) {
    throw new Error(formatSmtpError(error));
  }
}

type FormSubmitResponse = {
  success?: string | boolean;
  message?: string;
};

async function sendViaFormSubmit(payload: FormSubmissionPayload): Promise<void> {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(FORM_RECIPIENT_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: buildFormEmailSubject(payload),
        _template: "table",
        _captcha: "false",
        form_type: payload.formType,
        ...payload.fields,
      }),
    }
  );

  const data = (await response.json().catch(() => null)) as
    | FormSubmitResponse
    | null;

  const failed =
    !response.ok ||
    data?.success === false ||
    data?.success === "false";

  if (failed) {
    throw new Error(
      data?.message ??
        "FormSubmit could not deliver this message. Configure SMTP in .env.local."
    );
  }
}

export async function sendFormEmail(
  payload: FormSubmissionPayload
): Promise<void> {
  if (smtpIsConfigured()) {
    await sendViaSmtp(payload);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Email is not configured. Add SMTP settings to your hosting environment."
    );
  }

  try {
    await sendViaFormSubmit(payload);
  } catch (formSubmitError) {
    console.error("FormSubmit failed:", formSubmitError);
    throw new Error(
      "Email is not configured. Create .env.local with SMTP_HOST, SMTP_USER, and SMTP_PASSWORD (use your webmail login)."
    );
  }
}
