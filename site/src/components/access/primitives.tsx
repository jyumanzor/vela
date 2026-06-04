import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

/* ── Shared access-page design system ──────────────────────────────
   One sleek grammar for every Vela client resource page. Apple/Oura
   register: lots of air, hairline dividers instead of boxes, one accent,
   soft elevation. Keeps the Vela forest-night brand and fonts. */

export const fi = "var(--font-instrument), serif";
export const fd = "var(--font-dm-sans), sans-serif";
export const fj = "var(--font-jetbrains), monospace";

const GOLD = "var(--star-gold)";

/* Focused, generously-padded column. Top padding clears the fixed nav. */
export function AccessShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: 940, margin: "0 auto", padding: "clamp(124px, 15vh, 168px) 24px 64px" }}>
      {children}
    </div>
  );
}

/* One quiet eyebrow per section. A single accent dot is the only color. */
export function Eyebrow({ children, accent = GOLD }: { children: ReactNode; accent?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontFamily: fj,
        fontSize: 11,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: "var(--constellation)",
      }}
    >
      <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: accent, boxShadow: `0 0 8px ${accent}` }} />
      {children}
    </span>
  );
}

/* The one filled pill per page. Label must say what happens on click. */
export function PrimaryCTA({ href, children, accent = GOLD }: { href: string; children: ReactNode; accent?: string }) {
  return (
    <Link
      href={href}
      className="access-cta"
      style={{
        fontFamily: fd,
        fontSize: 15,
        fontWeight: 600,
        color: "var(--forest-floor)",
        background: accent,
        borderRadius: "var(--radius-pill)",
        padding: "13px 26px",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Link>
  );
}

/* Quiet secondary — text + arrow, no box. */
export function QuietLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="access-quiet"
      style={{ fontFamily: fd, fontSize: 15, fontWeight: 500, color: "var(--moonlight)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}
    >
      {children}
      <span aria-hidden className="access-quiet-arrow" style={{ color: "var(--dusk)" }}>
        →
      </span>
    </a>
  );
}

/* Faint Vela constellation — fills the hero's open side, ties to the brand. Hidden on mobile. */
function HeroConstellation({ accent = GOLD }: { accent?: string }) {
  const pts: [number, number][] = [
    [24, 54], [80, 24], [150, 48], [214, 28], [196, 112], [120, 152], [56, 116],
  ];
  const lines: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [2, 4], [1, 6],
  ];
  const bright = new Set([1, 3, 4]);
  return (
    <svg
      className="access-hero-constellation"
      width="300"
      height="225"
      viewBox="0 0 240 180"
      aria-hidden
      style={{ position: "absolute", top: -8, right: -12, opacity: 0.5, zIndex: 0, pointerEvents: "none" }}
    >
      {lines.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="var(--constellation)" strokeWidth={1} opacity={0.5} />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={bright.has(i) ? 2.6 : 1.5} fill={bright.has(i) ? accent : "var(--dusk)"} />
      ))}
    </svg>
  );
}

/* Hero — single-column statement over an accent halo and a faint constellation. */
export function Hero({
  eyebrow,
  title,
  lede,
  accent = GOLD,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  accent?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <header style={{ position: "relative" }}>
      <div
        aria-hidden
        style={{ position: "absolute", top: -150, left: -90, width: 600, height: 460, pointerEvents: "none", zIndex: 0, background: `radial-gradient(closest-side, color-mix(in oklab, ${accent} 13%, transparent), transparent)` }}
      />
      <HeroConstellation accent={accent} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        <h1
          style={{
            fontFamily: fi,
            fontSize: "clamp(46px, 7.5vw, 86px)",
            lineHeight: 1.0,
            letterSpacing: "-0.015em",
            color: "var(--moonlight)",
            margin: "22px 0 0",
            maxWidth: 760,
          }}
        >
          {title}
        </h1>
        <p style={{ fontFamily: fd, fontSize: "clamp(17px, 2.2vw, 19px)", lineHeight: 1.6, color: "var(--dusk)", maxWidth: 560, margin: "26px 0 0" }}>
          {lede}
        </p>
        {(primary || secondary) && (
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, marginTop: 38 }}>
            {primary && (
              <PrimaryCTA href={primary.href} accent={accent}>
                {primary.label}
              </PrimaryCTA>
            )}
            {secondary && <QuietLink href={secondary.href}>{secondary.label}</QuietLink>}
          </div>
        )}
      </div>
    </header>
  );
}

