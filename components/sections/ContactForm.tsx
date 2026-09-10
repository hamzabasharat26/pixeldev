"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { site } from "@/content/site";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { BUDGETS, SERVICES } from "@/app/contact/options";
import { Button } from "@/components/ui/Button";

const initial: ContactState = { status: "idle" };

/** One small amber burst on a successful send. Skipped under reduced motion. */
function celebrate() {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  import("canvas-confetti")
    .then(({ default: confetti }) => {
      confetti({
        particleCount: 70,
        spread: 68,
        startVelocity: 32,
        scalar: 0.9,
        origin: { y: 0.7 },
        colors: ["#e9a13c", "#f4c57f", "#c15f3c", "#12294b"],
        disableForReducedMotion: true,
      });
    })
    .catch(() => {});
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full">
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initial);
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const celebrated = useRef(false);

  useEffect(() => {
    if (state.status === "success" && !celebrated.current) {
      celebrated.current = true;
      celebrate();
    }
  }, [state.status]);

  // Lightweight client-side check so obvious mistakes don't round-trip.
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const clientError = (field: "name" | "email" | "message") => {
    if (!touched[field]) return undefined;
    if (field === "name" && !values.name.trim())
      return "Please enter your name.";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      return "Please enter a valid email address.";
    if (field === "message" && values.message.trim().length < 10)
      return "Please tell us a little about the project.";
    return undefined;
  };

  const errFor = (field: "name" | "email" | "message") =>
    state.fieldErrors?.[field] ?? clientError(field);

  if (state.status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-surface p-8">
        <p className="text-h4 text-ink">Thanks — your message is in.</p>
        <p className="mt-3 text-muted">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-e1 md:p-8"
    >
      {/* honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label>
          Company URL
          <input
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mb-6 rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-5">
        <Field
          id={nameId}
          name="name"
          label="Name"
          required
          placeholder="Your name"
          autoComplete="name"
          error={errFor("name")}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          onChange={(v) => setValues((s) => ({ ...s, name: v }))}
        />
        <Field
          id={emailId}
          name="email"
          type="email"
          label="Email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          error={errFor("email")}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          onChange={(v) => setValues((s) => ({ ...s, email: v }))}
        />
        <Field
          id={`${nameId}-company`}
          name="company"
          label="Company"
          placeholder="Company name (optional)"
          autoComplete="organization"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField name="budget" label="Budget" options={BUDGETS} />
          <SelectField name="service" label="Service" options={SERVICES} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={messageId} className="text-sm font-medium text-ink">
            Message <span className="text-error">*</span>
          </label>
          <textarea
            id={messageId}
            name="message"
            rows={5}
            required
            placeholder="What are you trying to build? A few sentences is plenty."
            aria-invalid={errFor("message") ? true : undefined}
            aria-describedby={errFor("message") ? `${messageId}-err` : undefined}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            onChange={(e) =>
              setValues((s) => ({ ...s, message: e.target.value }))
            }
            className="rounded-md border border-line-2 bg-surface px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus-visible:border-amber-600"
          />
          {errFor("message") && (
            <p id={`${messageId}-err`} className="text-sm text-error">
              {errFor("message")}
            </p>
          )}
        </div>

        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 h-4 w-4 accent-[var(--color-navy)]"
          />
          <span>
            I agree to Pixel Dev Solutions contacting me about this enquiry.
          </span>
        </label>

        <SubmitButton />

        <p className="text-xs text-faint">
          Prefer email?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-amber-700 underline decoration-amber-600/50 underline-offset-2"
          >
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  placeholder,
  autoComplete,
  error,
  onBlur,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        onBlur={onBlur}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="rounded-md border border-line-2 bg-surface px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus-visible:border-amber-600"
      />
      {error && (
        <p id={`${id}-err`} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: readonly string[];
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="rounded-md border border-line-2 bg-surface px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition-colors focus-visible:border-amber-600"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
