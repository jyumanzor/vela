import type { Metadata } from "next";
import Link from "next/link";

const fi = "var(--font-instrument), serif";
const fd = "var(--font-dm-sans), sans-serif";
const fj = "var(--font-jetbrains), monospace";

export const metadata: Metadata = {
  title: "Matt Access | Vela",
  description: "Matt's Vela access page for the music-site seed and health-dashboard plan.",
};

const projectTracks = [
  {
    name: "Music Site",
    status: "Seed built locally",
    body: "A private workshop for recordings, session notes, collaborators, and project status.",
    href: "#music",
    tone: "var(--ember-copper)",
  },
  {
    name: "Health Dashboard",
    status: "Planned next",
    body: "A local-first tracker for PT, nutrition, blood work, and mobility once privacy boundaries are locked.",
    href: "#health",
    tone: "var(--lime)",
  },
];

const nextSteps = [
  "Open the music seed locally.",
  "Replace sample recordings with real notes.",
  "Choose whether audio files stay local-only.",
  "Build one recording detail page with real context.",
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

export default function MattAccessPage() {
  return (
    <div className="matt-access-page" style={{ maxWidth: 1100, margin: "0 auto", padding: "136px 24px 40px" }}>
      <section
        className="matt-hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, 0.95fr)",
          gap: 28,
          alignItems: "center",
          paddingBottom: 44,
        }}
      >
        <div>
          <Label>Client access</Label>
          <h1
            style={{
              fontFamily: fi,
              fontSize: "clamp(50px, 8vw, 92px)",
              lineHeight: 0.96,
              color: "var(--moonlight)",
              maxWidth: 720,
              marginBottom: 20,
            }}
          >
            Matt&apos;s build bench
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
            Start with music, keep health private, and use Vela as the operating layer for the first few Claude Code sessions.
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
            <a
              href="#music"
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
              Review first seed
            </a>
          </div>
        </div>

        <div
          style={{
            background: "var(--deep-canopy)",
            border: "1px solid var(--stardust)",
            borderRadius: 8,
            padding: 24,
          }}
        >
          <Label>Pinned projects</Label>
          <div style={{ display: "grid", gap: 14 }}>
            {projectTracks.map((project) => (
              <a
                key={project.name}
                href={project.href}
                style={{
                  display: "block",
                  textDecoration: "none",
                  border: "1px solid var(--stardust)",
                  borderRadius: 8,
                  padding: 18,
                  background: "var(--understory)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline", marginBottom: 8 }}>
                  <h2 style={{ fontFamily: fi, fontSize: 25, color: "var(--moonlight)", lineHeight: 1.1 }}>{project.name}</h2>
                  <span style={{ fontFamily: fj, fontSize: 11, color: project.tone, textAlign: "right" }}>{project.status}</span>
                </div>
                <p style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)", lineHeight: 1.55 }}>{project.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className="matt-body-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 360px)",
          gap: 24,
          borderTop: "1px solid var(--stardust)",
          paddingTop: 40,
        }}
      >
        <div id="music">
          <Label>First seed</Label>
          <h2 style={{ fontFamily: fi, fontSize: "clamp(34px, 5vw, 54px)", color: "var(--moonlight)", lineHeight: 1.05, marginBottom: 16 }}>
            Music first, because it can become useful immediately.
          </h2>
          <p style={{ fontFamily: fd, fontSize: 16, color: "var(--dusk)", lineHeight: 1.7, maxWidth: 680, marginBottom: 28 }}>
            The local seed now has a homepage, recordings index, recording detail route, session timeline, collaborator page, and sample data. It is a private archive, not a public artist site.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {["Home", "Recordings", "Recording detail", "Sessions", "Collaborators"].map((item) => (
              <div key={item} style={{ border: "1px solid var(--stardust)", borderRadius: 8, padding: "14px 16px", background: "rgba(30, 42, 34, 0.58)" }}>
                <span style={{ fontFamily: fd, fontSize: 14, color: "var(--moonlight)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <aside
          id="health"
          style={{
            background: "var(--understory)",
            border: "1px solid var(--stardust)",
            borderRadius: 8,
            padding: 24,
            alignSelf: "start",
          }}
        >
          <Label>Next moves</Label>
          <div style={{ display: "grid", gap: 12 }}>
            {nextSteps.map((step, index) => (
              <div key={step} style={{ display: "grid", gridTemplateColumns: "28px minmax(0, 1fr)", gap: 10, alignItems: "start" }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fj,
                    fontSize: 11,
                    color: index === 0 ? "var(--forest-floor)" : "var(--dusk)",
                    background: index === 0 ? "var(--star-gold)" : "var(--deep-canopy)",
                    border: "1px solid var(--stardust)",
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.55, color: "var(--dusk)" }}>{step}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>
      <style>{`
        @media (max-width: 780px) {
          .matt-access-page {
            padding-top: 112px !important;
          }
          .matt-hero-grid,
          .matt-body-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
