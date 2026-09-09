import { Resend } from "resend";
import { site } from "@/content/site";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");

// In-memory rate limiting map
// Key: IP address, Value: Array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_COUNT = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip) {
  const now = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now]);
    return true; // allowed
  }

  const timestamps = rateLimitMap.get(ip);
  // Prune old timestamps
  const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= RATE_LIMIT_COUNT) {
    rateLimitMap.set(ip, validTimestamps);
    return false; // rejected
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true; // allowed
}

export async function POST(request) {
  try {
    // 1. Get IP for rate limiting
    // Note: In Next.js App Router, request.headers.get('x-forwarded-for') is the standard way to get IP
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    
    if (!checkRateLimit(ip)) {
      return new Response("Too many requests", { status: 429 });
    }

    // 2. Parse body
    const body = await request.json();
    const { email, message, honeypot } = body;

    // 3. Validate
    if (honeypot) {
      // Spam bot filled the hidden field, silently reject
      return new Response("OK", { status: 200 }); 
    }

    if (!email || !email.includes("@") || !message || message.length < 10) {
      return new Response("Bad request", { status: 400 });
    }

    // 4. Send emails via Resend
    // Skip sending if no API key is present (e.g. during local dev without env vars)
    if (process.env.RESEND_API_KEY) {
      // Email to Us
      await resend.emails.send({
        from: `Contact Form <onboarding@resend.dev>`, // Must be verified domain in production
        to: site.email,
        subject: `New project inquiry from ${email}`,
        replyTo: email,
        text: message
      });

      // Autoresponder to User
      await resend.emails.send({
        from: `Studio <onboarding@resend.dev>`, // Must be verified domain in production
        to: email,
        subject: "We received your message",
        text: `Thanks for reaching out.\n\nWe review all messages and reply within six hours.\n\nIf your request is urgent, WhatsApp is the fastest way to reach us: ${site.whatsapp}\n\nBest,\n${site.name}`
      });
    } else {
      console.warn("RESEND_API_KEY is not set. Emails were not sent.");
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    // Never leak error detail to the client
    console.error("API Contact Error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
