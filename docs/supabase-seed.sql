-- ============================================================
-- Vela Supabase Seed Data
-- ============================================================
-- Run this AFTER creating user accounts at vela-io.vercel.app/login
-- Replace the UUID placeholders with actual user IDs from
-- Supabase Dashboard > Authentication > Users
-- ============================================================

-- Step 1: Create accounts at vela-io.vercel.app/login for:
--   - Jenn (your admin account)
--   - Cameron
--   - Matt
--   Then copy each user's UUID from Supabase Auth > Users

-- Step 2: Run this SQL with real UUIDs

-- ============================================================
-- CAMERON — White Papers for HBR
-- ============================================================
INSERT INTO clients (user_id, slug, name, domain, domain_label, domain_kit, loaded_skill_ids, agent_ids)
VALUES (
  '00000000-0000-0000-0000-000000000001',  -- REPLACE with Cameron's real user_id
  'cameron',
  'Cameron',
  'white-papers',
  'White Papers for HBR',
  'writing',
  ARRAY[
    'operating-loop', 'build-log-protocol', 'workspace-hygiene',
    'testifying-expert', 'operational-inheritance', 'claude-handoff-notes',
    'holistic-review', 'testing-ai-output', 'build-time-enforcement',
    'cross-model-review', 'plausible-but-wrong-numbers', 'silent-data-drop',
    'ai-data-smoothing', 'multi-round-editing', 'word-document-review'
  ],
  ARRAY[
    'citation-checker', 'daubert-verification', 'devils-advocate',
    'holistic-reviewer', 'argument-reviewer'
  ]
);

-- Cameron's setup steps
INSERT INTO setup_steps (client_id, step_id, label, description) VALUES
  ((SELECT id FROM clients WHERE slug = 'cameron'), 'choose-tools', 'Choose your tools', 'Select Claude Code, Codex, or both'),
  ((SELECT id FROM clients WHERE slug = 'cameron'), 'install-claude-code', 'Install Claude Code', 'Set up Claude Code CLI on your machine'),
  ((SELECT id FROM clients WHERE slug = 'cameron'), 'install-codex', 'Install Codex', 'Set up OpenAI Codex for review tasks'),
  ((SELECT id FROM clients WHERE slug = 'cameron'), 'create-workspace', 'Create workspace folder', 'Organize your project directory'),
  ((SELECT id FROM clients WHERE slug = 'cameron'), 'organize-refs', 'Organize reference docs', 'Place source materials in the right folders'),
  ((SELECT id FROM clients WHERE slug = 'cameron'), 'install-claude-md', 'Install CLAUDE.md + skills', 'Drop your portable rules into the workspace'),
  ((SELECT id FROM clients WHERE slug = 'cameron'), 'first-session', 'Run first session', 'Start Claude Code and verify skills load');

-- ============================================================
-- MATT — Music Site + Health Dashboard
-- ============================================================
INSERT INTO clients (user_id, slug, name, domain, domain_label, domain_kit, loaded_skill_ids, agent_ids)
VALUES (
  '00000000-0000-0000-0000-000000000002',  -- REPLACE with Matt's real user_id
  'matt',
  'Matt',
  'music-health',
  'Music Site + Health Dashboard',
  'data',
  ARRAY[
    'operating-loop', 'build-log-protocol', 'workspace-hygiene',
    'testifying-expert', 'operational-inheritance', 'claude-handoff-notes',
    'holistic-review', 'testing-ai-output', 'build-time-enforcement',
    'cross-model-review', 'plausible-but-wrong-numbers', 'silent-data-drop',
    'ai-data-smoothing', 'data-provenance', 'interactive-visuals'
  ],
  ARRAY[
    'holistic-reviewer', 'argument-reviewer', 'devils-advocate',
    'citation-checker', 'daubert-verification'
  ]
);

-- Matt's setup steps
INSERT INTO setup_steps (client_id, step_id, label, description) VALUES
  ((SELECT id FROM clients WHERE slug = 'matt'), 'choose-tools', 'Choose your tools', 'Select Claude Code, Codex, or both'),
  ((SELECT id FROM clients WHERE slug = 'matt'), 'install-claude-code', 'Install Claude Code', 'Set up Claude Code CLI on your machine'),
  ((SELECT id FROM clients WHERE slug = 'matt'), 'install-codex', 'Install Codex', 'Set up OpenAI Codex for review tasks'),
  ((SELECT id FROM clients WHERE slug = 'matt'), 'create-workspace', 'Create workspace folder', 'Set up matt-workspace with both seed projects'),
  ((SELECT id FROM clients WHERE slug = 'matt'), 'install-claude-md', 'Install CLAUDE.md + skills', 'Drop your portable rules into the workspace'),
  ((SELECT id FROM clients WHERE slug = 'matt'), 'scaffold-music', 'Scaffold music site', 'Create the Next.js project for your music catalog'),
  ((SELECT id FROM clients WHERE slug = 'matt'), 'scaffold-health', 'Scaffold health dashboard', 'Create the Next.js project for health tracking'),
  ((SELECT id FROM clients WHERE slug = 'matt'), 'first-session', 'Run first session', 'Start Claude Code and build your first page');

-- ============================================================
-- Verify
-- ============================================================
-- SELECT * FROM clients;
-- SELECT * FROM setup_steps;
