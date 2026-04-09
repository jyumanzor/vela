import Link from "next/link";
import { tools, decisionGuide } from "@/data/tools";
import { ConstellationDivider } from "@/components/ConstellationDivider";

const fi = "var(--font-instrument), serif";
const fd = "var(--font-dm-sans), sans-serif";
const fj = "var(--font-jetbrains), monospace";

const badgeColors: Record<string, { bg: string; border: string; text: string }> = {
  primary: { bg: "rgba(212, 168, 67, 0.12)", border: "var(--star-gold)", text: "var(--star-gold)" },
  secondary: { bg: "rgba(200, 123, 86, 0.12)", border: "var(--ember-copper)", text: "var(--ember-copper)" },
  optional: { bg: "rgba(86, 107, 92, 0.12)", border: "var(--constellation)", text: "var(--constellation)" },
};

export default function ToolsPage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 48 }}>
        <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.15em", color: "var(--constellation)", textTransform: "uppercase", marginBottom: 8 }}>
          Tools
        </p>
        <h1 style={{ fontFamily: fi, fontSize: "clamp(36px, 5vw, 56px)", color: "var(--moonlight)", lineHeight: 1.1, marginBottom: 12 }}>
          Right tool for each task
        </h1>
        <p style={{ fontFamily: fd, fontSize: 16, color: "var(--dusk)", maxWidth: 480, lineHeight: 1.5 }}>
          Not about picking one. About knowing when each shines.
        </p>
      </section>

      {/* Tool Cards */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20, paddingBottom: 48 }}>
        {tools.map((tool) => {
          const badge = badgeColors[tool.recommendation];
          const isPrimary = tool.recommendation === "primary";
          return (
            <div
              key={tool.id}
              style={{
                background: "var(--understory)",
                border: "1px solid var(--stardust)",
                borderLeft: isPrimary ? "3px solid var(--star-gold)" : "1px solid var(--stardust)",
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Header */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <h3 style={{ fontFamily: fi, fontSize: 22, color: "var(--moonlight)" }}>{tool.name}</h3>
                  <span style={{ fontFamily: fj, fontSize: 10, color: badge.text, border: `1px solid ${badge.border}`, background: badge.bg, borderRadius: 4, padding: "2px 8px", textTransform: "capitalize", whiteSpace: "nowrap" }}>
                    {tool.recommendation}
                  </span>
                </div>
                <p style={{ fontFamily: fj, fontSize: 11, color: "var(--constellation)" }}>{tool.maker}</p>
              </div>

              {/* Tagline */}
              <p style={{ fontFamily: fd, fontSize: 13, color: "var(--dusk)", lineHeight: 1.5 }}>{tool.tagline}</p>

              {/* Strengths */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {tool.strengths.map((s) => (
                  <span key={s.label} style={{ fontFamily: fd, fontSize: 11, color: "var(--dusk)", background: "var(--deep-canopy)", border: "1px solid var(--stardust)", borderRadius: 4, padding: "2px 8px" }}>
                    {s.label}
                  </span>
                ))}
              </div>

              {/* Best For */}
              <div style={{ marginTop: "auto" }}>
                <p style={{ fontFamily: fj, fontSize: 10, color: "var(--constellation)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Best for</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
                  {tool.bestFor.map((b) => (
                    <li key={b} style={{ fontFamily: fd, fontSize: 12, color: "var(--moonlight)", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: badge.text, flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      <ConstellationDivider brightIndices={[1, 3]} />

      {/* Decision Guide */}
      <section style={{ paddingBottom: 48 }}>
        <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.15em", color: "var(--constellation)", textTransform: "uppercase", marginBottom: 8 }}>
          Decision Guide
        </p>
        <h2 style={{ fontFamily: fi, fontSize: "clamp(24px, 3.5vw, 36px)", color: "var(--moonlight)", marginBottom: 12, lineHeight: 1.2 }}>
          What are you doing right now?
        </h2>
        <p style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)", marginBottom: 28 }}>
          Match the task to the tool.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "var(--deep-canopy)", border: "1px solid var(--stardust)", borderRadius: 12, overflow: "hidden" }}>
          {decisionGuide.map((item, i) => (
            <div
              key={item.task}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: i < decisionGuide.length - 1 ? "1px solid var(--stardust)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, boxShadow: `0 0 6px ${item.color}`, flexShrink: 0 }} />
                <span style={{ fontFamily: fd, fontSize: 14, color: "var(--moonlight)" }}>{item.task}</span>
              </div>
              <span style={{ fontFamily: fj, fontSize: 12, color: item.color }}>{item.tool}</span>
            </div>
          ))}
        </div>
      </section>

      <ConstellationDivider brightIndices={[0, 4]} />

      {/* Setup CTAs */}
      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingBottom: 80 }}>
        <h2 style={{ fontFamily: fi, fontSize: "clamp(24px, 3.5vw, 36px)", color: "var(--moonlight)", marginBottom: 12, lineHeight: 1.2 }}>
          Get started
        </h2>
        <p style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)", marginBottom: 32 }}>
          Set up your tools and start building with methodology.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="#"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              background: "var(--star-gold)",
              color: "var(--forest-floor)",
              fontFamily: fd,
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Set up Claude Code {"\u2192"}
          </Link>
          <Link
            href="#"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              background: "transparent",
              color: "var(--ember-copper)",
              fontFamily: fd,
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 8,
              textDecoration: "none",
              border: "1px solid var(--ember-copper)",
            }}
          >
            Set up Codex {"\u2192"}
          </Link>
        </div>
      </section>
    </div>
  );
}
