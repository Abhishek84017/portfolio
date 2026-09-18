import "server-only";
import type { ContactFields } from "@/lib/contact-schema";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Emails a contact-form submission via the Resend REST API.
 * Returns null when RESEND_API_KEY isn't configured.
 *
 * Until a custom domain is verified in Resend, the sender must be
 * onboarding@resend.dev and the recipient must be the Resend account's own email.
 */
export async function sendContactEmail(fields: ContactFields): Promise<{ ok: boolean; error?: string } | null> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return null;

  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const message = escapeHtml(fields.message).replace(/\n/g, "<br>");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: fields.email,
      subject: `New portfolio message from ${fields.name}`,
      text: `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}\n\n— Reply to this email to answer ${fields.name} directly.`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#141413">
          <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#66625b;margin:0 0 8px">New message from your portfolio</p>
          <h2 style="font-family:Georgia,serif;font-weight:600;margin:0 0 16px">${escapeHtml(fields.name)}</h2>
          <p style="margin:0 0 16px"><a href="mailto:${escapeHtml(fields.email)}" style="color:#7a5c32">${escapeHtml(fields.email)}</a></p>
          <div style="background:#f7f5f0;border:1px solid #e4e0d7;border-radius:12px;padding:16px;line-height:1.6">${message}</div>
          <p style="font-size:12px;color:#66625b;margin:16px 0 0">Just hit Reply — it goes straight to ${escapeHtml(fields.name)}.</p>
        </div>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) return { ok: false, error: `${res.status} ${await res.text()}` };
  return { ok: true };
}
