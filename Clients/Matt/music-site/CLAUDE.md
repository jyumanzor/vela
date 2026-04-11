# Music Site -- Claude Code Instructions

## Project Context
Personal site to organize recordings, sessions, and collaborations. Not for public release -- this is your workshop/archive.

## Data Model
Every recording has: title, date, genre tags, mood tags, collaborators, status (idea/in-progress/mixed/mastered/released), session notes, audio file path.

## Pages to Build (in order)
1. Home -- recent recordings, current projects
2. Recordings -- browsable list with tag filters
3. Recording detail -- audio player (if available), session notes, metadata
4. Sessions timeline -- chronological view of all recording sessions
5. Collaborators -- who you work with, what you've made together

## File Organization
```
music-site/
├── CLAUDE.md
├── _BUILD_LOG.md
├── _WORKSPACE.md
├── site/                  <- Next.js project
│   ├── src/
│   │   ├── app/           <- pages
│   │   ├── components/    <- reusable UI
│   │   └── data/          <- recording data (TypeScript)
│   └── public/
│       └── audio/         <- audio files (gitignored if large)
└── ref-docs/              <- inspiration, design references
```

## Design Direction
- Clean, minimal -- let the music be the focus
- Dark mode friendly (studio aesthetic)
- Genre/mood tags as colored pills
- Timeline view for sessions
- No emojis in the UI

## Build Log
Read _BUILD_LOG.md before every session. Write to it after every session.
