import path from "node:path";
import { FORM_RECIPIENT_EMAIL } from "@/lib/data/forms";
import { SITE } from "@/lib/data/site";
import type { FormSubmissionPayload } from "@/lib/forms/types";

const LOGO_CID = "brand-logo@squarespacedev";
const LOGO_FILENAME = "Square Space Dev Logo V3 Black.png";

const FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  phone: "Phone Number",
  message: "Message",
  consentMarketing: "Marketing Consent",
  consentSms: "SMS Consent",
  consentTerms: "Terms Accepted",
  packageName: "Selected Package",
  packagePrice: "Package Price",
  packageCategory: "Package Category",
  packageDetails: "Package Details",
  businessIndustry: "Business Industry",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getFormLabel(formType: FormSubmissionPayload["formType"]): string {
  if (formType === "package") return "Package Selection";
  if (formType === "get-started") return "Get Started";
  if (formType === "auto-popup") return "Auto Popup";
  return "Contact Form";
}

/** Primary email heading — for packages, names the plan clearly. */
function getEmailMainHeading(payload: FormSubmissionPayload): string {
  if (payload.formType !== "package") {
    return `${getFormLabel(payload.formType)} submission`;
  }

  const name = payload.fields.packageName?.trim();
  if (!name) return "Package submission";

  return `Submission for ${name}`;
}

function getEmailPackageSubheading(
  payload: FormSubmissionPayload
): string | null {
  if (payload.formType !== "package") return null;

  const parts = [
    payload.fields.packageCategory?.trim(),
    payload.fields.packagePrice?.trim(),
    payload.fields.packageDetails?.trim(),
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" · ") : null;
}

function getOrderedFields(payload: FormSubmissionPayload): [string, string][] {
  const entries = Object.entries(payload.fields);

  if (payload.formType !== "package") return entries;

  const packageKeys = [
    "packageName",
    "packagePrice",
    "packageCategory",
    "packageDetails",
  ];
  const packageEntries = packageKeys
    .filter((key) => payload.fields[key])
    .map((key) => [key, payload.fields[key]] as [string, string]);
  const rest = entries.filter(([key]) => !packageKeys.includes(key));

  return [...packageEntries, ...rest];
}

function getVisitorName(payload: FormSubmissionPayload): string {
  return (
    payload.fields.fullName ||
    [payload.fields.firstName, payload.fields.lastName]
      .filter(Boolean)
      .join(" ") ||
    "Website visitor"
  );
}

function getSubmittedAt(): string {
  return new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  });
}

function getSiteUrl(): string | undefined {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim();
  return url?.replace(/\/$/, "");
}

export function getFormEmailLogoPath(): string {
  return path.join(process.cwd(), "public", LOGO_FILENAME);
}

export function getFormEmailLogoAttachment() {
  return {
    filename: "logo.png",
    path: getFormEmailLogoPath(),
    cid: LOGO_CID,
  };
}

export function buildFormEmailSubject(payload: FormSubmissionPayload): string {
  const name = getVisitorName(payload);
  if (payload.formType === "package") {
    const pkg = payload.fields.packageName?.trim() || "Package";
    const price = payload.fields.packagePrice?.trim();
    const category = payload.fields.packageCategory?.trim();
    const packagePart = price ? `${pkg} (${price})` : pkg;
    const categoryPart = category ? ` — ${category}` : "";
    return `Package: ${packagePart}${categoryPart} — ${name}`;
  }

  return payload.formType === "get-started"
    ? `Get Started: ${name}`
    : payload.formType === "auto-popup"
      ? `Auto popup: ${name}`
      : `Contact form: ${name}`;
}

export function buildFormEmailText(payload: FormSubmissionPayload): string {
  const heading = getEmailMainHeading(payload);
  const packageSub = getEmailPackageSubheading(payload);

  return [
    heading,
    ...(packageSub ? [packageSub] : []),
    `Submitted: ${getSubmittedAt()}`,
    "",
    ...getOrderedFields(payload).map(([key, value]) => {
      const fieldLabel = FIELD_LABELS[key] ?? key;
      return `${fieldLabel}: ${value}`;
    }),
    "",
    `Reply to: ${payload.fields.email || "—"}`,
  ].join("\n");
}

