# Cross-Model Review Skill

> Use a second model as an adversarial reviewer to catch blind spots the primary model can't see in its own output.

---

## Why This Works

A single model producing and validating its own output is like a writer proofreading their own essay — they read what they meant to write, not what they actually wrote. Two models with different training data, different failure modes, and different reasoning patterns create genuine tension. When they converge, confidence goes up. When they diverge, you've found the interesting part.

This is the PolicyEngine isolation principle applied at the model level.

---

## Three Protocols

### 1. Adversarial Review

Claude produces → ChatGPT critiques (or vice versa).

**Best for:** Catching hallucinations, unsupported claims, logic gaps, missing edge cases.

**How to run:**
1. Claude generates the output (analysis, code, recommendation)
2. Paste the output to ChatGPT with this prompt:

```
You are reviewing this output for errors, unsupported claims, and missing edge cases.
Do NOT praise it. Only identify:
1. Claims that aren't supported by the data provided
2. Logic gaps or unstated assumptions
3. Edge cases not addressed
4. Anything that would fail a domain expert's spot-check

Be specific. Quote the exact line that's wrong and explain why.
```

3. Feed critiques back to Claude for revision
4. Ship only when the second model can't find new issues

### 2. Parallel Generation

Both models produce independently → diff the outputs.

**Best for:** Classification tasks, where you need to know if a result is model-dependent or genuinely supported by the data.

**How to run:**
1. Give both models the same input and instructions
2. Compare outputs side by side
3. Where they agree → high confidence
4. Where they disagree → investigate. The disagreement IS the finding.

```
Agreement rate > 90%  → result is robust
Agreement rate 70-90% → investigate disagreements, may need human judgment
Agreement rate < 70%  → methodology is underspecified, tighten the prompt
```

**Applied to any classification or estimate:** If Claude says a statistic is X and ChatGPT says a similar value, you're fine. If they diverge significantly, your criteria are ambiguous.

### 3. Acceptance Criteria Generation

Second model writes the tests → primary model builds to pass them.

**Best for:** Preventing self-confirming validation. The model that defines "correct" is not the model that produces the output.

**How to run:**
1. Give ChatGPT the requirements and ask it to produce:
   - Acceptance criteria (what must be true)
   - Edge cases (what could break)
   - Forbidden outputs (what must never appear)
2. Claude builds the implementation
3. Validate Claude's output against ChatGPT's criteria
4. If it fails → Claude fixes. If it passes → ship.

This is the strongest protocol because it creates structural separation between specification and implementation.

---

## When to Use Which

| Situation | Protocol | Why |
|-----------|----------|-----|
| Drafting a recommendation memo | Adversarial Review | Catches unsupported claims before stakeholder sees them |
| Classifying or categorizing data | Parallel Generation | Reveals where classification criteria are ambiguous |
| Building a data pipeline | Acceptance Criteria | Tests come from a different model than the code |
| Writing a white paper or report | Adversarial Review | Catches claims that sound plausible but aren't grounded |
| Validating quantitative claims | Parallel Generation | If both models produce the same ratios, the math is right |

---

## What This Does NOT Replace

- Domain expert review (models catch different errors than humans)
- Stepwise validation by a human reviewer (they check the process, not just the output)
- The oracle pattern (validating against an external source of truth)

Cross-model review is one layer. It catches model-specific blind spots. It does not replace human judgment or ground-truth validation.

---

## How to Run These in Practice

**Adversarial Review** — when you produce something non-trivial, paste the output to a second model (ChatGPT, Gemini, etc.) with the critique prompt from Protocol 1 above.

**Parallel Generation** — give both models the same input and instructions. Compare outputs side by side. You can do this manually (two browser tabs) or with any tool that supports multi-model comparison.

**Acceptance Criteria** — paste requirements to the second model, get test criteria back, build to pass them in the primary model. This is a manual workflow but the most powerful of the three.

---

*See also: `testifying-expert.md` for the provenance framework, `plausible-but-wrong-numbers.md` for the specific failure this prevents*
