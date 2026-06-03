import type { Metadata } from "next";
import {
  AccessShell, Hero, AnchorNav, Section, Card, CardGrid, StepList,
  Tags, StatStrip, LinkList, FAQ, GhostCTA, Bullets, ClosingCTA, fd, fj,
} from "@/components/access/primitives";
import {
  claudeCodeStartHere, canonicalDocs, examplesToInspect,
  faqGeneral, harnessCompare, harnessSynthesis,
} from "@/data/access-content";

export const metadata: Metadata = {
  title: "Matt Access | Vela",
  description: "Matt's Vela hub: a data kit for the music site and health dashboard, with setup, resources, and a knowledge base.",
};

const ACCENT = "var(--nebula-amber)";

const status = [
  { label: "Access page", value: "Live", tone: "var(--lime)" },
  { label: "Workspace", value: "Data kit" },
  { label: "First project", value: "Music site", tone: ACCENT },
];

const skills = [
  "Operating Loop", "Build-Log Protocol", "Workspace Hygiene", "Testifying Expert",
  "Cross-Model Review", "Plausible-but-Wrong Numbers", "Silent Data Drop", "AI Data Smoothing",
  "Data Provenance", "Interactive Visuals", "Holistic Review", "Testing AI Output", "Build-Time Enforcement",
];

const agents = ["Holistic Reviewer", "Argument Reviewer", "Devil's Advocate", "Citation Checker", "Daubert Verification"];

const dataTips = [
  "Never trust an API's sort order. Sort explicitly at the read boundary.",
  "Tag data provenance — raw, derived, or estimated. Don't let interpolated points pass as measured.",
  "When a number looks too smooth, check whether the AI filled a gap. Volatile data should look volatile.",
  "Keep music and health in separate workspaces. Health data stays local until the privacy boundary is set.",
];

const dataHelpers = [
  { label: "Custom skills for your data rules", href: "https://code.claude.com/docs/en/skills", note: "Encode how you handle sources, sorting, and provenance once." },
  { label: "Subagents to check the numbers", href: "https://code.claude.com/docs/en/sub-agents", note: "A second agent re-derives the figures and flags what doesn't add up." },
  { label: "Hooks to block unverified stats", href: "https://code.claude.com/docs/en/hooks-guide", note: "Stop a number from shipping until it has a provenance tag." },
  { label: "MCP for live data sources", href: "https://code.claude.com/docs/en/mcp", note: "Connect the APIs and datasets your dashboards read from." },
];

const projects = [
  { name: "Music Site", state: "Seed built locally", body: "A private workshop for recordings, session notes, collaborators, and project status.", tone: ACCENT },
  { name: "Health Dashboard", state: "Planned next", body: "A local-first tracker for PT, nutrition, blood work, and mobility once privacy boundaries are locked.", tone: "var(--dusk)" },
];

const steps = [
  { title: "Choose your tools", body: "Claude Code for building, Codex for review, or both." },
  { title: "Install Claude Code", body: "Set up the CLI on your machine." },
  { title: "Install Codex", body: "Add OpenAI Codex for the review pass." },
  { title: "Create your workspace", body: "One workspace holding both seed projects." },
  { title: "Install CLAUDE.md + skills", body: "Your portable rules load automatically every session." },
  { title: "Scaffold the music site", body: "The Next.js music archive seed is already built.", done: true },
  { title: "Scaffold the health dashboard", body: "Sample-data only until the privacy boundary is set." },
  { title: "Run your first session", body: "Start Claude Code and build your first page." },
];

const anchors = [
  { label: "Start here", href: "#start" },
  { label: "Your kit", href: "#kit" },
  { label: "Projects", href: "#projects" },
  { label: "For your work", href: "#work" },
  { label: "Setup", href: "#setup" },
  { label: "FAQ", href: "#faq" },
];

