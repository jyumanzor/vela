# Matt's Starter Kit

## What's Inside

### Global
- `CLAUDE.md` -- Your top-level rules file
- `skills/` -- 13 portable methodology files
- `_BUILD_LOG.md` -- Global session history

### Music Site (`music-site/`)
- `CLAUDE.md` -- Music project rules, data model, page order
- Build plan: 5 pages to create in order
- Reference: design direction, file organization

### Health Dashboard (`health-dashboard/`)
- `CLAUDE.md` -- Health project rules, data models, privacy rules
- Build plan: 5 sections to create in order
- Automation suggestions for after you build the basics

## Setup

1. Create your workspace:
   ```bash
   mkdir -p ~/matt-workspace
   ```

2. Copy this entire folder into it:
   ```bash
   cp -r . ~/matt-workspace/
   ```

3. Start with one project:
   ```bash
   cd ~/matt-workspace/music-site
   claude
   ```
   Claude reads the CLAUDE.md automatically and follows the rules.

4. Build one page at a time. After each session, update _BUILD_LOG.md.

## The Skills
Same 13 files Cameron has -- encoded judgment from real project failures.

## Two Tools
- **Claude Code** -- primary. Does the building.
- **Codex** -- secondary. Reviews your work for gaps. Run in a second terminal.
