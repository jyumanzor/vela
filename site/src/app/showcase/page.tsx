import { ConstellationDivider } from "@/components/ConstellationDivider";

const fi = "var(--font-instrument), serif";
const fd = "var(--font-dm-sans), sans-serif";
const fj = "var(--font-jetbrains), monospace";

const projects = [
  {
    num: "01", name: "jennumanzor.com", role: "Design & Development",
    stack: ["Next.js", "React", "Tailwind", "Supabase"],
    desc: "Personal site and digital workspace. Editorial design system with data-driven musings, SVG visualizations, an IO command center, and a 39-chapter Claude Code guide.",
    features: ["Interactive SVG charts with hover states and annotations", "Graza-inspired warm palette with editorial typography", "IO dashboard for personal infrastructure (health, running, music)", "Published writing with research-grade citations"],
    url: "https://jennumanzor.com", accent: "var(--lime)",
    pv: { bg: "#FAFAF7", tx: "#4A5D3A", ac: "#F2C94C", dom: "jennumanzor.com" },
  },
  {
    num: "02", name: "LDR Hub", role: "Full-Stack Platform",
    stack: ["Next.js", "TypeScript", "Puppeteer", "PptxGenJS"],
    desc: "Enterprise training platform for FTI Consulting\u2019s economic consulting practice. Interactive slide decks, AI guidelines, compliance tools, and a 28-chapter Claude Code implementation guide.",
    features: ["Interactive HTML training decks with PDF/PPTX export", "AI Hub with model comparison and tool evaluation", "Compliance assessment tools", "Speaker guide generation from deck data"],
    url: "https://ldrhub.vercel.app", accent: "var(--star-gold)",
    pv: { bg: "#003763", tx: "#FFFFFF", ac: "#00C9D4", dom: "ldrhub.vercel.app" },
  },
  {
    num: "03", name: "Vela", role: "Agent Platform",
    stack: ["Next.js", "Supabase Auth", "Anthropic API"],
    desc: "The platform you\u2019re looking at. Portable AI methodology, background agents, client sandboxes. Built to onboard people to Claude Code with encoded judgment from real project failures.",
    features: ["5 background agents (Citation Checker, Daubert Verification, Devil\u2019s Advocate)", "Portable rules library with 15 skills", "Client sandboxes with personalized dashboards", "Forest at Night design system"],
    url: "https://vela-io.vercel.app", accent: "var(--ember-copper)",
    pv: { bg: "#141E18", tx: "#F0EDE6", ac: "#D4A843", dom: "vela-io.vercel.app" },
  },
  {
    num: "04", name: "Doldol Studio", role: "Brand & Web Build",
    stack: ["Next.js", "Tailwind", "Instagram API"],
    desc: "Tattoo studio brand build and portfolio site. Clean grid layout, Instagram integration, and a custom pricing tool for client consultations.",
    features: ["Portfolio grid with category filtering", "Custom pricing/consultation tool", "Brand system from scratch (colors, typography, voice)", "Responsive mobile-first design"],
    url: "https://doldol.studio", accent: "var(--nebula-amber)",
    pv: { bg: "#F5F0EB", tx: "#2C2C2C", ac: "#E8A849", dom: "doldol.studio" },
  },
];

const caps = [
  { title: "Full-stack applications", body: "Next.js, React, TypeScript, Tailwind" },
  { title: "Design systems", body: "Palette, typography, spacing, component libraries" },
  { title: "AI infrastructure", body: "Claude Code, Codex, agent platforms, methodology" },
  { title: "Data visualization", body: "SVG charts, interactive explorers, research tools" },
];

function Pill({ label, color, outlined }: { label: string; color?: string; outlined?: boolean }) {
  return (
    <span style={{ fontFamily: fj, fontSize: 10, color: outlined ? color : "var(--dusk)", background: outlined ? "transparent" : "var(--understory)", border: outlined ? `1px solid ${color}` : "none", borderRadius: 4, padding: "2px 8px", opacity: outlined ? 0.85 : 1 }}>
      {label}
    </span>
  );
}

