# Failure Mode: Silent Data Drop

> Records disappear during pipeline processing without any error, warning, or explicit accounting. The output looks complete but isn't.

---

## The Pattern

Pipeline filters, joins, or transforms data. Some records don't match the filter criteria, join key, or expected schema. They get silently dropped. The output has fewer records than the input, but nothing flags it. The stakeholder discovers the gap when they count.

**How it happens:** A dataset has 85 records. Pipeline filters apply inclusion/exclusion criteria. Some records get filtered out. The output doesn't list what was missing or why. The reviewer asks "where are the other records?" -- no answer ready.

---

## Why It's Dangerous

Silent drops are the most common source of "the numbers don't add up" findings. They compound through pipeline stages — if Stage 1 drops 3 records silently, and Stage 2 drops 2 more, the final output is missing 5 records with no audit trail.

For stakeholders who validate by counting (divide-and-reconcile), a single missing record destroys confidence in every number downstream.

---

## The Fix: Coverage Accounting at Every Step

Every pipeline step must emit:

```
Input rows:    85
Output rows:   82
Dropped:       3
Coverage:      96.5%

DROPPED RECORDS:
- Record #1234 (Jane Doe) — failed inclusion filter
- Record #1567 (John Smith) — status = "INACTIVE"
- Record #1890 (Pat Jones) — matched exclude pattern
```

### Rules
1. **Coverage must be 100% or gaps must be named** — no middle ground
2. **List dropped records by identifier** — not just a count
3. **State the reason for each drop** — which filter caught it
4. **Emit at every step** — not just the final step
5. **Validate against source** — a validation script verifies output count = input count x expected items

---

## Prevention Checklist

```
[ ] Every pipeline step logs input/output/dropped counts
[ ] Dropped records listed by name with reason
[ ] Coverage < 100% triggers a WARNING (not silent pass)
[ ] Final validation verifies total count against source
[ ] Filter criteria documented explicitly
[ ] Validation script runs after every pipeline execution
```

---

## Related

This failure mode is the data-pipeline version of the forbidden-string-leak: something slips through that shouldn't. The difference is direction — leaks are unwanted data getting OUT, drops are wanted data getting LOST.

---

*See also: `plausible-but-wrong-numbers.md` for a related failure mode (wrong numbers vs missing numbers)*
