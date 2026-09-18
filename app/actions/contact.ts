"use server";

import { profile } from "@/data/profile";
import { type ContactState, validateContact } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/resend";
import { getSupabase } from "@/lib/supabase-server";

const read = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

/** Optional archive copy — only runs when Supabase env vars are set. */
async function saveToSupabase(fields: { name: string; email: string; message: string }) {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { error } = await supabase.from("contact_messages").insert(fields);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const fields = {
    name: read(formData, "name"),
    email: read(formData, "email"),
    message: read(formData, "message"),
  };

  // Honeypot: real visitors never see or fill this field.
  if (read(formData, "company")) return { status: "success", name: fields.name };

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) return { status: "invalid", fields, errors };

  // Email is the primary channel; Supabase (if configured) keeps a searchable record.
  const [email, archive] = await Promise.all([
    sendContactEmail(fields).catch((e: unknown) => ({ ok: false, error: String(e) })),
    saveToSupabase(fields).catch((e: unknown) => ({ ok: false, error: String(e) })),
  ]);

  if (email && !email.ok) console.error("[contact] email failed:", email.error);
  if (archive && !archive.ok) console.error("[contact] supabase insert failed:", archive.error);

  if (email?.ok || archive?.ok) return { status: "success", name: fields.name };

  if (!email && !archive) {
    return {
      status: "error",
      fields,
      message: `The form isn't connected just yet. Your message is still here — please email me directly at ${profile.contact.email}.`,
    };
  }

  return {
    status: "error",
    fields,
    message: "Something went wrong on my side and your message wasn't sent. Please try again in a moment.",
  };
}
