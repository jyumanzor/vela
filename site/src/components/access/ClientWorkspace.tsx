import { getClient } from "@/data/clients";
import { AccessShell, Section, Card, CardGrid, Tags, StatStrip, LinkList, fi, fd, fj } from "./primitives";

function humanize(id: string): string {
  return id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace(/\bAi\b/g, "AI")
    .replace(/\bMd\b/g, "MD");
}

/* The signed-in client work area. Static, driven from clients.ts — the first
   "developed" version. Reuses the sleek primitives so it matches the hub. */
export function ClientWorkspace({ slug, accent }: { slug: string; accent: string }) {
  const client = getClient(slug);
  if (!client) {
    return (
      <AccessShell>
        <p style={{ fontFamily: fd, color: "var(--dusk)" }}>Unknown workspace.</p>
      </AccessShell>
    );
  }

  const project = client.projects?.[0];
  const skills = client.loadedSkillIds.map(humanize);
  const agents = client.agents.map(humanize);

  return (
    <AccessShell>
      <header style={{ position: "relative" }}>
        <div
          aria-hidden
          style={{ position: "absolute", top: -120, left: -80, width: 520, height: 380, pointerEvents: "none", zIndex: 0, background: `radial-gradient(closest-side, color-mix(in oklab, ${accent} 12%, transparent), transparent)` }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: fj, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--constellation)" }}>
              <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
              Vela · Workspace
            </span>
            <a href={`/api/access/${slug}?signout=1`} style={{ fontFamily: fd, fontSize: 13, color: "var(--dusk)", textDecoration: "none" }}>
              Sign out
            </a>
          </div>
          <h1 style={{ fontFamily: fi, fontSize: "clamp(40px, 6vw, 68px)", lineHeight: 1.02, letterSpacing: "-0.015em", color: "var(--moonlight)", margin: "20px 0 0" }}>
            Welcome back, {client.name}.
          </h1>
          <p style={{ fontFamily: fd, fontSize: 18, lineHeight: 1.55, color: "var(--dusk)", margin: "18px 0 0", maxWidth: 560 }}>{client.domainLabel}</p>
        </div>
      </header>

      <Section divider accent={accent}>
        <StatStrip
          items={[
            { label: "Skills loaded", value: String(client.loadedSkillIds.length), tone: accent },
            { label: "Reviewers", value: String(client.agents.length) },
            { label: "Project", value: project ? project.name : "Open" },
          ]}
        />
      </Section>

      {project && (
        <Section eyebrow="Current project" title={project.name} intro={project.description} accent={accent}>
          <Card accent={accent}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline", marginBottom: 16 }}>
              <span style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--constellation)" }}>Phases</span>
              <span style={{ fontFamily: fj, fontSize: 12, color: accent }}>
                {project.pagesComplete} / {project.pages.length} done
              </span>
            </div>
            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {project.pages.map((p, i) => {
                const done = i < project.pagesComplete;
                return (
                  <li key={p} style={{ display: "grid", gridTemplateColumns: "26px 1fr", gap: 14, alignItems: "center", padding: "12px 0", borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: fj, fontSize: 10, color: done ? "var(--forest-floor)" : "var(--dusk)", background: done ? accent : "transparent", border: done ? `1px solid ${accent}` : "1px solid var(--hairline-strong)" }}>
                      {done ? "✓" : i + 1}
                    </span>
                    <span style={{ fontFamily: fd, fontSize: 15, color: done ? "var(--dusk)" : "var(--moonlight)" }}>{p}</span>
                  </li>
                );
              })}
            </ol>
          </Card>
        </Section>
      )}

      <Section eyebrow="Loaded and ready" title="Your kit" accent={accent}>
        <CardGrid min={260}>
          <Card accent={accent}>
            <Tags label="Skills" items={skills} />
          </Card>
          <Card>
            <Tags label="Reviewers" items={agents} />
          </Card>
        </CardGrid>
      </Section>

      <Section eyebrow="Jump to" title="Your resources" accent={accent}>
        <LinkList
          items={[
            { label: "Start with Claude Code", href: `/access/${slug}#start`, note: "The chapters to read first." },
            { label: "Your kit & setup", href: `/access/${slug}#setup`, note: "Skills, reviewers, and the steps to your first session." },
            { label: "Knowledge base", href: `/access/${slug}#faq`, note: "Common questions, answered." },
          ]}
        />
      </Section>
    </AccessShell>
  );
}
