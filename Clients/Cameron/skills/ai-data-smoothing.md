# Failure Mode: AI Data Hallucination — The Complete Prevention Standard

> "This AI tool can't replace a human consultant. It can't replace a bad intern." — Matt Hoelle, PhD, March 2026
>
> AI must NEVER generate, estimate, interpolate, smooth, or fabricate data values. Period.

## The Core Rule

**AI cannot hallucinate data. Ever.** Not approximately. Not "close enough." Not "plausible estimates." Every single number displayed to a user must trace to either:
1. A machine-readable API response (DIRECT)
2. A value manually entered or verified by a human (VERIFIED)
3. A computation from DIRECT/VERIFIED inputs with a visible formula (COMPUTED)

There is no fourth category. "AI-COMPILED" is not acceptable for any number that will be presented as data.

---

## The Smoothing Pattern (How It Was Caught)

When asked to compile Florida fisheries landings data (2000-2024), AI:
- Generated 25 years of lobster and stone crab data
- Made stone crab price/lb increase monotonically every year for 24 straight years (8.75 → 21.16)
- Rounded all landings to clean hundreds of thousands (5,800,000 / 5,200,000)
- Rounded all values to clean millions ($28,500,000 / $26,000,000)
- Produced internally consistent math (value/lbs ≈ price_lb)
- Tagged every row `source: 'NOAA'` despite NOAA having no API
- **Eliminated all volatility** — real fisheries catches swing ±30% year-over-year due to hurricanes, regulations, stock collapses

The presentation looked professional. The data was fabricated. A PhD economist caught it on first review.

---

## All Data Hallucination Vectors

### 1. Silent Smoothing (Fisheries Pattern)
**What**: AI interpolates between known endpoints, producing aesthetically smooth trends
**Detection**: Monotonic prices, suspiciously low coefficient of variation, no outlier years
**Real data signature**: Jagged year-over-year swings, structural breaks, event-driven spikes/drops

### 2. Round Number Fabrication
**What**: AI generates clean round numbers (5.8M, $28.5M) instead of actual messy values (5,823,417 lbs, $28,491,203)
**Detection**: Count trailing zeros. Real government data has precise totals.
**Test**: `if (value % 100000 === 0) flag("Suspiciously round — verify against source")`

### 3. Source Attribution Without Access
**What**: AI labels data with a source name (NOAA, FDACS, BLS) without having accessed that source
**Detection**: Check if the cited source has a machine-readable API. If it's a web form or PDF-only, AI cannot have fetched it.
**Test**: Every `source` tag must correspond to a documented API endpoint or a human-verified entry

### 4. Anchor Extrapolation
**What**: AI knows one confirmed value (2023 FDACS: $38.7M lobster) and works backward, generating plausible historical values
**Detection**: Compare the confirmed anchor year against AI's value for that year. If even the anchor year is wrong, everything is wrong.
**Test**: `if (aiValue !== knownAnchor) reject("Anchor mismatch — entire series is suspect")`

### 5. Unit/Scale Confusion
**What**: AI confuses millions vs thousands, lbs vs metric tons, nominal vs real dollars
**Detection**: Order-of-magnitude sanity checks against known benchmarks
**Test**: For each variable, define min/max plausible bounds. Reject values outside range.

### 6. Temporal Misattribution
**What**: AI assigns a value to the wrong year, or uses a different year's value for the requested year
**Detection**: Cross-reference at least 3 specific year-value pairs against the actual source
**Test**: Spot-check random non-anchor years against published tables

### 7. Category/Species/Entity Conflation
**What**: AI mixes up categories — total fisheries vs single species, state vs national, all consumers vs urban consumers
**Detection**: Check that the total equals the sum of parts; verify category labels match source definitions
**Test**: `if (sum(parts) !== total) flag("Category sum mismatch")`

### 8. Proxy Substitution
**What**: AI can't find the exact requested data, so it substitutes a related-but-different metric without disclosing
**Detection**: Verify the variable definition matches what was requested (e.g., "dockside value" vs "ex-vessel value" vs "retail value")
**Test**: Each data variable must carry a `definition` field that can be compared against the source's metadata