function SitePreview({ pv, accent }: { pv: typeof projects[0]["pv"]; accent: string }) {
  const dot = (c: string, o: number) => <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: o }} />;
  return (
    <div style={{ background: "var(--deep-canopy)", border: "1px solid var(--stardust)", borderRadius: 12, overflow: "hidden", width: "100%", maxWidth: 480 }}>
      <div style={{ height: 3, background: accent }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderBottom: "1px solid var(--stardust)" }}>
        {dot("#E05252", 0.7)}{dot("#D4A843", 0.7)}{dot("#1BB680", 0.7)}
        <span style={{ marginLeft: 8, flex: 1, background: "var(--understory)", borderRadius: 4, padding: "3px 10px", fontFamily: fj, fontSize: 10, color: "var(--constellation)" }}>{pv.dom}</span>
      </div>
      <div style={{ background: pv.bg, padding: 20, minHeight: 140 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ width: 48, height: 6, borderRadius: 3, background: pv.tx, opacity: 0.7 }} />
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2].map((k) => <div key={k} style={{ width: 24, height: 4, borderRadius: 2, background: pv.tx, opacity: 0.3 }} />)}
          </div>
        </div>
        <div style={{ width: "70%", height: 10, borderRadius: 5, background: pv.tx, opacity: 0.6, marginBottom: 8 }} />
        <div style={{ width: "50%", height: 6, borderRadius: 3, background: pv.tx, opacity: 0.3, marginBottom: 16 }} />
        <div style={{ width: 60, height: 20, borderRadius: 4, background: pv.ac, opacity: 0.85, marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map((k) => <div key={k} style={{ flex: 1, height: 40, borderRadius: 4, background: pv.tx, opacity: 0.08 }} />)}
        </div>
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
      {/* Hero */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 140, paddingBottom: 40 }}>
        <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.15em", color: "var(--constellation)", textTransform: "uppercase", marginBottom: 16 }}>Portfolio</p>
        <h1 style={{ fontFamily: fi, fontSize: "clamp(48px, 8vw, 80px)", color: "var(--moonlight)", lineHeight: 1.05 }}>Built with intention</h1>
        <p style={{ fontFamily: fd, fontSize: 16, color: "var(--dusk)", marginTop: 16, maxWidth: 520, lineHeight: 1.6 }}>
          Full-stack web applications, agent platforms, and brand systems. Each project designed to feel crafted, not generated.
        </p>
      </section>

      <ConstellationDivider brightIndices={[1, 3]} />

      {projects.map((p, i) => (
        <div key={p.num}>
          <section style={{ paddingTop: 60, paddingBottom: 60 }}>
            <div className="sc-project-grid">
              <div>
                <span style={{ fontFamily: fi, fontSize: 96, color: "var(--constellation)", opacity: 0.3, lineHeight: 1, display: "block", marginBottom: -20, userSelect: "none" }}>{p.num}</span>
                <h2 style={{ fontFamily: fi, fontSize: 28, color: "var(--moonlight)", marginBottom: 12 }}>{p.name}</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  <Pill label={p.role} color={p.accent} outlined />
                  {p.stack.map((s) => <Pill key={s} label={s} />)}
                </div>
                <p style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)", lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ fontFamily: fd, fontSize: 13, color: "var(--dusk)", lineHeight: 1.5, paddingLeft: 16, position: "relative", marginBottom: 4 }}>
                      <span style={{ position: "absolute", left: 0, top: 8, width: 4, height: 4, borderRadius: "50%", background: p.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: fd, fontSize: 14, fontWeight: 600, color: p.accent, textDecoration: "none" }}>
                  View Live {"\u2192"}
                </a>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <SitePreview pv={p.pv} accent={p.accent} />
              </div>
            </div>
          </section>
          {i < projects.length - 1 && <ConstellationDivider brightIndices={[i % 5, (i + 2) % 5]} />}
        </div>
      ))}

      <ConstellationDivider brightIndices={[0, 2, 4]} />

      {/* What I Build */}
      <section style={{ paddingTop: 40, paddingBottom: 40 }}>
        <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.15em", color: "var(--constellation)", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>Capabilities</p>
        <h2 style={{ fontFamily: fi, fontSize: "clamp(24px, 3.5vw, 36px)", color: "var(--moonlight)", textAlign: "center", marginBottom: 32, lineHeight: 1.2 }}>What I build</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {caps.map((c) => (
            <div key={c.title} style={{ background: "var(--understory)", border: "1px solid var(--stardust)", borderRadius: 10, padding: 20, textAlign: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--star-gold)", boxShadow: "0 0 8px var(--star-gold)", margin: "0 auto 12px" }} />
              <h3 style={{ fontFamily: fd, fontSize: 14, fontWeight: 600, color: "var(--moonlight)", marginBottom: 4 }}>{c.title}</h3>
              <p style={{ fontFamily: fd, fontSize: 12, color: "var(--dusk)", lineHeight: 1.5 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 40, paddingBottom: 120 }}>
        <h2 style={{ fontFamily: fi, fontSize: "clamp(24px, 3vw, 32px)", color: "var(--moonlight)", marginBottom: 12 }}>Interested in working together?</h2>
        <a href="mailto:jenn@jennumanzor.com" style={{ display: "inline-block", padding: "12px 32px", background: "var(--star-gold)", color: "var(--forest-floor)", fontFamily: fd, fontSize: 15, fontWeight: 600, borderRadius: 8, textDecoration: "none" }}>Get in Touch</a>
      </section>

      <style>{`
        .sc-project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        @media (max-width: 768px) { .sc-project-grid { grid-template-columns: 1fr; gap: 32px; } }
      `}</style>
    </div>
  );
}
