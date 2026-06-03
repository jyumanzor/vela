/* Shared content for every client access hub. Keeping it here keeps the
   pages DRY and consistent — change a doc link or FAQ answer once.
   Claude Code doc URLs and the harness comparison were verified against
   primary sources on 2026-06-03. */

export interface LinkItem {
  label: string;
  href: string;
  note?: string;
  external?: boolean;
}

/* "Start here" — the first Claude Code docs a new client should read, in order. */
export const claudeCodeStartHere: LinkItem[] = [
  { label: "Overview", href: "https://code.claude.com/docs/en/overview", note: "What Claude Code is and what it can do — a two-minute mental model." },
  { label: "Quickstart", href: "https://code.claude.com/docs/en/quickstart", note: "Install, log in, and make your first change in one sitting." },
  { label: "How Claude Code works", href: "https://code.claude.com/docs/en/how-claude-code-works", note: "The agent loop, context window, sessions, and permissions." },
  { label: "Memory & CLAUDE.md", href: "https://code.claude.com/docs/en/memory", note: "Teach Claude your rules once; it reads them every session." },
  { label: "Common workflows", href: "https://code.claude.com/docs/en/common-workflows", note: "Recipes for understanding, fixing, refactoring, and writing." },
];

/* The building blocks of your kit, each linked to its canonical doc. */
export const canonicalDocs: LinkItem[] = [
  { label: "Agent Skills", href: "https://code.claude.com/docs/en/skills", note: "Reusable, model-invoked judgment, loaded by description." },
  { label: "Subagents", href: "https://code.claude.com/docs/en/sub-agents", note: "Parallel specialists for focused subtasks and review." },
  { label: "Hooks", href: "https://code.claude.com/docs/en/hooks-guide", note: "Deterministic commands that always run — your guardrails." },
  { label: "MCP", href: "https://code.claude.com/docs/en/mcp", note: "Connect external tools, data, and services." },
  { label: "Settings & permissions", href: "https://code.claude.com/docs/en/settings", note: "Configuration scopes, rules, and environment." },
];

/* Example repos and resources worth inspecting for templates. */
export const examplesToInspect: LinkItem[] = [
  { label: "Anthropic Cookbook", href: "https://github.com/anthropics/anthropic-cookbook", note: "Working recipes and patterns to copy from." },
  { label: "Anthropic Courses", href: "https://github.com/anthropics/courses", note: "Guided lessons on building with Claude." },
  { label: "Claude Agent SDK", href: "https://code.claude.com/docs/en/agent-sdk/overview", note: "The same agent loop, as a library — skills, subagents, hooks." },
];

/* Knowledge base. General enough for any client; honest about what loads. */
export const faqGeneral: { q: string; a: string }[] = [
  {
    q: "Do I need to know how to code?",
    a: "No. Claude Code does the technical work; you direct it in plain language. Your kit is set up so the right rules load automatically — you focus on the judgment, not the syntax.",
  },
  {
    q: "What actually loads when I start a session?",
    a: "Your CLAUDE.md rules plus your skills — encoded judgment from real projects. You never have to re-explain how you work; it's already in context.",
  },
  {
    q: "What's the difference between a skill, a subagent, and a hook?",
    a: "A skill is reusable judgment Claude pulls in by description. A subagent is a separate reviewer that works in its own context. A hook is a deterministic check that always runs — your guardrail — whether or not the model decides to.",
  },
  {
    q: "How do the background reviewers help?",
    a: "Point them at a draft and they review it the way a careful second reader would — citations, argument, numbers, layout — and report back before anyone else sees it.",
  },
  {
    q: "Where do I keep my source material?",
    a: "In a reference folder your rules already expect, organized by type. Claude cites and reasons better when the material is where it's looking for it.",
  },
  {
    q: "What if I get stuck?",
    a: "Start from the Quickstart, then the Common Workflows recipes — both are linked on this page. And Jenn is one message away.",
  },
];

/* Cited comparison — where Vela's operating layer sits vs. other harnesses.
   Verified against each framework's primary docs, 2026-06-03. */
export const harnessCompare: LinkItem[] = [
  {
    label: "LangGraph",
    href: "https://docs.langchain.com/oss/python/langgraph/overview",
    note: "Graph/state-machine orchestration: nodes do work, edges define flow, typed state threads through. Control via topology and durable checkpoints.",
  },
  {
    label: "OpenAI Agents SDK",
    href: "https://openai.github.io/openai-agents-python/handoffs/",
    note: "Agents that delegate via handoffs, with first-class input, output, and tool guardrails (tripwires).",
  },
  {
    label: "CrewAI",
    href: "https://docs.crewai.com/en/concepts/crews",
    note: "Role-based crews running sequential or hierarchical processes, where a manager agent validates outcomes.",
  },
  {
    label: "Claude Agent SDK",
    href: "https://code.claude.com/docs/en/agent-sdk/overview",
    note: "The Claude Code agent loop as a library: skills for judgment, subagents for review, hooks for deterministic enforcement.",
  },
];

export const harnessSynthesis =
  "Vela's operating layer sits closest to the Claude Agent SDK's grain — skills carry portable, model-invoked judgment, while hooks supply non-negotiable, code-level enforcement that holds even when permission prompts are skipped. Separating judgment from enforcement is the best-in-class move: a deterministic floor that prompt-only instructions and handoff guardrails can't guarantee. The honest trade-off: LangGraph is stronger exactly where this is weakest — explicit typed state, checkpointing, and durable execution that resumes after a failure. The build log is a human-readable audit trail, not a runtime state machine.";
