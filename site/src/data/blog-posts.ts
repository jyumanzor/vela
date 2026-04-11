export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: 'methodology' | 'tutorial' | 'case-study' | 'tool-guide';
  type: 'cross-post' | 'original';
  sourceUrl?: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const categoryColors: Record<BlogPost['category'], string> = {
  methodology: 'var(--star-gold)',
  tutorial: 'var(--ember-copper)',
  'case-study': 'var(--meteor-red)',
  'tool-guide': 'var(--lime)',
};

export const categoryLabels: Record<BlogPost['category'], string> = {
  methodology: 'Methodology',
  tutorial: 'Tutorial',
  'case-study': 'Case Study',
  'tool-guide': 'Tool Guide',
};

export const blogPosts: BlogPost[] = [
  // ─── Cross-posts ───
  {
    id: 'why-rules-beat-tools',
    title: 'Why Rules Beat Tools',
    subtitle: 'The operating layer is the competitive advantage',
    date: '2026-04-08',
    category: 'methodology',
    type: 'cross-post',
    sourceUrl: 'https://jennumanzor.com/musings/multi-model-architecture',
    excerpt: 'The models improve every quarter. Your methodology improves only if you encode what you learned. Vela exists because the operating layer is the competitive advantage, not which model you use.',
    tags: ['methodology', 'architecture', 'skills'],
    content: `Every few months, a new model benchmarks higher than the last. Teams scramble to switch. They port prompts, re-test workflows, and lose a week proving the new model does what the old one did.

The teams that don't scramble are the ones who built an operating layer. Their skills, validation rules, and project memory sit outside the model. When the model changes, the methodology stays.

Vela is built on this principle. Your CLAUDE.md file, your skills library, your build log protocol \u2014 none of it is model-specific. It's the accumulated judgment from every project you've run, encoded in a format any model can load. The model is the runtime. The methodology is the program.

The question isn't which model is best. It's whether your system gets smarter every time you finish a project, regardless of which model ran it.

> Read the full essay at [jennumanzor.com](https://jennumanzor.com/musings/multi-model-architecture)`,
  },
  {
    id: 'the-78-percent-problem',
    title: 'The 78% Problem',
    subtitle: 'Enforcement over knowledge',
    date: '2026-04-05',
    category: 'methodology',
    type: 'cross-post',
    sourceUrl: 'https://jennumanzor.com/building/verification-system',
    excerpt: '78% of defects shipped despite existing rules. The bottleneck isn\'t knowing what to do \u2014 it\'s making sure it happens. That\'s why Vela runs agents, not reminders.',
    tags: ['enforcement', 'validation', 'defects'],
    content: `After auditing six months of shipped defects, the number that mattered most was 78%. That's the percentage of bugs that had an existing rule that should have caught them. The rule existed. The knowledge existed. The defect shipped anyway.

The bottleneck was never knowledge. It was enforcement. People forget. People skip steps under deadline pressure. People read the checklist and check the boxes without doing the checks. This is not a discipline problem \u2014 it's a systems design problem.

The fix is three layers. First, rules become scripts that run automatically \u2014 pre-commit hooks, not post-flight reviews. Second, agents check work in the background before it ships. Third, the build log captures what broke so the rule set gets stronger after every failure.

Vela encodes this directly. Your methodology isn't a document someone reads once and forgets. It's an operating system that runs every session, catches known failure modes, and learns from new ones.

> Read the full essay at [jennumanzor.com](https://jennumanzor.com/building/verification-system)`,
  },
  {
    id: 'provenance-theater',
    title: 'What Provenance Theater Looks Like',
    subtitle: 'When the safety net is made of paper',
    date: '2026-04-02',
    category: 'case-study',
    type: 'cross-post',
    sourceUrl: 'https://jennumanzor.com/building/provenance-theater',
    excerpt: 'Six data explorers had provenance labels. Validators passed. The data was fabricated. Here\'s what happened and why labels aren\'t verification.',
    tags: ['provenance', 'data-quality', 'verification'],
    content: `Six data explorers had provenance tags. Each one carried a label: PUBLISHED, DERIVED, or ANALYST. Each one passed the validator. Each one looked legitimate in the UI. The data behind three of them was fabricated.

The tags were infrastructure for rigor. They weren't rigor itself. A label that says "PUBLISHED" only means someone typed "PUBLISHED." It doesn't mean anyone checked the source. The validator confirmed the label existed and was spelled correctly. It didn't confirm the data matched reality.

The fix requires verification at the data layer, not the label layer. Cross-reference against known sources. Check that the numbers in the explorer actually appear in the cited publication. Make the provenance tag a claim that gets tested, not a badge that gets displayed.

This is why Vela's validation rules operate on the output, not the metadata. A number on a page either has a traceable source or it doesn't. The label is irrelevant if the check never runs.

> Read the full essay at [jennumanzor.com](https://jennumanzor.com/building/provenance-theater)`,
  },

  // ─── Original tutorials ───
  {
    id: 'your-first-claude-md',
    title: 'Your First CLAUDE.md',
    subtitle: 'The rules your AI agent follows',
    date: '2026-04-11',
    category: 'tutorial',
    type: 'original',
    excerpt: 'A CLAUDE.md file is the rules your AI agent follows. Here\'s how to write one that actually changes what gets built \u2014 not just what gets suggested.',
    tags: ['claude-md', 'getting-started', 'tutorial'],
    content: `A CLAUDE.md file is a set of instructions that loads into every AI session in your project. It's not a README. It's not documentation. It's the operating rules your agent follows when it writes code, generates analysis, or builds deliverables.

The difference between a useful CLAUDE.md and a useless one is specificity. "Write clean code" changes nothing. "Never use pure black (#000000) \u2014 use #1F1F1C for dark text" changes every component the agent builds. Concrete values beat philosophy every time.

**Start with project context.** Tell the agent what it's working on, what stack you're using, and where the key files live. A white paper project might start like this:

\`\`\`
## Project: Q3 Market Analysis White Paper
- Output: /deliverables/q3-market-analysis.docx
- Sources: /references/ (all PDFs are primary sources)
- Citation style: APA 7th, footnotes not endnotes
- Font: Calibri 11pt, 1.15 line spacing
\`\`\`

**Add your citation rules.** If you're doing knowledge work, citation discipline is the single most important section. Every claim needs a source. Every number needs a provenance tag. Specify what counts as a valid source and what doesn't.

**Define the operating loop.** The agent should know what to do before it starts, what to check before it finishes, and where to write what it learned. A simple loop: Read the build log. Do the work. Validate the output. Write what changed.

**Encode failure modes.** This is where CLAUDE.md gets powerful. After your first project, you'll know what went wrong. "AI generates plausible-but-wrong statistics" becomes a rule: every statistic must include the source, page number, and extraction method. The failure becomes a guardrail.

**Add a before-you-submit checklist.** Five to ten checks that must pass before the agent declares the work done. Did every claim get cited? Do the numbers match the source? Is the formatting consistent? Does the output open correctly in the target application?

Here's a minimal starter template:

\`\`\`
## Project Context
- What: [Your project]
- Stack: [Tools and formats]
- Output: [Where deliverables go]

## Rules
- Every claim needs a citation
- Every number needs a source
- Never fabricate examples

## Before Submitting
- [ ] All claims cited
- [ ] Numbers verified against source
- [ ] Output opens in target application
- [ ] Build log updated
\`\`\`

Start here. After your first session, you'll have real failure modes to add. After your third session, the CLAUDE.md will be doing most of the quality control automatically.`,
  },
  {
    id: 'claude-code-vs-codex',
    title: 'Claude Code vs Codex: When to Use Each',
    subtitle: 'Write in Claude. Review in Codex. Edit in Cursor.',
    date: '2026-04-11',
    category: 'tool-guide',
    type: 'original',
    excerpt: 'Claude Code writes. Codex reviews. Cursor edits. Here\'s how to use them together instead of picking one.',
    tags: ['tools', 'claude-code', 'codex', 'cursor'],
    content: `The mistake is picking one tool and forcing every task through it. Claude Code, Codex, and Cursor are good at different things. The workflow that ships quality work uses all three.

**Claude Code is your builder.** It reads your CLAUDE.md, loads your skills library, and generates work that follows your rules from the first draft. Use it for: writing new components, generating analysis, building pipelines, producing first drafts of anything substantial. It has full filesystem access, runs commands, and maintains session context. When you need something created from scratch with your methodology baked in, this is the tool.

**Codex is your reviewer.** It runs in a sandboxed environment, which makes it ideal for adversarial review. Upload your output and ask it to find what's wrong. Use it for: checking arguments for logical gaps, verifying calculations, finding edge cases in code, stress-testing claims. The sandbox means it can run tests without risk. The separation from your build environment means it approaches the work fresh.

**Cursor is your editor.** It operates inline with your codebase. Use it for: quick fixes, refactoring, targeted edits where you can see exactly what's changing. It's the fastest path from "this line needs to change" to "it's changed." Not ideal for large-scale generation, excellent for surgical modifications.

**The workflow:** Write in Claude Code with your full methodology loaded. Review in Codex by uploading the output for adversarial checking. Edit in Cursor for the specific fixes that come back from review. Ship.

This isn't about which tool is better. Each one has a role. The operating layer \u2014 your CLAUDE.md, your skills, your validation rules \u2014 travels with you across all three. The methodology is portable. The tools are interchangeable.`,
  },
  {
    id: 'setting-up-your-build-log',
    title: 'Setting Up Your Build Log',
    subtitle: 'Cross-session memory for AI-assisted work',
    date: '2026-04-11',
    category: 'tutorial',
    type: 'original',
    excerpt: 'Cross-session memory for AI-assisted work. One file. Read before starting, write before stopping. Here\'s exactly how to set it up.',
    tags: ['build-log', 'getting-started', 'memory'],
    content: `AI agents don't remember what happened last session. Every conversation starts from zero. The build log fixes this. It's one file per project that the agent reads before starting and writes to before stopping. That's the entire system.

**Create the file.** In your project root, create \`_BUILD_LOG.md\`. This file is append-only. You never delete entries. You never rewrite history. You add a dated block at the top each session.

**The template for each entry:**

\`\`\`
## 2026-04-11

**Changed:** What was built, modified, or fixed this session.
**Broke:** What went wrong. Errors, failed approaches, dead ends.
**Learned:** The durable insight. Not "I fixed the bug" but "sort order from the API is not guaranteed \u2014 always sort explicitly at the read boundary."
**Canonical:** Which files are the current source of truth. If you generated multiple versions, say which one is real.
\`\`\`

**The "Learned" field is the important one.** "Changed" and "Broke" are operational. "Learned" is what survives. It's the insight that prevents the same mistake in the next session, the next project, the next year. If an insight is durable enough, it graduates from the build log into a skill file that loads across all projects.

**Add the protocol to your CLAUDE.md.** The agent needs to know the build log exists and what to do with it:

\`\`\`
## Build Log Protocol
- Read _BUILD_LOG.md before starting any work
- Append a dated entry before ending the session
- Record: Changed, Broke, Learned, Canonical
- If a "Learned" insight is cross-project, promote it to a skill file
\`\`\`

**What happens over time.** After five sessions, the build log contains the real history of your project \u2014 not what you planned, but what actually happened. After twenty sessions, it's a compressed knowledge base that makes every new session start smarter than the last. The agent reads it, knows what was tried, knows what failed, and knows which files are canonical.

The build log is the simplest piece of the Vela system and the one that compounds the most. One file. Read before starting. Write before stopping.`,
  },
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}
