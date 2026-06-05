import Link from "next/link";
import { fi, fd, fj } from "./primitives";

/* Password gate — a plain server-rendered form. No client JS.
   Posts to /api/access/[slug], which sets the cookie and redirects in. */
export function SignInScreen({ slug, name, accent, error }: { slug: string; name: string; accent: string; error?: boolean }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 64px" }}>
      <div
        aria-hidden
        style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 520, height: 360, pointerEvents: "none", background: `radial-gradient(closest-side, color-mix(in oklab, ${accent} 13%, transparent), transparent)` }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 400,
          background: "linear-gradient(180deg, var(--understory), var(--deep-canopy))",
          border: "1px solid var(--hairline)",
          borderTopColor: `color-mix(in oklab, ${accent} 55%, var(--hairline))`,
          borderRadius: "var(--radius-card)",
          padding: "38px 34px 34px",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
          <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--constellation)" }}>Vela · Workspace</span>
        </div>
        <h1 style={{ fontFamily: fi, fontSize: 34, lineHeight: 1.05, color: "var(--moonlight)", margin: "0 0 8px" }}>{name}&rsquo;s workspace</h1>
        <p style={{ fontFamily: fd, fontSize: 14.5, lineHeight: 1.6, color: "var(--dusk)", margin: "0 0 24px" }}>Enter your access password to continue.</p>

        {error && (
          <div style={{ fontFamily: fd, fontSize: 13, color: "var(--meteor-red)", background: "rgba(224, 82, 82, 0.1)", border: "1px solid rgba(224, 82, 82, 0.25)", borderRadius: 8, padding: "10px 14px", marginBottom: 18, lineHeight: 1.5 }}>
            That password didn&rsquo;t match. Try again.
          </div>
        )}

        <form method="POST" action={`/api/access/${slug}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Access password"
            style={{ width: "100%", padding: "12px 14px", fontFamily: fd, fontSize: 14, color: "var(--moonlight)", background: "var(--forest-floor)", border: "1px solid var(--hairline-strong)", borderRadius: 10, outline: "none" }}
          />
          <button
            type="submit"
            className="access-cta"
            style={{ fontFamily: fd, fontSize: 15, fontWeight: 600, padding: "12px 0", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer", background: accent, color: "var(--forest-floor)" }}
          >
            Enter workspace
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Link href={`/access/${slug}`} style={{ fontFamily: fd, fontSize: 13, color: "var(--dusk)", textDecoration: "none" }}>
            ← Back to {name}&rsquo;s page
          </Link>
        </div>
      </div>

      <style>{`input[name="password"]::placeholder { color: var(--constellation); }`}</style>
    </div>
  );
}
