# Matt's Vela Sandbox — Plan

## Who Matt Is
Musician picking up Claude Code and Codex. Needs step-by-step onboarding (same as Cameron) plus two seed projects to learn by building.

## What Matt Gets on Vela

### 1. Onboarding (same pattern as Cameron)
- Setup guides for Claude Code + Codex
- 13 portable skills + domain-specific skills
- CLAUDE.md template
- Workspace templates (_BUILD_LOG.md, _WORKSPACE.md)
- Downloads page

### 2. Seed Project: Music Site
A personal site to organize recordings, sessions, and collaborations.

**Pages Matt would build:**
- `/` — overview of recent recordings, current projects
- `/recordings` — browsable list/grid of recordings with tags (genre, mood, collaborator)
- `/recordings/[id]` — individual recording: audio player, session notes, collaborators, date
- `/sessions` — timeline view of recording sessions
- `/collaborators` — network view of people Matt works with

**Data model:**
```typescript
interface Recording {
  id: string;
  title: string;
  date: string;
  genre: string[];
  mood: string[];
  collaborators: string[];
  audioSrc?: string;
  notes: string;
  status: 'idea' | 'in-progress' | 'mixed' | 'mastered' | 'released';
}
```

**CLAUDE.md for music site:**
- Reference doc locations (session recordings, stems, notes)
- Naming conventions for audio files
- Genre/mood taxonomy
- Build log for tracking what's recorded vs mixed vs released

### 3. Seed Project: Health Dashboard
A personal health tracking system modeled after Jenn's IO health pages.

**Sections Matt would build:**

**Nutrition**
- Meal logging (lightweight — what did you eat today)
- Macro tracking (optional, for when he cares)
- Links to blood test results

**Blood Work**
- Upload/input lab results
- Track biomarkers over time (charts)
- Flag out-of-range values
- Notes per test date

**PT/Rehab**
- Injuries list with status (active, recovering, resolved)
- Exercise library (stretches, moves, PT exercises)
- Per-exercise: yes/no "did this help?", rate difficulty 1-5, notes
- Session log — what was done in PT today, what worked, what didn't

**Mobility**
- Stretches and movements catalog
- Literature references (cite studies, PT recommendations)
- Progress tracking (range of motion, pain level over time)
- Rate/review each movement

**Overview Dashboard**
- "State of everything" — current injuries, recent nutrition, latest blood work
- Traffic light indicators (good/caution/needs attention)
- Suggested actions ("you haven't logged PT in 5 days")

**CLAUDE.md for health dashboard:**
- Data source locations
- Privacy rules (health data stays local)
- Naming conventions for lab results
- Build log for tracking what's been implemented

### 4. Build Plan Structure
Each seed project isn't a finished site — it's a PLAN Matt executes with Claude Code. The plan includes:

**Phase 1: Scaffold + Data Model**
- Create the Next.js project
- Define TypeScript interfaces
- Set up the CLAUDE.md

**Phase 2: Core Pages**
- Build each page one at a time
- Build log entry after each session
- Claude Code follows the CLAUDE.md rules

**Phase 3: Data Entry + Tracking**
- Add forms for logging (meals, PT sessions, recordings)
- localStorage initially, Supabase later if he wants persistence

**Phase 4: Visualization + Review**
- Add charts (blood work trends, PT progress)
- Add the "state of everything" overview
- Add sync/reminder patterns

### 5. Guided Automation Suggestions
Matt's sandbox includes suggestions like:
- "Set a reminder to log PT after each session" → scheduled task
- "Run 'state of everything' weekly" → generates a summary of all tracked data
- "Sync recordings folder" → watches a local folder for new audio files
- "Blood work alert" → flags when biomarkers cross thresholds

These aren't built for him — they're INSTRUCTIONS for what he can build with Claude Code.

## Vela Dashboard Pages

Matt's sandbox on Vela (`/dashboard` when logged in as Matt):

| Page | Content |
|------|---------|
| Dashboard | Overview, progress on both seed projects |
| Setup | Claude Code + Codex guides (same as Cameron) |
| Skills | His loaded skills (Tier 1 + music/health domain skills) |
| Projects | Two seed project cards — Music Site, Health Dashboard — each with build plan + progress |
| Downloads | Starter kit + seed project templates |
| Agents | Same 5 agents as Cameron (Citation Checker less relevant, but Holistic Reviewer and Argument Reviewer useful for music press/bio writing) |

## Domain Skills for Matt (Tier 2)

Beyond the 13 Tier 1 universals, Matt gets:
- **Data Provenance** (for health data — where did this number come from?)
- **Self-Contained HTML Explorer** (for building blood work visualizations)
- **Interactive Visuals** (for recording timeline, PT progress charts)

## Cross-Client Learning

| Matt Builds | Others Benefit |
|------------|----------------|
| Health dashboard patterns | Any Vela user who wants to track personal data |
| Music catalog data model | Template for any media/portfolio catalog |
| PT exercise rating system | Reusable yes/no + rating pattern |
| "State of everything" command | Universal — every client could have this |
