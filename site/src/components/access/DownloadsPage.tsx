import { readFileSync } from "node:fs";
import { join } from "node:path";
import { AccessShell, Card, Section, StatStrip, fd, fi, fj } from "./primitives";
import { CopyMarkdownButton } from "./CopyMarkdownButton";
import type { ClientDownloadFile, ClientDownloadKit } from "@/data/client-downloads";

function readPublicMarkdown(href: string): string {
  const publicPath = href.replace(/^\//, "");
  return readFileSync(join(process.cwd(), "public", publicPath), "utf8");
}

function MarkdownResource({
  file,
  accent,
  defaultOpen,
}: {
  file: ClientDownloadFile;
  accent: string;
  defaultOpen?: boolean;
}) {
  const content = readPublicMarkdown(file.href);

  return (
    <details
      open={defaultOpen}
      style={{
        borderTop: "1px solid var(--hairline)",
        padding: "18px 0",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 18,
          alignItems: "center",
          listStyle: "none",
        }}
      >
        <span>
          <span style={{ display: "block", fontFamily: fd, fontSize: 16, fontWeight: 700, color: "var(--moonlight)" }}>{file.label}</span>
          <span style={{ display: "block", fontFamily: fd, fontSize: 13.5, color: "var(--dusk)", marginTop: 4, lineHeight: 1.45 }}>{file.note}</span>
        </span>
        <span style={{ fontFamily: fj, fontSize: 12, color: accent, textAlign: "right" }}>{file.href.split("/").pop()} · open</span>
      </summary>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <CopyMarkdownButton text={content} accent={accent} />
        <a
          href={file.href}
          download
          style={{
            fontFamily: fd,
            fontSize: 13,
            fontWeight: 700,
            color: "var(--forest-floor)",
            background: accent,
            border: `1px solid ${accent}`,
            borderRadius: "var(--radius-pill)",
            padding: "8px 14px",
            textDecoration: "none",
          }}
        >
          Download .md
        </a>
        <a
          href={file.href}
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: fd,
            fontSize: 13,
            fontWeight: 700,
            color: "var(--dusk)",
            border: "1px solid var(--hairline-strong)",
            borderRadius: "var(--radius-pill)",
            padding: "8px 14px",
            textDecoration: "none",
          }}
        >
          Open raw
        </a>
      </div>
      <pre
        style={{
          margin: "16px 0 0",
          maxHeight: 430,
          overflow: "auto",
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          fontFamily: fj,
          fontSize: 12.5,
          lineHeight: 1.65,
          color: "var(--moonlight)",
          background: "linear-gradient(180deg, color-mix(in oklab, var(--understory) 86%, transparent), color-mix(in oklab, var(--deep-canopy) 92%, transparent))",
          border: "1px solid var(--hairline)",
          borderTopColor: accent,
          borderRadius: "var(--radius-card)",
          padding: 18,
        }}
      >
        {content}
      </pre>
    </details>
  );
}

export function DownloadsPage({ kit }: { kit: ClientDownloadKit }) {
  const totalFiles = kit.groups.reduce((sum, group) => sum + group.files.length, 0);
  const skills = kit.groups.find((group) => group.label === "Skills")?.files.length ?? 0;
  const agents = kit.groups.find((group) => group.label === "Agents")?.files.length ?? 0;

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
            background: `radial-gradient(closest-side, color-mix(in oklab, ${kit.accent} 13%, transparent), transparent)`,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: fj, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--constellation)" }}>
            <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: kit.accent, boxShadow: `0 0 8px ${kit.accent}` }} />
            Vela · Markdown Downloads
          </span>
          <h1 style={{ fontFamily: fi, fontSize: "clamp(42px, 6.6vw, 72px)", lineHeight: 1, letterSpacing: "-0.015em", color: "var(--moonlight)", margin: "22px 0 0" }}>
            {kit.title}
          </h1>
          <p style={{ fontFamily: fd, fontSize: 18, lineHeight: 1.6, color: "var(--dusk)", maxWidth: 620, margin: "24px 0 0" }}>{kit.lede}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
            <a
              href={`/access/${kit.slug}`}
              style={{ fontFamily: fd, fontSize: 14, fontWeight: 700, color: kit.accent, border: `1px solid ${kit.accent}`, borderRadius: "var(--radius-pill)", padding: "10px 18px", textDecoration: "none" }}
            >
              Back to access hub
            </a>
            <a
              href={`/access/${kit.slug}/workspace`}
              style={{ fontFamily: fd, fontSize: 14, fontWeight: 700, color: "var(--dusk)", border: "1px solid var(--hairline-strong)", borderRadius: "var(--radius-pill)", padding: "10px 18px", textDecoration: "none" }}
            >
              Open workspace
            </a>
          </div>
        </div>
      </header>

      <Section divider accent={kit.accent}>
        <StatStrip
          items={[
            { label: "Markdown files", value: String(totalFiles), tone: kit.accent },
            { label: "Skills", value: String(skills) },
            { label: "Agents", value: String(agents) },
          ]}
        />
      </Section>

      {kit.groups.map((group) => (
        <Section key={group.label} eyebrow={group.label} title={group.label} intro={group.intro} accent={kit.accent}>
          <Card accent={group.label === "Starter files" ? kit.accent : undefined}>
            {group.files.map((file, index) => (
              <MarkdownResource key={file.href} file={file} accent={kit.accent} defaultOpen={group.label === "Starter files" && index === 0} />
            ))}
          </Card>
        </Section>
      ))}
    </AccessShell>
  );
}
