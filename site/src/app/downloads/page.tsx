import type { Metadata } from "next";
import { AccessShell, Card, CardGrid, Eyebrow, Section, fd, fi, fj } from "@/components/access/primitives";
import { getPublicDownloadKit, publicDownloadKits, type PublicDownloadKitId } from "@/data/public-downloads";

export const metadata: Metadata = {
  title: "Downloads | Vela",
  description: "Email the Vela starter kit to yourself.",
};

const ACCENT = "var(--star-gold)";

function statusMessage(status?: string, email?: string) {
  if (status === "sent") {
    return {
      tone: "var(--lime)",
      title: "Email sent.",
      body: email ? `The kit was sent to ${email}.` : "The kit was sent.",
    };
  }

  if (status === "invalid") {
    return {
      tone: "var(--meteor-red)",
      title: "Enter a valid email.",
      body: "The kit needs an email address before it can be sent.",
    };
  }

  if (status === "setup") {
    return {
      tone: "var(--meteor-red)",
      title: "Email is not configured yet.",
      body: "The form is live, but Vercel needs RESEND_API_KEY and DOWNLOAD_FROM_EMAIL before it can send.",
    };
  }

  if (status === "error") {
    return {
      tone: "var(--meteor-red)",
      title: "Email failed.",
      body: "The request reached the mail provider, but the provider rejected it.",
    };
  }

  return null;
}

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ kit?: string; status?: string; email?: string }>;
}) {
  const params = await searchParams;
  const selected = getPublicDownloadKit(params.kit);
  const status = statusMessage(params.status, params.email);

  return (
    <AccessShell>
      <header style={{ position: "relative" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -130,
            left: -90,
            width: 560,
            height: 400,
            pointerEvents: "none",
            zIndex: 0,
            background: "radial-gradient(closest-side, color-mix(in oklab, var(--star-gold) 13%, transparent), transparent)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Eyebrow accent={ACCENT}>Vela · Downloads</Eyebrow>
          <h1 style={{ fontFamily: fi, fontSize: "clamp(46px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.015em", color: "var(--moonlight)", margin: "22px 0 0", maxWidth: 700 }}>
            Email the starter kit
          </h1>
          <p style={{ fontFamily: fd, fontSize: 18, lineHeight: 1.6, color: "var(--dusk)", maxWidth: 600, margin: "24px 0 0" }}>
            Enter an email address and Vela sends the selected `.md` kit: starter files, skills, and reviewer agents.
          </p>
        </div>
      </header>

      <Section divider accent={selected.accent}>
        <Card accent={selected.accent}>
          {status && (
            <div style={{ border: `1px solid ${status.tone}`, borderRadius: "var(--radius-card)", padding: 16, marginBottom: 20 }}>
              <p style={{ fontFamily: fd, fontSize: 15, fontWeight: 700, color: status.tone, margin: 0 }}>{status.title}</p>
              <p style={{ fontFamily: fd, fontSize: 13.5, lineHeight: 1.55, color: "var(--dusk)", margin: "5px 0 0" }}>{status.body}</p>
            </div>
          )}

          <form method="POST" action="/api/downloads" style={{ display: "grid", gap: 22 }}>
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--constellation)", marginBottom: 12 }}>
                Kit
              </legend>
              <CardGrid min={240}>
                {(Object.keys(publicDownloadKits) as PublicDownloadKitId[]).map((id) => {
                  const kit = publicDownloadKits[id];
                  const checked = kit.id === selected.id;
                  return (
                    <label
                      key={kit.id}
                      style={{
                        display: "block",
                        border: checked ? `1px solid ${kit.accent}` : "1px solid var(--hairline)",
                        borderRadius: "var(--radius-card)",
                        padding: 18,
                        cursor: "pointer",
                        background: checked ? `color-mix(in oklab, ${kit.accent} 7%, transparent)` : "transparent",
                      }}
                    >
                      <input type="radio" name="kit" value={kit.id} defaultChecked={checked} style={{ marginRight: 10, accentColor: kit.accent }} />
                      <span style={{ fontFamily: fd, fontSize: 15, fontWeight: 700, color: "var(--moonlight)" }}>{kit.label}</span>
                      <span style={{ display: "block", fontFamily: fd, fontSize: 13.5, lineHeight: 1.5, color: "var(--dusk)", marginTop: 8 }}>{kit.description}</span>
                    </label>
                  );
                })}
              </CardGrid>
            </fieldset>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--constellation)" }}>Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                defaultValue={params.email ?? ""}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: "1px solid var(--hairline-strong)",
                  borderRadius: "var(--radius-card)",
                  background: "var(--deep-canopy)",
                  color: "var(--moonlight)",
                  fontFamily: fd,
                  fontSize: 16,
                  padding: "15px 16px",
                  outline: "none",
                }}
              />
            </label>

            <button
              type="submit"
              style={{
                justifySelf: "start",
                fontFamily: fd,
                fontSize: 15,
                fontWeight: 700,
                color: "var(--forest-floor)",
                background: selected.accent,
                border: `1px solid ${selected.accent}`,
                borderRadius: "var(--radius-pill)",
                padding: "12px 22px",
                cursor: "pointer",
              }}
            >
              Send kit
            </button>
          </form>
        </Card>
      </Section>
    </AccessShell>
  );
}
