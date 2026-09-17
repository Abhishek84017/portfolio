"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleAlert, RotateCcw } from "lucide-react";
import { useActionState, useId, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { buttonClasses } from "@/components/ui/button";
import { profile } from "@/data/profile";
import {
  type ContactFieldErrors,
  type ContactFields,
  type ContactState,
  LIMITS,
  validateContact,
} from "@/lib/contact-schema";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors>({});
  const [messageLength, setMessageLength] = useState(0);
  const [formKey, setFormKey] = useState(0);
  // The success result the visitor dismissed via "Send another message".
  const [dismissed, setDismissed] = useState<ContactState | null>(null);

  const serverErrors = state.status === "invalid" ? state.errors : {};
  const errors: ContactFieldErrors = { ...serverErrors, ...clientErrors };
  const values = state.status === "invalid" || state.status === "error" ? state.fields : undefined;
  const succeeded = state.status === "success" && state !== dismissed;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    const fields: ContactFields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const found = validateContact(fields);
    setClientErrors(found);
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  };

  const clearError = (field: keyof ContactFields) =>
    setClientErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

  return (
    <div className="glass spotlight relative overflow-hidden rounded-3xl p-6 md:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {succeeded ? (
          <SuccessState
            key="success"
            name={state.status === "success" ? state.name : ""}
            onReset={() => {
              setDismissed(state);
              setClientErrors({});
              setMessageLength(0);
              setFormKey((k) => k + 1);
            }}
          />
        ) : (
          <motion.form
            key={`form-${formKey}`}
            action={formAction}
            onSubmit={onSubmit}
            noValidate
            aria-busy={pending}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Name"
                name="name"
                autoComplete="name"
                defaultValue={values?.name}
                error={errors.name}
                disabled={pending}
                maxLength={LIMITS.name.max}
                onInput={() => clearError("name")}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                defaultValue={values?.email}
                error={errors.email}
                disabled={pending}
                maxLength={LIMITS.email.max}
                onInput={() => clearError("email")}
              />
            </div>
            <Field
              label="Message"
              name="message"
              multiline
              defaultValue={values?.message}
              error={errors.message}
              disabled={pending}
              maxLength={LIMITS.message.max}
              placeholder="What are you building, and where could I help?"
              onInput={(e) => {
                clearError("message");
                setMessageLength(e.currentTarget.value.length);
              }}
              hint={`${messageLength || values?.message.length || 0} / ${LIMITS.message.max}`}
            />

            {/* Honeypot — hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <AnimatePresence initial={false}>
              {state.status === "error" && !pending ? (
                <motion.div
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-3 rounded-xl border border-danger-ink/30 bg-danger-ink/10 p-4 text-sm">
                    <CircleAlert size={18} aria-hidden className="mt-0.5 shrink-0 text-danger-ink" />
                    <div className="flex flex-col gap-2">
                      <p className="text-fg">{state.message}</p>
                      <a
                        href={`mailto:${profile.contact.email}`}
                        className="w-fit font-medium text-fg underline underline-offset-4"
                      >
                        Email {profile.contact.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">I read every message personally.</p>
              <button
                type="submit"
                disabled={pending}
                className={buttonClasses({ className: "w-full sm:w-auto disabled:opacity-100" })}
              >
                <span className="relative inline-flex items-center gap-2">
                  {pending ? (
                    <>
                      Sending
                      <span aria-hidden className="inline-flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="size-1 rounded-full bg-current"
                            animate={{ opacity: [0.25, 1, 0.25] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </span>
                    </>
                  ) : state.status === "error" ? (
                    <>
                      <RotateCcw size={16} aria-hidden />
                      Try again
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight
                        size={18}
                        aria-hidden
                        className="transition-transform duration-200 ease-out-expo group-hover/btn:translate-x-1"
                      />
                    </>
                  )}
                </span>
                {pending ? (
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
                    <motion.span
                      className="block h-full w-1/3 bg-[var(--on-accent)]/70"
                      animate={{ x: ["-100%", "300%"] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </span>
                ) : null}
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {pending ? "Sending your message…" : ""}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: keyof ContactFields;
  error?: string;
  hint?: string;
  multiline?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, "name">;

function Field({ label, name, error, hint, multiline, disabled, className, ...props }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = cn(
    "peer w-full rounded-xl border bg-elevated/70 px-4 text-base text-fg placeholder:text-muted/60",
    "transition-[border-color,box-shadow,background-color] duration-200 ease-out-expo",
    "focus-visible:outline-none focus-visible:border-accent focus-visible:bg-elevated focus-visible:ring-4 focus-visible:ring-accent/10",
    error ? "border-danger-ink/60" : "border-line hover:border-line-strong",
    disabled && "cursor-progress",
    className,
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {hint ? <span className="font-mono text-xs text-muted tabular-nums">{hint}</span> : null}
      </div>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            name={name}
            rows={6}
            readOnly={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(shared, "min-h-40 resize-y py-3")}
            {...props}
          />
        ) : (
          <input
            id={id}
            name={name}
            readOnly={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn(shared, "h-12")}
            {...props}
          />
        )}
        {/* Skeleton shimmer over the field while the submission is in flight */}
        {disabled ? <span aria-hidden className="skeleton pointer-events-none absolute inset-0 rounded-xl opacity-40" /> : null}
      </div>
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-2 text-sm text-danger-ink"
          >
            <CircleAlert size={14} aria-hidden />
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ name, onReset }: { name: string; onReset: () => void }) {
  const firstName = name.split(" ")[0];
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      className="flex min-h-96 flex-col items-center justify-center gap-6 py-8 text-center"
    >
      <div className="relative grid size-20 place-items-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-success/15"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        />
        <svg viewBox="0 0 48 48" className="relative size-12 text-success-ink" aria-hidden>
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.1 }}
          />
          <motion.path
            d="M15 24.5l6 6 12-13"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.5 }}
          />
        </svg>
      </div>
      <div>
        <p className="text-h3 text-fg">Message sent{firstName ? `, ${firstName}` : ""}.</p>
        <p className="mt-2 max-w-sm text-pretty text-muted">
          Thanks for reaching out — it&apos;s in my inbox and I&apos;ll get back to you soon.
        </p>
      </div>
      <button type="button" onClick={onReset} className={buttonClasses({ variant: "secondary", size: "sm" })}>
        Send another message
      </button>
    </motion.div>
  );
}