export function buildFormEmailHtml(payload: FormSubmissionPayload): string {
  const formLabel = getFormLabel(payload.formType);
  const mainHeading = escapeHtml(getEmailMainHeading(payload));
  const packageSubheading = getEmailPackageSubheading(payload);
  const packageSubHtml = packageSubheading
    ? escapeHtml(packageSubheading)
    : null;
  const isPackage = payload.formType === "package";
  const eyebrow = isPackage ? "Package inquiry" : "New website lead";
  const visitorName = escapeHtml(getVisitorName(payload));
  const submittedAt = escapeHtml(getSubmittedAt());
  const visitorEmail = payload.fields.email?.trim();
  const siteUrl = getSiteUrl();

  const rows = getOrderedFields(payload)
    .map(([key, value]) => {
      const label = escapeHtml(FIELD_LABELS[key] ?? key);
      const displayValue = escapeHtml(value || "—");
      const isMessage = key === "message";

      return `
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid #ece8df;color:#6b6b6b;font-size:13px;font-weight:600;width:38%;vertical-align:${isMessage ? "top" : "middle"};">
            ${label}
          </td>
          <td style="padding:14px 18px;border-bottom:1px solid #ece8df;color:#111111;font-size:15px;line-height:1.5;vertical-align:${isMessage ? "top" : "middle"};">
            ${isMessage ? `<div style="white-space:pre-wrap;">${displayValue}</div>` : displayValue}
          </td>
        </tr>`;
    })
    .join("");

  const replySubject =
    isPackage && payload.fields.packageName
      ? `Re: Your ${payload.fields.packageName} package inquiry`
      : `Re: Your ${formLabel} inquiry`;

  const replyHref = visitorEmail
    ? `mailto:${encodeURIComponent(visitorEmail)}?subject=${encodeURIComponent(replySubject)}`
    : SITE.emailHref;

  const packageHighlight =
    isPackage && payload.fields.packageName
      ? `
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:16px;">
                  <tr>
                    <td style="background-color:#eae4d5;border-radius:12px;padding:16px 18px;color:#111111;">
                      <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;color:#6b6b6b;">
                        Selected package
                      </p>
                      <p style="margin:0 0 4px;font-size:20px;font-weight:700;line-height:1.25;">
                        ${escapeHtml(payload.fields.packageName)}
                      </p>
                      ${
                        packageSubHtml
                          ? `<p style="margin:0;font-size:14px;line-height:1.45;color:#4b5563;">${packageSubHtml}</p>`
                          : ""
                      }
                    </td>
                  </tr>
                </table>`
      : "";

  const logoSrc = `cid:${LOGO_CID}`;
  const websiteLink = siteUrl
    ? `<a href="${escapeHtml(siteUrl)}" style="color:#1d1b2c;text-decoration:underline;">Visit website</a>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${mainHeading}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f2ec;font-family:Inter,Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f2ec;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(17,17,17,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,#eae4d5 0%,#f8f6f1 100%);padding:28px 32px 24px;text-align:center;">
                <img src="${logoSrc}" alt="${escapeHtml(SITE.name)}" width="220" style="display:block;margin:0 auto 18px;max-width:220px;height:auto;border:0;" />
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#6b6b6b;font-weight:600;">
                  ${escapeHtml(eyebrow)}
                </p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:#111111;font-weight:700;">
                  ${mainHeading}
                </h1>
                ${
                  packageSubHtml && !isPackage
                    ? `<p style="margin:12px 0 0;font-size:15px;line-height:1.45;color:#4b5563;">${packageSubHtml}</p>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                ${packageHighlight}
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
                  <tr>
                    <td style="background-color:#1d1b2c;border-radius:12px;padding:18px 20px;color:#ffffff;">
                      <p style="margin:0 0 6px;font-size:13px;opacity:0.82;">Visitor</p>
                      <p style="margin:0 0 4px;font-size:22px;font-weight:700;line-height:1.25;">${visitorName}</p>
                      <p style="margin:0;font-size:14px;opacity:0.9;">Submitted ${submittedAt}</p>
                    </td>
                  </tr>
                </table>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #ece8df;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td colspan="2" style="padding:14px 18px;background-color:#f8f6f1;color:#111111;font-size:14px;font-weight:700;border-bottom:1px solid #ece8df;">
                      ${isPackage ? "Contact &amp; package details" : "Submission details"}
                    </td>
                  </tr>
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 32px;text-align:center;">
                <a href="${replyHref}" style="display:inline-block;background-color:#111111;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 28px;border-radius:999px;">
                  Reply to ${visitorEmail ? escapeHtml(visitorEmail) : "visitor"}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;text-align:center;color:#6b6b6b;font-size:12px;line-height:1.6;">
                <p style="margin:0 0 6px;">Delivered to ${escapeHtml(FORM_RECIPIENT_EMAIL)}</p>
                <p style="margin:0;">${escapeHtml(SITE.name)} ${websiteLink ? `· ${websiteLink}` : ""}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