### 9. Backfill Imputation
**What**: AI fills in missing years with interpolated values instead of leaving gaps
**Detection**: Real data has gaps. If every year from 2000-2024 has a value and the source only publishes intermittently, some values are fabricated.
**Test**: Cross-reference the year coverage in the source. Gaps in source = gaps in display.

### 10. Composite Frankenstein Data
**What**: AI combines partial data from multiple incompatible sources without adjusting for methodology differences
**Detection**: Check if the same variable is measured differently across sources (e.g., NOAA uses metric tons, FDACS uses pounds)
**Test**: Each data point must cite ONE source. If sources change mid-series, flag it and document the methodology break.

---

## Code-Level Prevention (Baked-In Tests)

These tests must be embedded in the code itself — not in a review process, not in documentation, IN THE CODE.

### Test 1: Round Number Detector
```javascript
function checkRoundNumbers(data, field) {
  var roundCount = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i][field] % 100000 === 0) roundCount++;
  }
  var pct = roundCount / data.length;
  if (pct > 0.5) return {warn: true, msg: field + ': ' + Math.round(pct*100) + '% of values are round 100Ks — verify against source'};
  return {warn: false};
}
```

### Test 2: Monotonic Trend Detector
```javascript
function checkMonotonic(data, field) {
  var increasing = 0, decreasing = 0;
  for (var i = 1; i < data.length; i++) {
    if (data[i][field] > data[i-1][field]) increasing++;
    else if (data[i][field] < data[i-1][field]) decreasing++;
  }
  var total = increasing + decreasing;
  if (total > 0 && (increasing / total > 0.9 || decreasing / total > 0.9))
    return {warn: true, msg: field + ': ' + Math.round(Math.max(increasing,decreasing)/total*100) + '% monotonic — real data fluctuates'};
  return {warn: false};
}
```

### Test 3: Volatility Check
```javascript
function checkVolatility(data, field) {
  var changes = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i-1][field] !== 0)
      changes.push(Math.abs((data[i][field] - data[i-1][field]) / data[i-1][field]));
  }
  var mean = changes.reduce(function(a,b){return a+b}, 0) / changes.length;
  var variance = changes.reduce(function(a,b){return a + (b-mean)*(b-mean)}, 0) / changes.length;
  var cv = Math.sqrt(variance) / mean;
  if (cv < 0.3) return {warn: true, msg: field + ': CV of YoY changes = ' + cv.toFixed(2) + ' — suspiciously smooth for real-world data'};
  return {warn: false};
}
```

### Test 4: Source Accessibility Check
```javascript
// At build time, not runtime — document which sources have APIs
var SOURCE_REGISTRY = {
  'FRED':  {api: true,  endpoint: 'https://api.stlouisfed.org/fred/series/observations'},
  'BLS':   {api: true,  endpoint: 'https://api.bls.gov/publicAPI/v2/timeseries/data/'},
  'Census':{api: true,  endpoint: 'https://api.census.gov/data/'},
  'CFPB':  {api: true,  endpoint: 'https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/'},
  'EDGAR': {api: true,  endpoint: 'https://data.sec.gov/api/xbrl/companyfacts/'},
  'NOAA':  {api: false, note: 'FOSS is web-form only — data must be human-entered'},
  'FDACS': {api: false, note: 'PDF reports only — data must be human-entered'},
  'FWC':   {api: false, note: 'ASP.NET form — data must be human-entered'}
};

function validateSource(row) {
  var src = SOURCE_REGISTRY[row.source];
  if (!src) return {warn: true, msg: 'Unknown source: ' + row.source};
  if (!src.api && !row.humanVerified)
    return {warn: true, msg: row.source + ' has no API — value must be human-verified. ' + src.note};
  return {warn: false};
}
```

### Test 5: Anchor Verification
```javascript
function checkAnchors(data, anchors) {
  // anchors = [{year: 2023, field: 'value', expected: 38700000, tolerance: 0.01}]
  var failures = [];
  for (var a = 0; a < anchors.length; a++) {
    var row = data.find(function(d){return d.year === anchors[a].year});
    if (!row) { failures.push('Missing anchor year ' + anchors[a].year); continue; }
    var pctOff = Math.abs(row[anchors[a].field] - anchors[a].expected) / anchors[a].expected;
    if (pctOff > anchors[a].tolerance)
      failures.push(anchors[a].field + ' ' + anchors[a].year + ': expected ' + anchors[a].expected + ', got ' + row[anchors[a].field] + ' (' + Math.round(pctOff*100) + '% off)');
  }
  return failures.length ? {warn: true, msg: failures.join('; ')} : {warn: false};
}
```

