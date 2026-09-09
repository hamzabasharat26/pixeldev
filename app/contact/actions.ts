"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { site } from "@/content/site";
import { isBudget, isService } from "./options";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

// In-memory sliding-window rate limit. Fine for a single-region marketing site;
// swap for a shared store if the app ever runs multi-instance.
const HITS = new Map<string, number[]>();
const LIMIT = 4;
const WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  if (HITS.size > 5000) HITS.clear(); // crude cap; this map should stay small
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    HITS.set(ip, recent);
    return true;
  }
  recent.push(now);
  HITS.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Single-line field: collapse all whitespace to single spaces, trim, cap. */
const clipLine = (v: FormDataEntryValue | null, max: number) =>
  String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/** Multi-line field: normalise line endings, trim, cap. Newlines survive. */
const clipText = (v: FormDataEntryValue | null, max: number) =>
  String(v ?? "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, max);

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a bot filled the hidden field. Pretend it worked.
  if (clipLine(formData.get("company_url"), 1)) {
    return { status: "success" };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: `Too many messages from this connection. Please email us directly at ${site.email}.`,
    };
  }

  const name = clipLine(formData.get("name"), 120);
  const email = clipLine(formData.get("email"), 200);
  const message = clipText(formData.get("message"), 4000);
  const company = clipLine(formData.get("company"), 160);
  const budget = clipLine(formData.get("budget"), 40);
  const service = clipLine(formData.get("service"), 60);
  const consent = formData.get("consent") === "on";

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email))
    fieldErrors.email = "Please enter a valid email address.";
  if (message.length < 10)
    fieldErrors.message = "Please tell us a little about the project.";
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }
  if (!consent) {
    return {
      status: "error",
      message: "Please tick the box to agree we can contact you about this enquiry.",
    };
  }

  const safeBudget = isBudget(budget) ? budget : "Not specified";
  const safeService = isService(service) ? service : "Not specified";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: "Pixel Dev Solutions <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `New project enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "not given"}`,
          `Budget: ${safeBudget}`,
          `Service: ${safeService}`,
          "",
          message,
        ].join("\n"),
      });
      if (error) throw new Error(error.message);
    } catch {
      return {
        status: "error",
        message: `Something went wrong sending that. Please email us directly at ${site.email}.`,
      };
    }
  } else {
    // No key configured yet (local dev / pre-launch). Log so it isn't silent.
    console.warn("[contact] RESEND_API_KEY not set, enquiry not delivered:", {
      name,
      email,
    });
  }

  return { status: "success" };
}
