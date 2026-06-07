# Failure Mode: Plausible-but-Wrong Numbers

## The Pattern
A number stated with confidence that *feels* correct but was never verified against the actual source. These survive review because they don't trigger skepticism — they're in the right ballpark, use the right units, and fit the narrative.

## Why It Happens
- AI models generate "consensus-shaped" numbers from training data averages
- Writers round, misremember, or conflate similar-sounding statistics
- Reviewers skip verification when a number confirms their priors
- Numbers get copy-pasted across sections and each repetition adds false confidence

## Real Examples (from auditing AI-assisted research essays)

| Claimed | Actual | Source | Error Type |
|---------|--------|--------|------------|
| Glaeser & Maré wage premium "2-3x" | ~33% raw, 4-11% after fixed effects | Glaeser & Maré, 2001 | Order of magnitude (200-300% vs 33%) |
| Smoot-Hawley tariff "1909" | 1930 | Historical record | Wrong date (off by 21 years) |
| Zoroastrian population "40,000" | 110,000-120,000 worldwide | FEZANA, 2012 | 3x undercount |
| Policy effectiveness "80-85% / 25-45%" | No source exists for these numbers | Fabricated | Entirely invented but plausible-sounding |
| Bottom quintile rent "30-40% of income" | Median 62.7% | Census Bureau, 2023 | Understated by ~25 points |
| 72% cite economic/partnership barriers | 36% + 36% (not additive; 72% refers to something else) | Wang, IFS 2022 | Misattributed statistic |

## Detection
1. **Ask "what paper is this from?"** — if you can't name author + year + publication, the number is suspect
2. **Cross-model check** — ask a second model to verify specific claims as a domain expert. Catches magnitude errors and wrong dates.
3. **Check the unit** — "2-3x" vs "33%" is a units/framing error. Always ask: is this a multiplier, a percentage, a percentage point?
4. **Verify against the actual paper** — not the abstract, not a secondary summary. The number in the essay should match the number in Table X of the original source.
5. **Watch for additive fallacies** — survey responses with "select all that apply" cannot be summed into a combined percentage

## Prevention
- **Standing rule**: every stat card must cite a source in its sub-label (author, year)
- **Before publishing**: run a factual audit across ALL claims, not just the ones that feel uncertain
- **Systematic reviews over single papers**: when citing "effectiveness" or "share of X," prefer meta-analyses (Bergsvik et al. 2021, Rahman et al. 2025) over individual study claims
- **Flag your confidence**: if a number came from memory rather than a source you just read, mark it [UNVERIFIED] and check before shipping

## When to Load
- Writing any research essay or white paper
- Writing data-driven content with specific statistics
- Reviewing AI-generated analytical content
- Any deliverable where a wrong number destroys credibility