/* Celestial section rule — a fading hairline anchored by one glowing accent star. */
function SectionRule({ accent = GOLD }: { accent?: string }) {
  return (
    <div aria-hidden style={{ position: "relative", height: 1, width: "100%", background: "linear-gradient(to right, var(--hairline-strong), var(--hairline) 45%, transparent)" }}>
      <span style={{ position: "absolute", left: 0, top: "50%", width: 6, height: 6, marginTop: -3, borderRadius: "50%", background: accent, boxShadow: `0 0 10px ${accent}` }} />
    </div>
  );
}

/* Section — vertical rhythm anchored by a celestial rule. No heavy boxes. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  accent = GOLD,
  children,
  divider = true,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  accent?: string;
  children?: ReactNode;
  divider?: boolean;
}) {
  const hasHead = Boolean(eyebrow || title || intro);
  const gap = divider ? 38 : 0;
  return (
    <section id={id} style={{ marginTop: 84, scrollMarginTop: 96 }}>
      {divider && <SectionRule accent={accent} />}
      {eyebrow && (
        <div style={{ marginTop: gap }}>
          <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        </div>
      )}
      {title && (
        <h2
          style={{
            fontFamily: fi,
            fontSize: "clamp(29px, 4.2vw, 44px)",
            lineHeight: 1.06,
            letterSpacing: "-0.015em",
            color: "var(--moonlight)",
            margin: eyebrow ? "16px 0 0" : `${gap}px 0 0`,
            maxWidth: 640,
          }}
        >
          {title}
        </h2>
      )}
      {intro && <p style={{ fontFamily: fd, fontSize: 17, lineHeight: 1.65, color: "var(--dusk)", maxWidth: 600, margin: "18px 0 0" }}>{intro}</p>}
      {children && <div style={{ marginTop: hasHead ? 32 : gap }}>{children}</div>}
    </section>
  );
}

/* Soft elevated card — gradient depth, accent crown-glow, lifts on hover. No nesting. */
export function Card({ children, accent, style }: { children: ReactNode; accent?: string; style?: CSSProperties }) {
  return (
    <div
      className="access-card"
      style={{ padding: 26, ...(accent ? { borderTopColor: `color-mix(in oklab, ${accent} 60%, var(--hairline))` } : null), ...style }}
    >
      {accent && (
        <div
          aria-hidden
          className="access-card-glow"
          style={{ background: `radial-gradient(135% 72% at 50% 0%, color-mix(in oklab, ${accent} 13%, transparent), transparent 58%)` }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

/* Responsive auto-fit grid for cards. */
export function CardGrid({ children, min = 240 }: { children: ReactNode; min?: number }) {
  return <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`, gap: 16 }}>{children}</div>;
}

/* Quiet numbered checklist — hairline rows, no filled boxes (except done). */
export function StepList({ steps, accent = GOLD }: { steps: { title: string; body?: string; done?: boolean }[]; accent?: string }) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          style={{
            display: "grid",
            gridTemplateColumns: "32px 1fr",
            gap: 16,
            alignItems: "start",
            padding: "16px 0",
            borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fj,
              fontSize: 11,
              color: s.done ? "var(--forest-floor)" : "var(--dusk)",
              background: s.done ? accent : "transparent",
              border: s.done ? `1px solid ${accent}` : "1px solid var(--hairline-strong)",
            }}
          >
            {s.done ? "✓" : i + 1}
          </span>
          <div style={{ paddingTop: 2 }}>
            <p style={{ fontFamily: fd, fontSize: 15.5, fontWeight: 500, color: "var(--moonlight)", margin: 0, lineHeight: 1.4 }}>{s.title}</p>
            {s.body && <p style={{ fontFamily: fd, fontSize: 14, color: "var(--dusk)", margin: "5px 0 0", lineHeight: 1.55 }}>{s.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* Quiet pill cluster — skills, agents, tech. */
export function Tags({ items, label }: { items: string[]; label?: string }) {
  return (
    <div>
      {label && <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 13px" }}>{label}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: fj,
              fontSize: 12,
              color: "var(--dusk)",
              background: "var(--understory)",
              border: "1px solid var(--hairline)",
              borderRadius: "var(--radius-pill)",
              padding: "6px 13px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Stat strip — label/value pairs, separated by air not boxes. */
export function StatStrip({ items }: { items: { label: string; value: string; tone?: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 28 }}>
      {items.map((it) => (
        <div key={it.label}>
          <p style={{ fontFamily: fj, fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--constellation)", margin: 0 }}>{it.label}</p>
          <p style={{ fontFamily: fd, fontSize: 16, fontWeight: 500, color: it.tone || "var(--moonlight)", margin: "9px 0 0" }}>{it.value}</p>
        </div>
      ))}
    </div>
  );
}

/* Closing call-to-action band — a final accent glow, centered. */
export function ClosingCTA({ line, href, label, accent = GOLD }: { line: string; href: string; label: string; accent?: string }) {
  return (
    <section style={{ position: "relative", marginTop: 96, paddingTop: 60, borderTop: "1px solid var(--hairline)", textAlign: "center" }}>
      <div
        aria-hidden
        style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", width: 460, height: 240, pointerEvents: "none", zIndex: 0, background: `radial-gradient(closest-side, color-mix(in oklab, ${accent} 12%, transparent), transparent)` }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: fi, fontSize: "clamp(26px, 3.6vw, 36px)", fontStyle: "italic", color: "var(--moonlight)", margin: "0 auto 26px", maxWidth: 520, lineHeight: 1.25 }}>{line}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PrimaryCTA href={href} accent={accent}>
            {label}
          </PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

/* Quiet in-page jump nav — sits under the hero on long hubs. Not sticky. */
export function AnchorNav({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", marginTop: 42 }}>
      {items.map((it) => (
        <a key={it.href} href={it.href} className="access-anchor" style={{ fontFamily: fj, fontSize: 12, letterSpacing: "0.06em", color: "var(--dusk)", textDecoration: "none" }}>
          {it.label}
        </a>
      ))}
    </nav>
  );
}

/* List of labeled links with a note + arrow. Doc links, repos, resources.
   External links (http) open in a new tab and show ↗; internal show →. */
export function LinkList({ items }: { items: { label: string; href: string; note?: string; external?: boolean }[] }) {
  return (
    <div>
      {items.map((it, i) => {
        const ext = it.external ?? it.href.startsWith("http");
        return (
          <a
            key={it.href + i}
            href={it.href}
            target={ext ? "_blank" : undefined}
            rel={ext ? "noreferrer" : undefined}
            className="access-row"
            style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 18, alignItems: "center", padding: "16px 14px", borderTop: i === 0 ? "none" : "1px solid var(--hairline)", textDecoration: "none" }}
          >
            <span>
              <span style={{ display: "block", fontFamily: fd, fontSize: 15.5, fontWeight: 500, color: "var(--moonlight)" }}>{it.label}</span>
              {it.note && <span style={{ display: "block", fontFamily: fd, fontSize: 13.5, lineHeight: 1.5, color: "var(--dusk)", marginTop: 4 }}>{it.note}</span>}
            </span>
            <span aria-hidden className="access-row-arrow" style={{ fontFamily: fj, fontSize: 13, color: "var(--constellation)" }}>
              {ext ? "↗" : "→"}
            </span>
          </a>
        );
      })}
    </div>
  );
}

/* Native accordion — server-rendered, no JS. The + rotates to × when open. */
export function FAQ({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div>
      {items.map((it, i) => (
        <details key={i} className="access-faq" style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)" }}>
          <summary
            className="access-faq-summary"
            style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", gap: 18, alignItems: "center", padding: "18px 2px", fontFamily: fd, fontSize: 16, fontWeight: 500, color: "var(--moonlight)" }}
          >
            {it.q}
            <span aria-hidden className="access-faq-mark" style={{ fontFamily: fj, fontSize: 17, color: "var(--constellation)", flexShrink: 0 }}>
              +
            </span>
          </summary>
          <div style={{ fontFamily: fd, fontSize: 14.5, lineHeight: 1.65, color: "var(--dusk)", padding: "0 2px 20px", maxWidth: 660 }}>{it.a}</div>
        </details>
      ))}
    </div>
  );
}

/* Outline pill for in-card secondary actions. */
export function GhostCTA({ href, children, accent = GOLD, external }: { href: string; children: ReactNode; accent?: string; external?: boolean }) {
  const ext = external ?? href.startsWith("http");
  return (
    <a
      href={href}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noreferrer" : undefined}
      className="access-cta"
      style={{ fontFamily: fd, fontSize: 14, fontWeight: 600, color: accent, border: `1px solid ${accent}`, borderRadius: "var(--radius-pill)", padding: "10px 20px", textDecoration: "none", display: "inline-block", background: "transparent" }}
    >
      {children}
    </a>
  );
}

/* Quiet accent-dot bullet list — tips, principles. */
export function Bullets({ items, accent = GOLD }: { items: string[]; accent?: string }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 14 }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: "grid", gridTemplateColumns: "14px 1fr", gap: 12, alignItems: "start" }}>
          <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: accent, marginTop: 8 }} />
          <span style={{ fontFamily: fd, fontSize: 14.5, lineHeight: 1.6, color: "var(--dusk)" }}>{t}</span>
        </li>
      ))}
    </ul>
  );
}
