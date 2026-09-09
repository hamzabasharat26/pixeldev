"use client";

import { useState } from "react";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import Bracket from "@/components/Bracket";

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (!email.includes("@") || !email.includes(".")) {
      setValidationError("That email address does not look right. Check for a typo?");
      return;
    }
    
    if (message.trim().length < 10) {
      setValidationError("Message is too short to be useful. Add more detail?");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, honeypot })
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-layout mb-16">
        <Reveal>
          <h1 className="mb-4">Get in touch</h1>
          <p className="text-lg text-ink/80 max-w-content">
            Ready to talk about your project? Choose the path that works best for you.
          </p>
        </Reveal>
      </div>

      <div className="max-w-layout grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Reveal delay={0.1}>
            <div className="space-y-4 mb-16">
              {/* Friction 1: Cal.com */}
              <a 
                href={site.calLink}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-signal text-white text-center px-6 py-4 rounded hover:bg-signal/90 transition-colors font-semibold text-lg"
              >
                1. Book a call directly
              </a>
              
              {/* Friction 2: WhatsApp */}
              <a 
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/30 text-center px-6 py-4 rounded hover:bg-[#25D366]/20 transition-colors font-semibold text-lg"
              >
                2. Send a WhatsApp message
              </a>

              {/* Friction 3: Email */}
              <a 
                href={`mailto:${site.email}`}
                className="block w-full bg-white text-ink border border-line text-center px-6 py-4 rounded hover:border-signal/50 transition-colors font-semibold text-lg"
              >
                3. Send an email
              </a>
            </div>
            
            <div className="bg-paper p-8 rounded border border-line">
              <h4 className="mono-tag text-muted mb-4 block">LOGISTICS</h4>
              <ul className="space-y-4 text-ink/80">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 shrink-0 rounded bg-signal/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-signal" />
                  </div>
                  <div>
                    <strong className="block text-ink font-semibold">Response time</strong>
                    We promise to reply to all inquiries within six hours.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 shrink-0 rounded bg-signal/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-signal" />
                  </div>
                  <div>
                    <strong className="block text-ink font-semibold">Working hours</strong>
                    {site.hours}
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.2}>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">4. Or leave a message here</h3>
              <p className="text-ink/70">The highest friction option, but it works.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human:
                  <input tabIndex="-1" autoComplete="off" type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </label>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email address</label>
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting" || status === "success"}
                  className="w-full bg-white border border-line rounded px-4 py-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors disabled:opacity-50"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                <textarea 
                  id="message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "submitting" || status === "success"}
                  className="w-full bg-white border border-line rounded px-4 py-3 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors disabled:opacity-50 resize-y"
                />
              </div>

              {validationError && (
                <div className="text-alert font-medium text-sm">
                  {validationError}
                </div>
              )}

              {status === "success" && (
                <div className="bg-signal/10 text-signal border border-signal/20 p-4 rounded font-medium">
                  Message sent. We&apos;ll reply within six hours.
                </div>
              )}

              {status === "error" && (
                <div className="bg-alert/10 text-alert border border-alert/20 p-4 rounded font-medium">
                  Message did not send. Email us directly at <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "submitting" || status === "success"}
                className="w-full bg-ink text-white px-6 py-4 rounded hover:bg-ink/80 transition-colors font-semibold disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
