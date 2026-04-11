# Health Dashboard -- Claude Code Instructions

## Project Context
Personal health tracking system. Track nutrition, blood work, PT/rehab exercises, and mobility progress. All data stays local -- never commit real health data to public repos.

## Privacy Rules
- /data/ folder is gitignored
- Never commit real blood test values, weight, or medical info
- Use sample/mock data for development
- Real data lives in local JSON files only

## Sections to Build (in order)
1. Overview dashboard -- current state of everything
2. Nutrition -- meal logging, macro tracking
3. Blood work -- biomarker tracking over time
4. PT/Rehab -- injury list, exercise library, session logging
5. Mobility -- stretches, movements, literature, progress

## Data Model

### Nutrition
- Meals: date, meal type (breakfast/lunch/dinner/snack), items, macros
- Foods: name, category, macros per serving

### Blood Work
- Tests: date, lab name, results array
- Biomarkers: name, value, unit, reference range, flag (normal/high/low)

### PT/Rehab
- Injuries: name, body part, status (active/recovering/resolved), start date
- Exercises: name, body part, type (stretch/strength/mobility), description
- Sessions: date, exercises performed, ratings (helped? difficulty 1-5), notes
- Per-exercise feedback: yes/no "did this help?", difficulty rating, notes

### Mobility
- Movements: name, type, muscle groups, description, literature references
- Progress entries: date, movement, range of motion, pain level (0-10), notes

## Page Patterns (modeled after Jenn's IO pages)
- Dashboard: InsightCard grid with quick stats + traffic light indicators
- Data pages: filterable list + detail view
- Tracking: forms for logging + trend charts over time
- Each page: responsive grid, mobile-first

## Visualization Approach
- Simple charts: line charts for trends (blood work, weight), bar charts for macros
- Calendar heatmaps for consistency (did you log PT this week?)
- Traffic light cards for overview (green/yellow/red per area)
- No external chart libraries initially -- use SVG or simple CSS

## Automation Suggestions
After building the basics, consider adding:
- "Log PT" reminder -- scheduled task after each PT appointment
- "Weekly health review" -- generates a summary of all tracked data
- "Blood work alert" -- flags when biomarkers cross reference range thresholds
- "State of everything" -- one command that shows current status of all areas

## Build Log
Read _BUILD_LOG.md before every session. Write to it after every session.

## File Organization
```
health-dashboard/
├── CLAUDE.md
├── _BUILD_LOG.md
├── _WORKSPACE.md
├── site/                  <- Next.js project
│   ├── src/
│   │   ├── app/           <- pages (overview, nutrition, blood-work, pt, mobility)
│   │   ├── components/    <- reusable UI (InsightCard, charts, forms)
│   │   └── data/          <- TypeScript interfaces + sample data
│   └── public/
└── ref-docs/              <- PT handouts, blood work PDFs, mobility articles
```
