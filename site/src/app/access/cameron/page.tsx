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
  title: "Cameron Access | Vela",
  description: "Cameron's Vela hub: a writing kit tuned for long-form academic research, with setup, resources, and a knowledge base.",
};

const ACCENT = "var(--star-gold)";

const status = [
  { label: "Access page", value: "Live", tone: "var(--lime)" },
  { label: "Workspace", value: "Writing kit" },
  { label: "First project", value: "White papers", tone: ACCENT },
];

const skills = [
  "Operating Loop", "Build-Log Protocol", "Workspace Hygiene", "Testifying Expert",
  "Cross-Model Review", "Plausible-but-Wrong Numbers", "Silent Data Drop", "AI Data Smoothing",
  "Multi-Round Editing", "Word-Document Review", "Holistic Review", "Testing AI Output",
];

const agents = ["Citation Checker", "Daubert Verification", "Devil's Advocate", "Holistic Reviewer", "Argument Reviewer"];

const researchTips = [
  "Tag every number PUBLISHED, DERIVED, or ANALYST. If you can't trace it, flag it — don't let it ship.",
  "Run each section through build → challenge → resolve → promote. The challenge pass is a subagent arguing against you.",
  "Keep papers, data, and drafts in separate reference folders. Claude cites better when the material is organized.",
  "Before you submit, run the provenance and citation check. A hook can make that automatic.",
];

const researchHelpers = [
  { label: "Custom skills for methodology", href: "https://code.claude.com/docs/en/skills", note: "Encode your research method once; reuse it across every paper." },
  { label: "Subagents for adversarial review", href: "https://code.claude.com/docs/en/sub-agents", note: "Spawn an agent whose job is to argue against your thesis before submission." },
  { label: "Hooks for citation rules", href: "https://code.claude.com/docs/en/hooks-guide", note: "Auto-enforce provenance tags and citation format on every save." },
  { label: "CLAUDE.md for research instructions", href: "https://code.claude.com/docs/en/memory", note: "Document your voice, terminology, and required sections once." },
];

const steps = [
  { title: "Choose your tools", body: "Claude Code for writing, Codex for review, or both." },
  { title: "Install Claude Code", body: "Set up the CLI on your machine." },
  { title: "Install Codex", body: "Add OpenAI Codex for the adversarial review pass." },
  { title: "Create your workspace", body: "One project folder for the white-paper work." },
  { title: "Organize reference docs", body: "Drop source material into the right folders." },
  { title: "Install CLAUDE.md + skills", body: "Your portable rules load automatically every session." },
  { title: "Run your first session", body: "Start Claude Code and confirm the kit loads." },
];

const anchors = [
  { label: "Start here", href: "#start" },
  { label: "Your kit", href: "#kit" },
  { label: "For your work", href: "#work" },
  { label: "Setup", href: "#setup" },
  { label: "FAQ", href: "#faq" },
  { label: "How it compares", href: "#compare" },
];

export default function CameronAccessPage() {
  return (
    <AccessShell>
      <Hero
        eyebrow="Vela · Client Access"
        accent={ACCENT}
        title="Cameron's writing desk"
        lede="An AI operating layer tuned for long-form research writing: encoded judgment, citation checks, and adversarial review — loaded before you write a word."
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

      <Section id="kit" eyebrow="What's loaded" title="Twelve skills, five reviewers, deterministic hooks." accent={ACCENT}
        intro="Every session starts with the same encoded judgment — the lessons from real projects, already in context so you never re-explain them.">
        <CardGrid min={250}>
          <Card accent={ACCENT}>
            <Tags label="Skills" items={skills} />
          </Card>
          <Card>
            <Tags label="Background reviewers" items={agents} />
            <p style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.6, color: "var(--dusk)", margin: "18px 0 0" }}>
              Upload a draft and these run in the background — checking citations, testing the argument, and flagging numbers that were never verified.
            </p>
          </Card>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 13px" }}>Hooks</p>
            <p style={{ fontFamily: fd, fontSize: 14.5, lineHeight: 1.6, color: "var(--moonlight)", margin: 0 }}>
              Turn your non-negotiables into checks that always run — provenance tags present, citations complete — even when you're moving fast.
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

      <Section id="work" eyebrow="For your work" title="Built for research writing." accent={ACCENT}
        intro="The pieces of the kit that matter most when the deliverable is a defensible, cited paper.">
        <CardGrid min={280}>
          <Card accent={ACCENT}>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 16px" }}>Claude tips</p>
            <Bullets items={researchTips} accent={ACCENT} />
          </Card>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 6px" }}>Research helpers</p>
            <LinkList items={researchHelpers} />
          </Card>
        </CardGrid>
        <div style={{ marginTop: 28 }}>
          <p style={{ fontFamily: fd, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--constellation)", margin: "0 0 6px" }}>Templates &amp; examples to inspect</p>
          <LinkList items={examplesToInspect} />
        </div>
      </Section>

      <Section id="setup" eyebrow="Get running" title="Seven steps to your first session." accent={ACCENT}>
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
              When you start something new, a short intake captures the goal, the sources, and the deadline — so your first session begins with the work, not setup.
            </p>
          </Card>
          <Card>
            <p style={{ fontFamily: fd, fontSize: 15.5, fontWeight: 500, color: "var(--moonlight)", margin: 0 }}>Scheduling</p>
            <p style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.6, color: "var(--dusk)", margin: "10px 0 0" }}>
              Working sessions and check-ins are booked with Jenn directly. The cadence is yours: a sprint to a deadline, or a steady weekly rhythm.
            </p>
          </Card>
        </CardGrid>
      </Section>

      <ClosingCTA line="Charted, not guessed." href="/login?redirectTo=/dashboard" label="Open your dashboard" accent={ACCENT} />
    </AccessShell>
  );
}
