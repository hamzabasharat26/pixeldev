import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed, time-stamped token for the contact form. Server-only: it's imported
 * from the contact page (a Server Component) and the Server Action, never from
 * a client file, because it reads a secret.
 *
 * What it proves, in one hidden field:
 *   - WE issued it. HMAC-SHA256 over the timestamp with FORM_TOKEN_SECRET, so a
 *     bot can't mint its own. Compared in constant time.
 *   - A person had time to fill it in. Anything submitted within MIN_AGE of
 *     the page being served is a script, not someone typing a message.
 *   - It isn't stale or replayed. Tokens older than MAX_AGE are refused.
 *
 * No cookie and no session, on purpose: there are no accounts on this site, so
 * there is nothing to log in to and nothing a session would protect. Next.js
 * Server Actions already reject cross-origin posts (Origin vs Host check),
 * which is the CSRF protection a cookie token would otherwise provide.
 *
 * Without FORM_TOKEN_SECRET the timing checks still run but the signature
 * can't, so it logs a warning. Set it in production (see .env.example).
 */

const MIN_AGE_MS = 3_000;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

let warned = false;
function secret(): string | null {
  const s = process.env.FORM_TOKEN_SECRET;
  if (s && s.length >= 32) return s;
  if (!warned && process.env.NODE_ENV === "production") {
    warned = true;
    console.warn(
      "[form-token] FORM_TOKEN_SECRET is missing or shorter than 32 chars; contact tokens are timing-checked but unsigned.",
    );
  }
  return null;
}

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

/** Issue a token for a freshly served form. */
export function issueFormToken(now = Date.now()): string {
  const ts = String(now);
  const key = secret();
  return `${ts}.${key ? sign(ts, key) : "unsigned"}`;
}

export type TokenResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "malformed" | "forged" | "too-fast" | "expired" };

/** Verify a submitted token. Pure apart from the clock, for easy testing. */
export function verifyFormToken(token: string | null, now = Date.now()): TokenResult {
  if (!token) return { ok: false, reason: "missing" };
  const dot = token.indexOf(".");
  const ts = dot > 0 ? token.slice(0, dot) : "";
  const sig = dot > 0 ? token.slice(dot + 1) : "";
  const issued = Number(ts);
  if (!/^\d{13}$/.test(ts) || !sig || !Number.isFinite(issued)) {
    return { ok: false, reason: "malformed" };
  }

  const key = secret();
  if (key) {
    const expected = Buffer.from(sign(ts, key));
    const given = Buffer.from(sig);
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
      return { ok: false, reason: "forged" };
    }
  }

  const age = now - issued;
  if (age < MIN_AGE_MS) return { ok: false, reason: "too-fast" };
  if (age > MAX_AGE_MS) return { ok: false, reason: "expired" };
  return { ok: true };
}
