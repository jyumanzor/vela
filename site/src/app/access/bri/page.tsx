import type { Metadata } from "next";
import {
  AccessShell, Hero, AnchorNav, Section, Card, CardGrid, StepList,
  Tags, StatStrip, LinkList, FAQ, GhostCTA, Bullets, ClosingCTA, fd,
} from "@/components/access/primitives";
import {
  claudeCodeStartHere, canonicalDocs, examplesToInspect,
  faqGeneral, harnessCompare, harnessSynthesis,
} from "@/data/access-content";

export const metadata: Metadata = {
  title: "Bri Access | Vela",
  description: "Bri's Vela hub: a front-end kit for the first build, with setup, resources, and a knowledge base.",
};

const ACCENT = "var(--lime)";

const status = [
  { label: "Access page", value: "Live", tone: ACCENT },
  { label: "Account", value: "Sign up first", tone: "var(--ember-copper)" },
  { label: "First surface", value: "Open" },
];

const skills = [
  "Operating Loop", "Build-Log Protocol", "Workspace Hygiene", "Frontend System",
  "Design Craft", "Color & Layout", "Spacing Enforcement", "Text Breathing Room",
  "Holistic Review", "Testing AI Output", "Cross-Model Review",
];

const agents = ["Holistic Reviewer", "Argument Reviewer", "Devil's Advocate"];

const frontendTips = [
  "Build one page, review it, then build the next. The review agents catch layout and hierarchy issues early.",
  "Keep your design tokens in one place. Consistency is what reads as 'designed,' not 'generated.'",
  "Run the holistic-review agent before you call a page done — it reads the page the way a visitor would.",
  "Whitespace is structure. When a section feels cramped, add room before you add elements.",
];

const frontendHelpers = [
  { label: "Custom skills for your design system", href: "https://code.claude.com/docs/en/skills", note: "Encode your color, spacing, and layout rules once; load them every build." },
  { label: "Subagents for design review", href: "https://code.claude.com/docs/en/sub-agents", note: "A second agent reviews hierarchy, contrast, and copy before you ship." },
  { label: "Hooks for guardrails", href: "https://code.claude.com/docs/en/hooks-guide", note: "Block the patterns you never want — banned fonts, off-palette colors — automatically." },
  { label: "MCP for live data and tools", href: "https://code.claude.com/docs/en/mcp", note: "Pull real content, APIs, or design sources into the build." },
];

const steps = [
  { title: "Open this access link", body: "You're here — this is your front door into Vela.", done: true },
  { title: "Create your Vela account", body: "Sign up with the email you want connected to your workspace." },
  { title: "Jenn links your client record", body: "After signup, Jenn connects the account so the dashboard loads your kit." },
  { title: "Choose your first surface", body: "A portfolio, a small site, or one focused tool — kept intentionally scoped." },
  { title: "Run your first session", body: "Start from the starter workspace and build one page cleanly." },
];

const anchors = [
  { label: "Start here", href: "#start" },
  { label: "Your kit", href: "#kit" },
  { label: "For your work", href: "#work" },
  { label: "Setup", href: "#setup" },
  { label: "FAQ", href: "#faq" },
  { label: "How it compares", href: "#compare" },
];

export default function BriAccessPage() {
  return (
    <AccessShell>
      <Hero
        eyebrow="Vela · Client Access"
        accent={ACCENT}
        title="Bri's Vela workspace"
        lede="A clean entry point for signup, account linking, and the first build. The access layer is ready; the first public project can stay intentionally scoped."
        primary={{ href: "/login?redirectTo=/dashboard", label: "Create your account" }}
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

      <Section id="kit" eyebrow="What's loaded" title="A frontend kit, ready to go." accent={ACCENT}
        intro="The rules behind clean, deliberate interfaces — loaded into every session so your first build doesn't look like a first build.">
        <CardGrid min={250}>
          <Card accent={ACCENT}>
            <Tags label="Skills" items={skills} />
          </Card>
          <Card>
            <Tags label="Background reviewers" items={agents} />
            <p style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.6, color: "var(--dusk)", margin: "18px 0 0" }}>
              Point them at a page and they review it the way a careful second set of eyes would — layout, hierarchy, and whether the copy actually reads.
            </p>
          </Card>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 13px" }}>Hooks</p>
            <p style={{ fontFamily: fd, fontSize: 14.5, lineHeight: 1.6, color: "var(--moonlight)", margin: 0 }}>
              Turn your design rules into checks that always run — no banned fonts, no off-palette colors — even when you’re moving fast.
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

      <Section id="work" eyebrow="For your work" title="Built for shipping interfaces." accent={ACCENT}
        intro="The pieces of the kit that matter most when the deliverable is a page someone will actually use.">
        <CardGrid min={280}>
          <Card accent={ACCENT}>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 16px" }}>Claude tips</p>
            <Bullets items={frontendTips} accent={ACCENT} />
          </Card>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 6px" }}>Frontend helpers</p>
            <LinkList items={frontendHelpers} />
          </Card>
        </CardGrid>
        <div style={{ marginTop: 28 }}>
          <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 6px" }}>Templates &amp; examples to inspect</p>
          <LinkList items={examplesToInspect} />
        </div>
      </Section>

      <Section id="setup" eyebrow="Get running" title="Five steps to your first page." accent={ACCENT}>
        <StepList steps={steps} accent={ACCENT} />
      </Section>

      <Section id="faq" eyebrow="Knowledge base" title="Questions, answered." accent={ACCENT}>
        <FAQ items={faqGeneral} />
      </Section>

      <Section id="compare" eyebrow="Best in class" title="How this approach compares." accent={ACCENT}
        intro="Honest framing against the leading agent frameworks — where Vela's skills-plus-hooks layer is strongest, and where the others are.">
        <LinkList items={harnessCompare} />
        <Card style={{ marginTop: 24 }}>
          <p style={{ fontFamily: fd, fontSize: 14.5, lineHeight: 1.7, color: "var(--dusk)", margin: 0 }}>{harnessSynthesis}</p>
        </Card>
      </Section>

      <Section eyebrow="Working together" title="Intake and scheduling." accent={ACCENT}>
        <CardGrid min={280}>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 15.5, fontWeight: 500, color: "var(--moonlight)", margin: 0 }}>Project intake</p>
            <p style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.6, color: "var(--dusk)", margin: "10px 0 0" }}>
              A short intake captures what you want to build, who it’s for, and the look you’re after — so your first session starts with direction.
            </p>
          </Card>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 15.5, fontWeight: 500, color: "var(--moonlight)", margin: 0 }}>Scheduling</p>
            <p style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.6, color: "var(--dusk)", margin: "10px 0 0" }}>
              Build sessions and reviews are booked with Jenn directly. Pick the rhythm that fits — a push to launch, or a steady weekly cadence.
            </p>
          </Card>
        </CardGrid>
      </Section>

      <ClosingCTA line="Charted, not guessed." href="/login?redirectTo=/dashboard" label="Create your account" accent={ACCENT} />
    </AccessShell>
  );
}
