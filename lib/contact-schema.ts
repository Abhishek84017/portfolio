export type ContactFields = { name: string; email: string; message: string };

export type ContactFieldErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | { status: "invalid"; fields: ContactFields; errors: ContactFieldErrors }
  | { status: "error"; fields: ContactFields; message: string };

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared by the client (instant feedback) and the server action (authoritative). */
export function validateContact(fields: ContactFields): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (fields.name.length < LIMITS.name.min) errors.name = "Please tell me your name.";
  else if (fields.name.length > LIMITS.name.max) errors.name = `Keep it under ${LIMITS.name.max} characters.`;

  if (!fields.email) errors.email = "I'll need an email to reply to.";
  else if (fields.email.length > LIMITS.email.max || !EMAIL_RE.test(fields.email))
    errors.email = "That email doesn't look quite right.";

  if (fields.message.length < LIMITS.message.min)
    errors.message = `A little more detail, please — at least ${LIMITS.message.min} characters.`;
  else if (fields.message.length > LIMITS.message.max)
    errors.message = `Please keep it under ${LIMITS.message.max} characters.`;

  return errors;
}
