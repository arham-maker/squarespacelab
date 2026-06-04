import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;
const port = Number(process.env.SMTP_PORT ?? "465");
const secure = process.env.SMTP_SECURE === "true" || port === 465;
const to =
  process.env.FORM_RECIPIENT_EMAIL?.trim() || "info@squarespacedev.com";

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  tls: { minVersion: "TLSv1.2" },
});

console.log("Verifying SMTP…");
await transporter.verify();
console.log("SMTP verify OK");

const result = await transporter.sendMail({
  from: { name: "SMTP Test", address: user },
  sender: user,
  to,
  envelope: { from: user, to },
  subject: `SMTP test ${new Date().toISOString()}`,
  text: `Test from ${user} to ${to}`,
  html: `<p>Test from <b>${user}</b> to <b>${to}</b></p>`,
});

console.log("Send result:", {
  messageId: result.messageId,
  accepted: result.accepted,
  rejected: result.rejected,
  response: result.response,
});