### Test 6: Completeness Gap Check
```javascript
function checkGaps(data, yearField, expectedYears) {
  var years = data.map(function(d){return d[yearField]}).sort();
  var filled = 0, gapped = 0;
  for (var y = expectedYears[0]; y <= expectedYears[1]; y++) {
    if (years.indexOf(y) >= 0) filled++; else gapped++;
  }
  if (gapped === 0 && (expectedYears[1] - expectedYears[0]) > 10)
    return {warn: true, msg: 'Zero gaps in ' + (expectedYears[1]-expectedYears[0]+1) + ' years — real data often has missing years. Verify coverage.'};
  return {warn: false};
}
```

---

## Display-Level Prevention

### Every Number Gets a Provenance Panel
When user clicks/hovers any data value, show:
- **Source**: exact API endpoint or publication name + page number
- **Fetched/Entered**: timestamp of when this value was obtained
- **Method**: DIRECT (API response) / VERIFIED (human-entered) / COMPUTED (formula)
- **Formula** (if COMPUTED): show inputs, operation, result
- **Verify link**: clickable URL to check the source yourself

### Editable Cells
Every data cell must be editable. Click → type correct value → computations update. Because:
- AI WILL get numbers wrong
- Consultants MUST be able to fix them without rebuilding
- Corrections are visible (amber highlight = human-edited)

### Warning Banners
If any hallucination test fires, display a persistent amber banner:
```
⚠ DATA QUALITY WARNING: [N] values flagged by automated checks.
Click any flagged cell to review. See Methodology tab for details.
```

### Visual Provenance Tags
- **DIRECT** (green badge): Value from API response — safe
- **VERIFIED** (blue badge): Human confirmed against published source — safe
- **COMPUTED** (purple badge): Derived from DIRECT/VERIFIED values — show formula
- **UNVERIFIED** (amber badge, pulsing): AI-compiled, not yet checked — DANGER
- **FLAGGED** (red badge): Failed a hallucination test — DO NOT USE without manual verification

---

## Process-Level Prevention

### Before Embedding Any Data
1. Can I hit a machine-readable API? → Use it. Tag DIRECT.
2. No API? → Human must enter values from published table. Tag VERIFIED. Note page number.
3. Need derived values? → Compute from DIRECT/VERIFIED only. Tag COMPUTED. Show formula.
4. Cannot get real data? → Leave cells empty. Show "Data unavailable — requires manual entry from [source name]."

### NEVER do this:
- Generate "representative" or "approximate" values
- Interpolate between known endpoints
- Smooth volatile data to look cleaner
- Fill gaps with estimated values
- Use training data as a substitute for actual source data
- Tag AI-generated numbers with a real source name

### After Embedding Data
Run all 6 code-level tests. Display results in Methodology tab. Ship warnings to the user, not hide them.

---

## When to Load This Skill
- Building ANY tool that displays data to users
- Compiling ANY time series, cross-section, or panel dataset
- Before shipping ANY demo, explorer, or data product
- When the data source lacks a machine-readable API
- When anyone says "the numbers look wrong"
- **Always for client-facing or publication work** — a wrong number in a white paper is as dangerous as a wrong number in an expert report

## Related Skills
- `plausible-but-wrong-numbers.md` — wrong stats from citation errors (different mechanism, same risk)
- `testifying-expert.md` — "could I defend this on the stand?"

## Origin
Matt Hoelle PhD review of Florida Fisheries demo, March 10, 2026. Every number in the historical time series was AI-fabricated and tagged as NOAA data. Stone crab price/lb was monotonically increasing for 24 straight years. Real fisheries data is wildly volatile. The AI smoothed it to look presentable without disclosing the transformation.

"There doesn't appear to be a rulebook or set of prompts that can guarantee accurate AI-calculated numbers." — Matt Hoelle

This skill IS that rulebook. The answer is: don't let AI calculate the numbers. Let it build the tool, the charts, the UI, the export. The numbers come from APIs or humans. Never from the model.