export default function MattAccessPage() {
  return (
    <AccessShell>
      <Hero
        eyebrow="Vela · Client Access"
        accent={ACCENT}
        title="Matt's build bench"
        lede="Start with music, keep health private, and use Vela as the operating layer for your first Claude Code sessions."
        primary={{ href: "/login?redirectTo=/dashboard", label: "Open your dashboard" }}
        secondary={{ href: "#start", label: "Start here" }}
      />
      <AnchorNav items={anchors} />

      <Section divider>
        <StatStrip items={status} />
      </Section>

      <Section id="start" eyebrow="When you're starting" title="Read these first." accent={ACCENT}
        intro="The shortest path from zero to a working first session. Five pages, in order.">
        <LinkList items={claudeCodeStartHere} />
      </Section>

      <Section id="kit" eyebrow="What's loaded" title="A data kit, ready to go." accent={ACCENT}
        intro="The same encoded judgment from real projects — catching unverified numbers and silent data drops before they ship.">
        <CardGrid min={250}>
          <Card accent={ACCENT}>
            <Tags label="Skills" items={skills} />
          </Card>
          <Card>
            <Tags label="Background reviewers" items={agents} />
            <p style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.6, color: "var(--dusk)", margin: "18px 0 0" }}>
              Point them at a dashboard or dataset and they check the way a careful analyst would — sources, sorting, and numbers that don't add up.
            </p>
          </Card>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 13px" }}>Hooks</p>
            <p style={{ fontFamily: fd, fontSize: 14.5, lineHeight: 1.6, color: "var(--moonlight)", margin: 0 }}>
              Turn your data rules into checks that always run — no number ships without a provenance tag — even when you're moving fast.
            </p>
            <div style={{ marginTop: 18 }}>
              <GhostCTA href="https://code.claude.com/docs/en/hooks-guide" accent={ACCENT}>How hooks work ↗</GhostCTA>
            </div>
          </Card>
        </CardGrid>
        <div style={{ marginTop: 28 }}>
          <LinkList items={canonicalDocs} />
        </div>
      </Section>

      <Section id="projects" eyebrow="Pinned" title="Your two projects." accent={ACCENT}
        intro="Music first, because it's useful immediately and low-risk. Health waits until the privacy boundary is explicit.">
        <CardGrid min={280}>
          {projects.map((p) => (
            <Card key={p.name} accent={p.tone === ACCENT ? ACCENT : undefined}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline" }}>
                <p style={{ fontFamily: fd, fontSize: 16, fontWeight: 600, color: "var(--moonlight)", margin: 0 }}>{p.name}</p>
                <span style={{ fontFamily: fj, fontSize: 11, color: p.tone }}>{p.state}</span>
              </div>
              <p style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.6, color: "var(--dusk)", margin: "12px 0 0" }}>{p.body}</p>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section id="work" eyebrow="For your work" title="Built for trustworthy data." accent={ACCENT}
        intro="The pieces of the kit that matter most when the deliverable is a dashboard people will make decisions from.">
        <CardGrid min={280}>
          <Card accent={ACCENT}>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 16px" }}>Claude tips</p>
            <Bullets items={dataTips} accent={ACCENT} />
          </Card>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 6px" }}>Data helpers</p>
            <LinkList items={dataHelpers} />
          </Card>
        </CardGrid>
        <div style={{ marginTop: 28 }}>
          <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 6px" }}>Templates &amp; examples to inspect</p>
          <LinkList items={examplesToInspect} />
        </div>
      </Section>

      <Section id="setup" eyebrow="Get running" title="Eight steps to your first session." accent={ACCENT}>
        <StepList steps={steps} accent={ACCENT} />
      </Section>

      <Section id="faq" eyebrow="Knowledge base" title="Questions, answered." accent={ACCENT}>
        <FAQ items={faqGeneral} />
      </Section>

      <Section eyebrow="Best in class" title="How this approach compares." accent={ACCENT}
        intro="Honest framing against the leading agent frameworks — where Vela's skills-plus-hooks layer is strongest, and where the others are.">
        <LinkList items={harnessCompare} />
        <Card style={{ marginTop: 24 }}>
          <p style={{ fontFamily: fd, fontSize: 14.5, lineHeight: 1.7, color: "var(--dusk)", margin: 0 }}>{harnessSynthesis}</p>
        </Card>
      </Section>

      <ClosingCTA line="Charted, not guessed." href="/login?redirectTo=/dashboard" label="Open your dashboard" accent={ACCENT} />
    </AccessShell>
  );
}
