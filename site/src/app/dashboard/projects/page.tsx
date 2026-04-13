'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { clients } from '@/data/clients';
import type { Client, ClientProject } from '@/data/clients';
import { statusColors, statusLabels } from '@/components/ProjectCard';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

const claudeMdSummaries: Record<string, string[]> = {
  'white-papers': [
    'Reference organization with Zotero integration and citation graph.',
    'Multi-round drafting with cross-model review at each stage.',
    'Daubert-ready verification for every factual claim.',
  ],
  'music-site': [
    'Next.js catalog for recordings, sessions, and collaborator profiles.',
    'Audio player with waveform visualization and session metadata.',
    'Collaboration network showing who played on what.',
  ],
  'health-dashboard': [
    'Dashboard aggregating nutrition, blood work, PT, and mobility data.',
    'Trend charts with provider-friendly export for appointments.',
    'Goal tracking with weekly and monthly progress views.',
  ],
};

function ProjectDetailCard({ project }: { project: ClientProject }) {
  const progress = project.pages.length > 0
    ? Math.round((project.pagesComplete / project.pages.length) * 100)
    : 0;
  const summaryLines = claudeMdSummaries[project.id] || [];

  return (
    <div style={{
      background: 'var(--deep-canopy)',
      border: '1px solid var(--stardust)',
      borderLeft: `3px solid ${project.accentColor}`,
      borderRadius: 10,
      padding: '24px 28px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <h3 style={{ fontFamily: fd, fontSize: 18, fontWeight: 600, color: 'var(--moonlight)', margin: 0 }}>
          {project.name}
        </h3>
        <span style={{
          fontFamily: fj, fontSize: 10, letterSpacing: '0.05em',
          color: statusColors[project.status],
          background: 'var(--stardust)',
          borderRadius: 4, padding: '2px 8px',
        }}>
          {statusLabels[project.status]}
        </span>
      </div>

      <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)', lineHeight: 1.6, marginBottom: 16 }}>
        {project.description}
      </p>

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <span style={{ fontFamily: fd, fontSize: 13, color: 'var(--moonlight)' }}>
            {project.pagesComplete} of {project.pages.length} pages complete
          </span>
          <span style={{ fontFamily: fj, fontSize: 11, color: 'var(--dusk)' }}>
            {progress}%
          </span>
        </div>
        <div style={{
          height: 6, borderRadius: 3,
          background: 'var(--stardust)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`, height: '100%',
            background: project.accentColor,
            borderRadius: 3,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Page checklist */}
      <div style={{ marginBottom: 20 }}>
        <p style={{
          fontFamily: fj, fontSize: 10, letterSpacing: '0.12em',
          color: 'var(--constellation)', textTransform: 'uppercase', marginBottom: 10,
        }}>
          Pages
        </p>
        <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {project.pages.map((page, i) => {
            const done = i < project.pagesComplete;
            return (
              <li key={page} style={{
                fontFamily: fd, fontSize: 13, lineHeight: 1.5,
                color: done ? 'var(--moonlight)' : 'var(--dusk)',
                textDecoration: done ? 'line-through' : 'none',
                listStyleType: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 3,
                  border: done
                    ? `2px solid ${project.accentColor}`
                    : '2px solid var(--stardust)',
                  background: done ? project.accentColor : 'transparent',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 10, color: 'var(--deep-canopy)',
                }}>
                  {done ? '\u2713' : ''}
                </span>
                {page}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Claude Code suggestion */}
      <div style={{
        background: 'var(--understory)',
        border: '1px solid var(--stardust)',
        borderRadius: 8, padding: '12px 16px',
        marginBottom: summaryLines.length > 0 ? 20 : 0,
      }}>
        <p style={{
          fontFamily: fj, fontSize: 10, letterSpacing: '0.1em',
          color: 'var(--constellation)', textTransform: 'uppercase', marginBottom: 6,
        }}>
          Open in Claude Code
        </p>
        <code style={{
          fontFamily: fj, fontSize: 12, color: 'var(--moonlight)',
          display: 'block', whiteSpace: 'pre',
        }}>
          {`cd ~/workspace/${project.id} && claude`}
        </code>
      </div>

      {/* CLAUDE.md summary */}
      {summaryLines.length > 0 && (
        <div>
          <p style={{
            fontFamily: fj, fontSize: 10, letterSpacing: '0.12em',
            color: 'var(--constellation)', textTransform: 'uppercase', marginBottom: 8,
          }}>
            CLAUDE.md Summary
          </p>
          <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {summaryLines.map((line) => (
              <li key={line} style={{
                fontFamily: fd, fontSize: 13, color: 'var(--dusk)', lineHeight: 1.5,
              }}>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data: clientRecord } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (clientRecord) {
        const match = clients.find((c) => c.slug === clientRecord.slug);
        setClient({
          slug: clientRecord.slug,
          name: clientRecord.name,
          domain: clientRecord.domain,
          domainLabel: clientRecord.domain_label,
          domainKit: clientRecord.domain_kit,
          loadedSkillIds: clientRecord.loaded_skill_ids || [],
          setupSteps: [],
          agents: clientRecord.agent_ids || [],
          projects: match?.projects,
        });
      } else {
        const fallback = clients[0];
        if (fallback) setClient(fallback);
      }
    }
    load();
  }, []);

  if (!client) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
        <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)' }}>Loading...</p>
      </div>
    );
  }

  const projectsList = client.projects || [];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: '0.15em', color: 'var(--constellation)', textTransform: 'uppercase', marginBottom: 8 }}>
          Your Projects
        </p>
        <h1 style={{ fontFamily: fi, fontSize: 28, color: 'var(--moonlight)' }}>Build plan progress</h1>
      </div>
      {projectsList.length === 0 ? (
        <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)', lineHeight: 1.6 }}>
          No projects configured yet. Projects will appear here once your workspace is set up.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {projectsList.map((project) => (
            <ProjectDetailCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
