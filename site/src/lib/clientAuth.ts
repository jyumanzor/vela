import { createHmac, timingSafeEqual } from "crypto";

/* Simple per-client password gate.
   - Password lives in an env var per client: e.g. CAMERON_PASSWORD, RISHMIKA_PASSWORD.
   - On success we set a cookie whose value is an HMAC of the slug, signed with
     VELA_AUTH_SECRET. It can't be forged without the secret, but needs no DB.
   This is intentionally light — no accounts, no email, no Supabase. */

const SECRET = process.env.VELA_AUTH_SECRET || "vela-dev-secret-set-VELA_AUTH_SECRET-in-prod";

export const cookieName = (slug: string) => `vela-access-${slug}`;

/** The signed token we store in the cookie for a given client. */
export function tokenFor(slug: string): string {
  return createHmac("sha256", SECRET).update(`vela:${slug}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  try {
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

/** Verify a cookie token matches the expected signed value for this slug. */
export function verifyToken(slug: string, token: string | undefined): boolean {
  if (!token) return false;
  return safeEqual(token, tokenFor(slug));
}

/** The configured password for a client, from `<SLUG>_PASSWORD`. */
export function passwordFor(slug: string): string | undefined {
  return process.env[`${slug.toUpperCase()}_PASSWORD`];
}

/** True if the submitted password matches the configured one (constant-time). */
export function checkPassword(slug: string, input: string): boolean {
  const expected = passwordFor(slug);
  if (!expected) return false;
  return safeEqual(input, expected);
}
