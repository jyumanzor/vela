import type { ClientProject } from '@/data/clients';

const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

export const statusColors: Record<ClientProject['status'], string> = {
  'not-started': 'var(--constellation)',
  'in-progress': 'var(--star-gold)',
  'complete': 'var(--lime)',
};

export const statusLabels: Record<ClientProject['status'], string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  'complete': 'Complete',
};

export function ProjectCard({ project }: { project: ClientProject }) {
  const progress = project.pages.length > 0
    ? (project.pagesComplete / project.pages.length) * 100
    : 0;

  return (
    <div
      className="vela-project-card"
      style={{
        background: 'var(--deep-canopy)',
        border: '1px solid var(--stardust)',
        borderLeft: `3px solid ${project.accentColor}`,
        borderRadius: 10,
        padding: '18px 20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{ fontFamily: fd, fontSize: 16, fontWeight: 600, color: 'var(--moonlight)' }}>
          {project.name}
        </span>
        <span style={{
          fontFamily: fj, fontSize: 10, letterSpacing: '0.05em',
          color: statusColors[project.status],
          background: 'var(--stardust)',
          borderRadius: 4, padding: '2px 8px',
        }}>
          {statusLabels[project.status]}
        </span>
      </div>
      <p style={{ fontFamily: fd, fontSize: 13, color: 'var(--dusk)', lineHeight: 1.5, marginBottom: 12 }}>
        {project.description}
      </p>
      <div style={{ marginBottom: 12 }}>
        <div style={{
          height: 4, borderRadius: 2,
          background: 'var(--stardust)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`, height: '100%',
            background: project.accentColor,
            borderRadius: 2,
            transition: 'width 0.3s ease',
          }} />
        </div>
        <p style={{ fontFamily: fj, fontSize: 10, color: 'var(--dusk)', marginTop: 4 }}>
          {project.pagesComplete} of {project.pages.length} pages
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.pages.map((page) => (
          <span key={page} style={{
            fontFamily: fd, fontSize: 12,
            color: 'var(--dusk)',
            background: 'var(--stardust)',
            borderRadius: 4, padding: '3px 10px',
          }}>
            {page}
          </span>
        ))}
      </div>
    </div>
  );
}
