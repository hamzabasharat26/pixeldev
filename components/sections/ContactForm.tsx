"use client";

import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { site } from "@/content/site";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { BUDGETS, SERVICES } from "@/app/contact/options";
import { Button } from "@/components/ui/Button";

const initial: ContactState = { status: "idle" };

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
      <div className="rounded-[16px] border border-grey-200 bg-white p-8">
        <p className="text-h4 text-navy">Thanks — your message is in.</p>
        <p className="mt-3 text-grey-700">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-[16px] border border-grey-200 bg-white p-6 md:p-8"
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
          <label htmlFor={messageId} className="text-sm font-medium text-navy">
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
            className="rounded-md border border-grey-300 px-3.5 py-2.5 text-[0.95rem] outline-none focus-visible:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
          />
          {errFor("message") && (
            <p id={`${messageId}-err`} className="text-sm text-error">
              {errFor("message")}
            </p>
          )}
        </div>

        <label className="flex items-start gap-3 text-sm text-grey-700">
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

        <p className="text-xs text-grey-500">
          Prefer email?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-navy underline decoration-amber/60 underline-offset-2"
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
      <label htmlFor={id} className="text-sm font-medium text-navy">
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
        className="rounded-md border border-grey-300 px-3.5 py-2.5 text-[0.95rem] outline-none focus-visible:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
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
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="rounded-md border border-grey-300 bg-white px-3.5 py-2.5 text-[0.95rem] outline-none focus-visible:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
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
