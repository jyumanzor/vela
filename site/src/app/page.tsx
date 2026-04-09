import Link from "next/link";
import { ConstellationDivider } from "@/components/ConstellationDivider";

const valueProps = [
  { dot: "var(--star-gold)", title: "Encoded Judgment", body: "13 skills extracted from real project failures. Operating loops, provenance checks, failure modes \u2014 loaded into every session automatically." },
  { dot: "var(--ember-copper)", title: "Background Agents", body: "Upload your work. An agent checks citations, reviews arguments, catches numbers that don\u2019t add up. Results on your dashboard, not in your way." },
  { dot: "var(--lime)", title: "Right Tool, Right Task", body: "Claude Code for writing. Codex for review. Cursor for editing. Know when to use each \u2014 and how to make them share context." },
];

const steps = [
  { dot: "var(--star-gold)", title: "Get your starter kit", body: "Download your CLAUDE.md, skills library, and workspace templates. Configured for your domain." },
  { dot: "var(--ember-copper)", title: "Set up your workspace", body: "Install Claude Code and Codex. Organize your references. Your rules load automatically." },
  { dot: "var(--lime)", title: "Agents check your work", body: "Before you ship, background agents scan for uncited claims, logical gaps, and numbers that don\u2019t survive scrutiny." },
];

const rules = [
  { title: "Operating Loop", tag: "methodology", tc: "var(--star-gold)", body: "Build \u2192 Challenge \u2192 Resolve \u2192 Promote. Nothing ships unchallenged." },
  { title: "Plausible-but-Wrong Numbers", tag: "failure-mode", tc: "var(--meteor-red)", body: "AI generates statistics that feel correct but were never verified. Every number needs a provenance tag." },
  { title: "Cross-Model Verification", tag: "verification", tc: "var(--ember-copper)", body: "Before submitting, run your argument through an adversarial model. The second model\u2019s job is to find what you missed." },
  { title: "Build Log Protocol", tag: "methodology", tc: "var(--star-gold)", body: "One append-only file per project. Read before starting. Write before stopping. That\u2019s the whole system." },
];

const diagramNodes = [
  { x: 40, label: "Skills", c: "var(--star-gold)" },
  { x: 152, label: "CLAUDE.md", c: "var(--star-gold)" },
  { x: 280, label: "Agent", c: "var(--ember-copper)" },
  { x: 380, label: "Output", c: "var(--moonlight)" },
  { x: 480, label: "Validation", c: "var(--lime)" },
  { x: 600, label: "Build Log", c: "var(--star-gold)" },
];

const diagramEdges = [[45,147],[157,275],[285,375],[385,475],[485,595]];

/* Shared font refs */
const fi = "var(--font-instrument), serif";
const fd = "var(--font-dm-sans), sans-serif";
const fj = "var(--font-jetbrains), monospace";

function SectionLabel({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.15em", color: "var(--constellation)", textTransform: "uppercase", marginBottom: 8 }}>
      {children}
    </p>
  );
}

