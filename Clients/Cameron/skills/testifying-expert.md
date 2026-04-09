# Skill: Testifying Expert Lens

## When to Load
Any time you're building analysis, writing white papers, or producing work with numbers someone will present, defend, or use to make decisions. Especially:
- Economic analysis or policy estimates
- Any deliverable going to editors, reviewers, or skeptical readers
- Anything where a competing author could present an alternative methodology
- Research-backed arguments in high-stakes publications

## The Test
Before asserting any number, assumption, or methodological choice, ask:

> "If I were on the stand and opposing counsel asked me to defend this, could I?"

If the answer is no — you need research, a citation, or to explicitly label it as a modeling choice with alternatives considered.

## The Three Categories
Every number in your analysis falls into one of three categories. **Label them explicitly.**

1. **PUBLISHED** — directly from a peer-reviewed paper or authoritative report
   - Must include: citation, year, the actual finding (not your paraphrase)
   - Example: "Brynjolfsson et al. (2023): 14% productivity gain, customer support, Fortune 500 firm"

2. **DERIVED** — inferred from published findings with a reasoning chain
   - Must include: the source finding, your derivation logic, why alternatives don't work
   - Example: "Eloundou finds 15% of tasks directly LLM-exposed. Our A1 tier (25-50%) is wider because it includes tasks where AI assists but doesn't hit the 50% time-reduction threshold Eloundou uses."

3. **ANALYST** — your modeling choice with no direct source
   - Must include: why you chose this number, what the alternatives were, what changes if you're wrong
   - Example: "A1 discount = 50%. Alternative: 30% (conservative, closer to Brynjolfsson). At 30%, total savings drop ~35%."

## The Cross-Examination Questions
For every ANALYST choice, prepare answers to:

1. **"Why this number and not X?"** — You need the alternative and why you rejected it
2. **"What changes if you're wrong?"** — Sensitivity analysis, not just the base case
3. **"What published evidence supports this?"** — If none, say "this is a modeling assumption" not "the research shows"
4. **"Who validated this?"** — Single-model = no validation. No human review = no validation. State it.
5. **"What would your competitor do differently?"** — Know the alternative methodology and why yours is still useful

## Red Flags That Kill Credibility
- Presenting DERIVED numbers as PUBLISHED ("Frey & Osborne says A0 should be 10-35%" — no they don't)
- Using a single number when a range is more honest
- Citing a paper without knowing its limitations
- "The AI classified it" as a defense for any specific classification
- Dollar savings without sensitivity analysis
- No disclosure of self-serving bias (AI generating tasks that AI can automate)

## The One-Sentence Test
Can you say this sentence honestly about your analysis?

> "This is a directional estimate of where AI efficiency gains are concentrated. It is an investigation tool for prioritizing pilot deployments, not a calculator for headcount decisions."

If your deliverable implies more precision than that, you're overselling.

## Application to Any Quantitative Argument
Common vulnerabilities, in order of criticality:
1. **Assumed parameters** — no published source for key percentages or multipliers. Always present as a range.
2. **Single-source classification** — no inter-rater reliability. Disclose this.
3. **AI-generated analysis** — self-serving bias risk. Validate with human spot-checks.
4. **The jagged frontier** — Dell'Acqua (2023) showed AI HURTS performance on some tasks. Your model can't detect which ones.
5. **Proxy metrics** — the thing you measured may not be the thing that matters.

## The Cross-Model Check
Before finalizing any ANALYST assumption, paste it to a second model with this prompt frame:

> "I'm asserting [X]. Play opposing counsel — give me the 3 hardest questions that would undermine this in front of a judge. For each, tell me what answer saves my credibility and what answer destroys it."

If you can't answer the questions, you can't defend the assumption.
