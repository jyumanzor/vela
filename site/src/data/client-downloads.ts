export interface ClientDownloadFile {
  label: string;
  href: string;
  note: string;
}

export interface ClientDownloadGroup {
  label: string;
  intro: string;
  files: ClientDownloadFile[];
}

export interface ClientDownloadKit {
  slug: string;
  name: string;
  accent: string;
  title: string;
  lede: string;
  groups: ClientDownloadGroup[];
}

const cameronSkills: ClientDownloadFile[] = [
  ["Operating Loop", "operating-loop.md", "Build, challenge, resolve, promote."],
  ["Build-Log Protocol", "build-log-protocol.md", "Cross-session memory."],
  ["Workspace Hygiene", "workspace-hygiene.md", "Folder structure and canonical outputs."],
  ["Testifying Expert", "testifying-expert.md", "Provenance and defensibility checks."],
  ["Cross-Model Review", "cross-model-review.md", "Adversarial review protocol."],
  ["Plausible-but-Wrong Numbers", "plausible-but-wrong-numbers.md", "Catch fabricated statistics."],
  ["Silent Data Drop", "silent-data-drop.md", "Catch missing filtered data."],
  ["AI Data Smoothing", "ai-data-smoothing.md", "Catch interpolated or over-smoothed data."],
  ["Multi-Round Editing", "multi-round-editing.md", "Handle revision cycles without regression."],
  ["Word Document Review", "word-document-review.md", "Review comments, changes, tables, and hidden Word surfaces."],
  ["Holistic Review", "holistic-review.md", "End-to-end drift check."],
  ["Testing AI Output", "testing-ai-output.md", "Validation checkpoints for AI-generated work."],
  ["Build-Time Enforcement", "build-time-enforcement.md", "Turn important rules into checks."],
  ["Claude Handoff Notes", "claude-handoff-notes.md", "Brief an agent clearly."],
  ["Operational Inheritance", "operational-inheritance.md", "Promote durable lessons."],
].map(([label, file, note]) => ({ label, href: `/kits/cameron/skills/${file}`, note }));

const cameronAgents: ClientDownloadFile[] = [
  ["Citation Checker", "citation-checker.md", "Find uncited claims and provenance gaps."],
  ["Daubert Verification", "daubert-verification.md", "Test data claims for defensibility."],
  ["Devil's Advocate", "devils-advocate.md", "Attack the argument before an external reader does."],
  ["Holistic Reviewer", "holistic-reviewer.md", "Read the whole draft for drift and coherence."],
  ["Argument Reviewer", "argument-reviewer.md", "Find logic gaps and unsupported leaps."],
].map(([label, file, note]) => ({ label, href: `/kits/cameron/agents/${file}`, note }));

const rishmithaaSkills: ClientDownloadFile[] = [
  ["Operating Loop", "operating-loop.md", "Build, review, fix, log."],
  ["Build-Log Protocol", "build-log-protocol.md", "Cross-session memory."],
  ["Workspace Hygiene", "workspace-hygiene.md", "Folder structure and canonical outputs."],
  ["Frontend System", "frontend-system.md", "Choose the right page shape before building."],
  ["Design Craft", "design-craft.md", "Make the page feel intentional."],
  ["Color And Layout", "color-and-layout.md", "Contrast, palette, and panel rhythm."],
  ["Spacing Enforcement", "spacing-enforcement.md", "Text fit and spacing rules."],
  ["Text Breathing Room", "text-breathing-room.md", "Pills, badges, buttons, and text-heavy panels."],
  ["Holistic Review", "holistic-review.md", "End-to-end page critique."],
  ["Testing AI Output", "testing-ai-output.md", "Validation checkpoints for AI-generated work."],
  ["Cross-Model Review", "cross-model-review.md", "Second-reader review loop."],
  ["Claude Handoff Notes", "claude-handoff-notes.md", "Brief an agent clearly."],
  ["Operational Inheritance", "operational-inheritance.md", "Promote durable lessons."],
].map(([label, file, note]) => ({ label, href: `/kits/rishmithaa/skills/${file}`, note }));

const rishmithaaAgents: ClientDownloadFile[] = [
  ["Holistic Reviewer", "holistic-reviewer.md", "Review the full page like a first-time visitor."],
  ["Argument Reviewer", "argument-reviewer.md", "Check whether the page promise and copy hold together."],
  ["Devil's Advocate", "devils-advocate.md", "Find what a visitor might dislike, ignore, or misunderstand."],
].map(([label, file, note]) => ({ label, href: `/kits/rishmithaa/agents/${file}`, note }));

export const clientDownloadKits: Record<string, ClientDownloadKit> = {
  cameron: {
    slug: "cameron",
    name: "Cameron",
    accent: "var(--star-gold)",
    title: "Cameron's markdown kit",
    lede: "The actual `.md` files behind the writing desk: open, copy, or download the starter files, skills, and reviewer agents.",
    groups: [
      {
        label: "Starter files",
        intro: "Project-root files.",
        files: [
          { label: "CLAUDE.md", href: "/kits/cameron/CLAUDE.md", note: "Project instructions loaded by Claude Code." },
          { label: "_WORKSPACE.md", href: "/kits/cameron/_WORKSPACE.md", note: "Folder map and canonical output rules." },
          { label: "_BUILD_LOG.md", href: "/kits/cameron/_BUILD_LOG.md", note: "Append-only session journal." },
          { label: "README.md", href: "/kits/cameron/README.md", note: "Quick setup note." },
        ],
      },
      { label: "Skills", intro: "Portable methodology files for the writing workspace. Rows include copy, download, and raw-file actions.", files: cameronSkills },
      { label: "Agents", intro: "Markdown reviewer prompts Cameron can run or adapt. Rows include copy, download, and raw-file actions.", files: cameronAgents },
    ],
  },
  rishmithaa: {
    slug: "rishmithaa",
    name: "Rishmithaa",
    accent: "var(--ember-copper)",
    title: "Rishmithaa's markdown kit",
    lede: "The actual `.md` files behind the build studio: open, copy, or download the starter files, front-end skills, and reviewer agents.",
    groups: [
      {
        label: "Starter files",
        intro: "Project-root files.",
        files: [
          { label: "CLAUDE.md", href: "/kits/rishmithaa/CLAUDE.md", note: "Project instructions loaded by Claude Code." },
          { label: "_WORKSPACE.md", href: "/kits/rishmithaa/_WORKSPACE.md", note: "Folder map and canonical output rules." },
          { label: "_BUILD_LOG.md", href: "/kits/rishmithaa/_BUILD_LOG.md", note: "Append-only session journal." },
          { label: "README.md", href: "/kits/rishmithaa/README.md", note: "Quick setup note." },
        ],
      },
      { label: "Skills", intro: "Front-end and operating skills for a first site. Rows include copy, download, and raw-file actions.", files: rishmithaaSkills },
      { label: "Agents", intro: "Markdown reviewer prompts for page critique. Rows include copy, download, and raw-file actions.", files: rishmithaaAgents },
    ],
  },
};

export function getClientDownloadKit(slug: string): ClientDownloadKit | undefined {
  return clientDownloadKits[slug];
}
