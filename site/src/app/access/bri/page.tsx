import type { Metadata } from "next";
import Link from "next/link";

const fi = "var(--font-instrument), serif";
const fd = "var(--font-dm-sans), sans-serif";
const fj = "var(--font-jetbrains), monospace";

export const metadata: Metadata = {
  title: "Bri Access | Vela",
  description: "Bri's Vela access page for account setup and first workspace handoff.",
};

const statusItems = [
  { label: "Access page", value: "Live", tone: "var(--lime)" },
  { label: "Account", value: "Signup first", tone: "var(--star-gold)" },
  { label: "Workspace", value: "Seed after signup", tone: "var(--ember-copper)" },
];

const steps = [
  {
    title: "Create the account",
    body: "Use the Vela login page and sign up with the email Jenn should connect to Bri.",
  },
  {
    title: "Link Bri's profile",
    body: "After signup, Jenn links that account to the Bri client record so the dashboard loads the right kit.",
  },
  {
    title: "Pick the first surface",
    body: "The first real build should be a portfolio, a site, or a focused tool. The access layer is ready; the project direction is still open.",
  },
];

const workspaceItems = [
  "Frontend review rules",
  "Build log habit",
  "Workspace structure",
  "First-session checklist",
  "Review-before-ship loop",
];

function Label({ children }: { children: string }) {
  return (
    <p
      style={{
        fontFamily: fj,
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--constellation)",
        marginBottom: 10,
      }}
    >
      {children}
    </p>
  );
}

export default function BriAccessPage() {
  return (
    <div className="bri-access-page" style={{ maxWidth: 1080, margin: "0 auto", padding: "136px 24px 40px" }}>
      <section
        className="bri-hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.8fr)",
          gap: 28,
          alignItems: "end",
          paddingBottom: 44,
        }}
      >
        <div>
          <Label>Client access</Label>
          <h1
            style={{
              fontFamily: fi,
              fontSize: "clamp(48px, 8vw, 88px)",
              lineHeight: 0.96,
              color: "var(--moonlight)",
              maxWidth: 720,
              marginBottom: 20,
            }}
          >
            Bri&apos;s Vela workspace
          </h1>
          <p
            style={{
              fontFamily: fd,
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--dusk)",
              maxWidth: 620,
            }}
          >
            A clean entry point for signup, account linking, and the first build. The access layer is ready; the first public project can stay intentionally scoped.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
            <Link
              href="/login?redirectTo=/dashboard"
              style={{
                fontFamily: fd,
                fontSize: 15,
                fontWeight: 700,
                color: "var(--forest-floor)",
                background: "var(--star-gold)",
                border: "1px solid var(--star-gold)",
                borderRadius: 8,
                padding: "12px 18px",
                textDecoration: "none",
              }}
            >
              Open Vela login
            </Link>
            <Link
              href="/tools"
              style={{
                fontFamily: fd,
                fontSize: 15,
                fontWeight: 700,
                color: "var(--moonlight)",
                border: "1px solid var(--stardust)",
                borderRadius: 8,
                padding: "12px 18px",
                textDecoration: "none",
                background: "rgba(30, 42, 34, 0.72)",
              }}
            >
              View the toolkit
            </Link>
          </div>
        </div>

        <div
          style={{
            background: "var(--deep-canopy)",
            border: "1px solid var(--stardust)",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <Label>Status</Label>
          <div style={{ display: "grid", gap: 14 }}>
            {statusItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  borderBottom: "1px solid var(--stardust)",
                  paddingBottom: 12,
                }}
              >
                <span style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)" }}>{item.label}</span>
                <span style={{ fontFamily: fj, fontSize: 12, color: item.tone, textAlign: "right" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bri-body-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 360px)",
          gap: 24,
          borderTop: "1px solid var(--stardust)",
          paddingTop: 40,
        }}
      >
        <div>
          <Label>Next steps</Label>
          <div style={{ display: "grid", gap: 22 }}>
            {steps.map((step, index) => (
              <div key={step.title} style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr)", gap: 18 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fj,
                    fontSize: 12,
                    color: "var(--forest-floor)",
                    background: index === 0 ? "var(--star-gold)" : "var(--understory)",
                    border: index === 0 ? "1px solid var(--star-gold)" : "1px solid var(--stardust)",
                  }}
                >
                  {index + 1}
                </span>
                <div>
                  <h2 style={{ fontFamily: fi, fontSize: 25, lineHeight: 1.15, color: "var(--moonlight)", marginBottom: 7 }}>
                    {step.title}
                  </h2>
                  <p style={{ fontFamily: fd, fontSize: 15, lineHeight: 1.65, color: "var(--dusk)", maxWidth: 620 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside
          style={{
            background: "var(--understory)",
            border: "1px solid var(--stardust)",
            borderRadius: 12,
            padding: 24,
            alignSelf: "start",
          }}
        >
          <Label>Starter kit</Label>
          <h2 style={{ fontFamily: fi, fontSize: 28, color: "var(--moonlight)", lineHeight: 1.15, marginBottom: 14 }}>
            Loaded for a frontend-first build
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            {workspaceItems.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--star-gold)", flexShrink: 0 }} />
                <span style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)" }}>{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>
      <style>{`
        @media (max-width: 760px) {
          .bri-access-page {
            padding-top: 112px !important;
          }
          .bri-hero-grid,
          .bri-body-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