function ConstellationDots({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 16 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
      <span style={{ width: 12, height: 1, background: color, opacity: 0.4 }} />
      <span style={{ width: 4, height: 4, borderRadius: "50%", background: color, opacity: 0.6 }} />
      <span style={{ width: 8, height: 1, background: color, opacity: 0.3 }} />
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: 0.8 }} />
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
      {/* ── Hero ── */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 160, paddingBottom: 48 }}>
        <h1 style={{ fontFamily: fi, fontSize: "clamp(72px, 10vw, 120px)", color: "var(--moonlight)", lineHeight: 1 }}>
          Vel<span style={{ position: "relative", display: "inline-block" }}>a
            <span style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "var(--star-gold)", boxShadow: "0 0 12px var(--star-gold)", animation: "heroPulse 2.5s ease-in-out infinite" }} />
          </span>
        </h1>
        <p style={{ fontFamily: fi, fontSize: "clamp(18px, 2.5vw, 24px)", color: "var(--moonlight)", marginTop: 20, maxWidth: 560, lineHeight: 1.4 }}>
          Portable rules. Background agents. Your own constellation.
        </p>
        <p style={{ fontFamily: fd, fontSize: 15, color: "var(--dusk)", marginTop: 12 }}>
          A system for building with AI &mdash; charted, not guessed.
        </p>
        <Link href="/rules" style={{ display: "inline-block", marginTop: 36, padding: "12px 32px", background: "var(--star-gold)", color: "var(--forest-floor)", fontFamily: fd, fontSize: 15, fontWeight: 600, borderRadius: 8, textDecoration: "none", letterSpacing: "0.01em" }}>
          Explore the Rules
        </Link>
      </section>

      <ConstellationDivider brightIndices={[1, 3]} />

      {/* ── Value Props ── */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, paddingBottom: 48 }}>
        {valueProps.map((c) => (
          <div key={c.title} style={{ background: "var(--understory)", border: "1px solid var(--stardust)", borderRadius: 12, padding: 24 }}>
            <ConstellationDots color={c.dot} />
            <h3 style={{ fontFamily: fi, fontSize: 22, color: "var(--moonlight)", marginBottom: 8 }}>{c.title}</h3>
            <p style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)", lineHeight: 1.6 }}>{c.body}</p>
          </div>
        ))}
      </section>

      <ConstellationDivider brightIndices={[0, 2, 4]} />

      {/* ── How It Works ── */}
      <section style={{ paddingBottom: 48 }}>
        <SectionLabel>How It Works</SectionLabel>
        <h2 style={{ fontFamily: fi, fontSize: "clamp(28px, 4vw, 40px)", color: "var(--moonlight)", marginBottom: 40, lineHeight: 1.2 }}>
          From zero to methodology in one session
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingLeft: 20 }}>
          {steps.map((s, i) => (
            <div key={s.title} style={{ display: "flex", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 20 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.dot, boxShadow: `0 0 8px ${s.dot}`, marginTop: 4 }} />
                {i < steps.length - 1 && <span style={{ width: 1, flex: 1, background: "var(--stardust)", marginTop: 8 }} />}
              </div>
              <div>
                <h3 style={{ fontFamily: fd, fontSize: 16, fontWeight: 600, color: "var(--moonlight)", marginBottom: 4 }}>{s.title}</h3>
                <p style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)", lineHeight: 1.6 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rule Preview ── */}
      <section style={{ background: "var(--deep-canopy)", border: "1px solid var(--stardust)", borderRadius: 16, padding: "40px 32px", marginBottom: 48 }}>
        <SectionLabel>Sample Rules</SectionLabel>
        <h2 style={{ fontFamily: fi, fontSize: "clamp(24px, 3.5vw, 36px)", color: "var(--moonlight)", marginBottom: 28, lineHeight: 1.2 }}>
          What the methodology catches
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {rules.map((r) => (
            <div key={r.title} style={{ background: "var(--understory)", border: "1px solid var(--stardust)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--stardust)" }}>
                <h4 style={{ fontFamily: fd, fontSize: 14, fontWeight: 600, color: "var(--moonlight)" }}>{r.title}</h4>
                <span style={{ fontFamily: fj, fontSize: 10, color: r.tc, border: `1px solid ${r.tc}`, borderRadius: 4, padding: "2px 8px", opacity: 0.85, whiteSpace: "nowrap" }}>{r.tag}</span>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <p style={{ fontFamily: fd, fontSize: 13, color: "var(--dusk)", lineHeight: 1.6 }}>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ConstellationDivider brightIndices={[2]} />

      {/* ── Software 2.0 ── */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingBottom: 80 }}>
        <SectionLabel>The Architecture</SectionLabel>
        <h2 style={{ fontFamily: fi, fontSize: "clamp(24px, 3.5vw, 36px)", color: "var(--moonlight)", marginBottom: 24, lineHeight: 1.2 }}>
          Software 2.0 for knowledge workers
        </h2>
        <p style={{ fontFamily: fd, fontSize: 15, color: "var(--dusk)", lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
          The models are interchangeable. The architecture isn&rsquo;t. Vela is the operating layer &mdash; skills are your training data, CLAUDE.md is your program, agents are your runtime, and the validation loop is your test suite. When the models improve, your system improves with them. When you switch models, your methodology stays.
        </p>
        <svg viewBox="0 0 640 120" style={{ width: "100%", maxWidth: 600 }} aria-label="Architecture flow: Skills to Build Log with operational inheritance feedback loop">
          {diagramNodes.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={40} r={5} fill={n.c} />
              <text x={n.x} y={62} textAnchor="middle" fill="var(--dusk)" fontSize={11} fontFamily={fd}>{n.label}</text>
            </g>
          ))}
          {diagramEdges.map(([x1, x2], i) => (
            <line key={i} x1={x1} y1={40} x2={x2} y2={40} stroke="var(--stardust)" strokeWidth={1} />
          ))}
          <path d="M 600 45 C 600 100, 40 100, 40 45" fill="none" stroke="var(--star-gold)" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
          <text x={320} y={108} textAnchor="middle" fill="var(--star-gold)" fontSize={10} fontFamily={fj} opacity={0.6}>Operational Inheritance</text>
        </svg>
      </section>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 12px var(--star-gold); }
          50% { opacity: 0.5; box-shadow: 0 0 4px var(--star-gold); }
        }
      `}</style>
    </div>
  );
}
