# Testing Methodology for AI-Generated Code

> Source: PolicyEngine multi-agent AI methodology, Max Ghenis
> Applicable to: any AI-assisted codebase

---

## The Core Insight

> "Rules foundation only works because of thorough testing, since we're 100% AI it forces us to not just accept fixing stuff after the fact."
> — Max Ghenis

When code is AI-generated, you can't rely on "the developer knows it works." The developer didn't write it line by line — they prompted it into existence. **Testing isn't nice-to-have; it's the only proof the code is correct.**

---

## 7 Principles from PolicyEngine's Multi-Agent AI

PolicyEngine evolved from a single-prompt system to a 7-phase pipeline with regulatory checkpoints. Their learnings apply to any multi-step AI build:

### 1. Agent Isolation
**Tests verify REQUIREMENTS, not implementation.**

Bad: "Test that `build_prompt()` calls `_format_prompt()` internally"
Good: "Test that every prompt contains SIC code, company size, and team context"

Why: AI rewrites implementation constantly. If your tests are coupled to internal function names, they break every time the AI refactors. Test the contract — what goes in, what comes out, what must be true.

**How to apply:**
- Don't test that a component renders a specific `<div>` structure
- Test that the page contains the right content, links work, navigation functions
- Test data contracts between pages (if page A generates data, does page B consume it correctly?)

### 2. Validation Checkpoints Between Pipeline Stages
**Every handoff is a potential failure point. Test the seams.**

Example handoffs to test:
- Prompt builder output to generator input
- Generator output to reconciler input
- Reconciler output to export input
- Export output to downstream consumer input
- Pipeline output to ground truth validation

**How to apply:**
- If a form submits data that appears on another page, test the data survives the round-trip
- If a build step transforms content (MDX to HTML, YAML to component props), test the transformation
- If an API returns data that renders in a component, test the shape of the data matches what the component expects

### 3. Priority-Based Test Flagging
**Not all test failures are equal. Tag them.**

Three tiers:
- `@critical` — If this fails, the system is broken. Stop everything.
- `@important` — If this fails, output quality is degraded. Fix before shipping.
- `@suggestion` — If this fails, an edge case is unhandled. Fix when convenient.

In pytest: `@pytest.mark.critical`, `@pytest.mark.important`, `@pytest.mark.suggestion`
In Jest: use `.describe("CRITICAL: ...")` naming or custom reporters

**How to apply:**
- Critical: Navigation works, auth gates function, no 500 errors on any route
- Important: Content renders correctly, interactive elements respond, responsive breakpoints work
- Suggestion: Animations smooth, edge-case viewport sizes, accessibility audit items

### 4. The Forbidden Strings Pattern (Confidentiality Firewall)
**Define what must NEVER appear, then scan exhaustively.**

Example: `FORBIDDEN_STRINGS = ["client_name", "internal_codename"]` blocks any output containing sensitive identifiers. Write tests that exhaust every possible leak path.

**How to apply:**
- Define forbidden content for public pages (internal-only terms, client names, draft content markers)
- Scan all rendered pages for forbidden strings in CI
- Ensure no internal content leaks to public-facing pages

### 5. External Oracle Validation (Rules Foundation Pattern)
**Validate AI output against an independent source of truth.**

PolicyEngine validates AI-generated tax code against TAXSIM (an independent tax calculator). If both systems agree, the code is probably correct — because two independent systems arrived at the same answer.

**How to apply:**
- Validate that all items listed in navigation actually exist as routes
- Validate that data in the system matches a real roster or external source
- Validate that a sitemap.xml matches actual deployed routes

### 6. The CI-Fixer Loop
**When tests fail, the AI fixes them. When fixes break other tests, the AI fixes those too.**

This only works if tests are:
- Fast (under 1 second ideally, under 10 seconds max)
- Deterministic (same input = same result, no flaky tests)
- Independent (one test failing doesn't cascade to other failures)

**How to apply:**
- Write tests that run in under 5 seconds total
- No network dependencies in tests (mock everything)
- Run tests before every deploy
- If using Claude Code: paste test failures back into the conversation for automatic fixing

### 7. Skills Modules (Reusable Test Patterns)
**Build test utilities once, reuse across projects.**

Build shared validation functions and fixtures that multiple test files can import.

**How to apply:**
- Build a shared test utility for route validation (does every nav link resolve to a real page?)
- Build a shared test utility for content scanning (no forbidden strings, no TODO markers, no placeholder text)
- Build a shared test utility for responsive testing (does every page render at 375px, 768px, 1440px?)
- Keep these in a shared `test-utils/` directory that projects import from

---

## The Proof Chain Mental Model

Tests don't just check that code runs — they prove **specific guarantees**. Each test file should make a **claim** and then **exhaustively test every path that could violate it**.

Structure your test suite as a logical proof:

```
Claim 1: [Statement about what's guaranteed]
  -> N tests covering every violation path
  -> If all pass: claim is proven

Claim 2: [Next guarantee]
  -> M tests covering every violation path
  -> If all pass: claim is proven

...

Therefore: If all tests pass, then claims 1 through N are simultaneously true.
```

Example:

| Claim | Tests | What's Proven |
|-------|-------|---------------|
| No sensitive data can leak | 30 | Firewall blocks at input, prompt, source code, and output layers |
| Every prompt is well-formed | 24 | All teams resolve, all required elements present, edge cases handled |
| Best output selected without bias | 24 | Scoring is deterministic, model-agnostic, all rules tested |
| Deliverables are complete | 13 | Files exist, correct format, no silent omissions |
| Data survives every handoff | 11 | Schema contracts verified between all pipeline stages |
| Output matches real data | 15 | External oracle validates against ground truth |
| **TOTAL** | **117** | **If all pass: pipeline is provably correct against requirements** |

---

## Practical Checklist for New Builds

Use this when starting any new project:

- [ ] **Define forbidden strings** — What must NEVER appear in output? (Client names, draft markers, internal terms)
- [ ] **Define the oracle** — What external source of truth can validate the output? (Roster, sitemap, API schema)
- [ ] **Define the claims** — What 3-6 specific guarantees does this system make?
- [ ] **Write critical tests first** — Confidentiality/security tests before feature tests
- [ ] **Test handoffs, not internals** — What goes in, what comes out, what must be true between stages
- [ ] **Tag test priority** — Critical (stop ship), Important (fix before release), Suggestion (improve later)
- [ ] **Keep tests fast** — Under 5 seconds total. No network. No flakiness.
- [ ] **Run before every deploy** — Tests are worthless if they don't run

---

## How This Changes the Conversation with Stakeholders

Before: "I wrote the code and it seems to work."
After: "117 tests prove 6 specific claims about the system. Here are the claims, here's what each test proves, and here's the 0.22-second command to verify it yourself."

The test suite isn't just engineering hygiene — it's the **evidence packet** for stakeholder trust. When someone asks "how do you know the scripts work?" the answer isn't "I tested them." The answer is "here are 6 guarantees, each backed by exhaustive automated proof, validated against an external source of truth, runnable in under a second."

---

## External References

- PolicyEngine multi-agent AI article: `https://www.policyengine.org/us/encode-policy-multi-agent-ai`
- Rules Foundation: `https://rules.foundation/`
