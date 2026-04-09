export interface ToolStrength {
  label: string;
  description: string;
}

export interface Tool {
  id: string;
  name: string;
  maker: string;
  tagline: string;
  strengths: ToolStrength[];
  bestFor: string[];
  setupSteps: string[];
  useCases: {
    writing: string;
    frontend: string;
    data: string;
  };
  recommendation: "primary" | "secondary" | "optional";
}

export const tools: Tool[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    maker: "Anthropic",
    tagline: "Primary drafting and building tool. Follows your rules, reads your references, writes with nuance.",
    recommendation: "primary",
    strengths: [
      { label: "Professional writing", description: "Long-form drafts with voice and structure" },
      { label: "Research synthesis", description: "Reads and integrates multiple reference documents" },
      { label: "Long-context reasoning", description: "200K+ token context window for complex projects" },
      { label: "File management", description: "Creates, edits, and organizes project files directly" },
      { label: "Front-end/design", description: "Component generation, CSS debugging, responsive layouts" },
      { label: "Rule-following", description: "CLAUDE.md instructions loaded and enforced every session" },
      { label: "Adversarial review", description: "Can challenge its own work when prompted" },
    ],
    bestFor: ["First drafts", "Revision cycles", "Building arguments", "Web development", "Data pipelines"],
    setupSteps: ["Install Claude Code CLI", "Create CLAUDE.md in your project root", "Add skills library to your workspace"],
    useCases: {
      writing: "Primary drafting tool. Reads your references, follows your CLAUDE.md rules, writes with nuance. Best for first drafts, revision cycles, and building the argument.",
      frontend: "Excellent at component generation, CSS debugging, responsive layouts. Follows design systems faithfully.",
      data: "Strong at pipeline building, data validation scripts, and analysis notebooks.",
    },
  },
  {
    id: "codex",
    name: "Codex",
    maker: "OpenAI",
    tagline: "Background reviewer. Catches what the primary tool misses.",
    recommendation: "secondary",
    strengths: [
      { label: "Conceptual review", description: "Evaluates arguments for logical coherence" },
      { label: "Logical inconsistencies", description: "Finds gaps and contradictions in reasoning" },
      { label: "Background execution", description: "Runs in a second terminal while you draft" },
      { label: "Parallel tasks", description: "Handles independent verification alongside primary work" },
      { label: "Fresh perspective", description: "Different model means different blind spots" },
    ],
    bestFor: ["Argument review", "Stress-testing claims", "Independent verification", "Background checks"],
    setupSteps: ["Install Codex CLI", "Configure as secondary reviewer", "Set up cross-model verification workflow"],
    useCases: {
      writing: "Run in a second terminal while Claude drafts. Ask it to review your argument for logical gaps, find counterexamples, or stress-test your thesis.",
      frontend: "Good at catching bugs and edge cases Claude missed. Run as a background reviewer.",
      data: "Useful for independent verification of pipeline outputs.",
    },
  },
  {
    id: "cursor",
    name: "Cursor / VS Code",
    maker: "Cursor",
    tagline: "IDE-native editing. Familiar interface, inline completions, visual diffs.",
    recommendation: "optional",
    strengths: [
      { label: "IDE-integrated editing", description: "AI assistance inside your code editor" },
      { label: "Visual diff", description: "See changes side-by-side before accepting" },
      { label: "Inline completions", description: "Suggestions as you type, tab to accept" },
      { label: "Familiar interface", description: "Standard VS Code experience with AI layer" },
    ],
    bestFor: ["Quick inline edits", "Visual file browsing", "Traditional dev workflow"],
    setupSteps: ["Install Cursor or VS Code with Copilot", "Open your project folder", "Use inline suggestions while editing"],
    useCases: {
      writing: "If you prefer a visual editor for markdown. Good for quick inline edits and seeing file structure.",
      frontend: "Best IDE experience for React/Next.js development. Inline suggestions while you type.",
      data: "Notebook integration, visual debugging.",
    },
  },
];

export const decisionGuide: { task: string; tool: string; color: string }[] = [
  { task: "Writing a first draft", tool: "Claude Code", color: "var(--star-gold)" },
  { task: "Building a web page", tool: "Claude Code", color: "var(--star-gold)" },
  { task: "Reviewing for logical gaps", tool: "Codex", color: "var(--ember-copper)" },
  { task: "Stress-testing an argument", tool: "Codex", color: "var(--ember-copper)" },
  { task: "Running background checks", tool: "Codex", color: "var(--ember-copper)" },
  { task: "Quick inline edits", tool: "Cursor", color: "var(--constellation)" },
];
