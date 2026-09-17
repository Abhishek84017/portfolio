"use server";

import { profile } from "@/data/profile";
import { type ContactState, validateContact } from "@/lib/contact-schema";
import { getSupabase } from "@/lib/supabase-server";

const read = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

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

  const supabase = getSupabase();
  if (!supabase) {
    console.error("[contact] SUPABASE_URL / SUPABASE_ANON_KEY are not set.");
    return {
      status: "error",
      fields,
      message: `The form isn't connected just yet. Your message is still here — please email me directly at ${profile.contact.email}.`,
    };
  }

  const { error } = await supabase.from("contact_messages").insert(fields);
  if (error) {
    console.error("[contact] insert failed:", error.message);
    return {
      status: "error",
      fields,
      message: "Something went wrong on my side and your message wasn't sent. Please try again in a moment.",
    };
  }

  return { status: "success", name: fields.name };
}
