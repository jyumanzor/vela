import Link from 'next/link';
import { getClient } from '@/data/clients';
import { ConstellationDivider } from '@/components/ConstellationDivider';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

const agentLabels: Record<string, string> = {
  'citation-checker': 'Citation Checker',
  'daubert-verification': 'Daubert Verification',
  'devils-advocate': "Devil's Advocate",
  'holistic-reviewer': 'Holistic Reviewer',
  'argument-reviewer': 'Argument Reviewer',
};

const quickLinks = [
  { path: '/setup', title: 'Get Started', description: 'Set up Claude Code and Codex for white paper writing' },
  { path: '/skills', title: 'Browse Your Skills', description: 'Portable skills loaded for your domain' },
  { path: '/explainers', title: 'Read Explainers', description: 'Evidence behind the methodology' },
  { path: '/downloads', title: 'Download Starter Kit', description: 'CLAUDE.md, skills, and templates' },
];

export default async function ClientDashboard({
  params,
}: {
  params: Promise<{ client: string }>;
}) {
  const { client: slug } = await params;
  const client = getClient(slug);

  if (!client) return null; // Layout handles the not-found case

  const completedSteps = client.setupSteps.filter((s) => s.completed).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: fi, fontSize: 32, color: 'var(--moonlight)', marginBottom: 6 }}>
          Welcome back, {client.name}
        </h1>
        <p style={{ fontFamily: fj, fontSize: 12, color: 'var(--constellation)', letterSpacing: '0.08em' }}>
          {client.domainLabel}
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 8 }}>
        {[
          { value: client.loadedSkillIds.length, label: 'Skills Loaded' },
          { value: client.agents.length, label: 'Agents Available' },
          { value: `${completedSteps} of ${client.setupSteps.length}`, label: 'Setup Steps' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: 'var(--understory)',
              border: '1px solid var(--stardust)',
              borderRadius: 10,
              padding: '20px 20px 16px',
            }}
          >
            <div style={{ fontFamily: fi, fontSize: 28, color: 'var(--star-gold)', marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: fd, fontSize: 13, color: 'var(--dusk)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <ConstellationDivider brightIndices={[1, 3]} />

      {/* Quick Links */}
      <div style={{ marginBottom: 8 }}>
        <p style={{ fontFamily: fj, fontSize: 11, letterSpacing: '0.15em', color: 'var(--constellation)', textTransform: 'uppercase', marginBottom: 16 }}>
          Quick Links
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              href={`/${slug}${link.path}`}
              className="vela-quick-link"
              style={{
                display: 'block',
                background: 'var(--understory)',
                border: '1px solid var(--stardust)',
                borderRadius: 10,
                padding: '18px 20px',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontFamily: fd, fontSize: 15, fontWeight: 600, color: 'var(--moonlight)', marginBottom: 4 }}>
                {link.title}
              </div>
              <div style={{ fontFamily: fd, fontSize: 13, color: 'var(--dusk)', lineHeight: 1.5 }}>
                {link.description}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ConstellationDivider brightIndices={[0, 2, 4]} />

      {/* Agent Preview */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <h2 style={{ fontFamily: fi, fontSize: 24, color: 'var(--moonlight)' }}>Background Agents</h2>
          <span style={{ fontFamily: fj, fontSize: 10, color: 'var(--constellation)', border: '1px solid var(--constellation)', borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap' }}>
            Coming in Phase 4
          </span>
        </div>
        <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)', lineHeight: 1.6, marginBottom: 16, maxWidth: 560 }}>
          Upload your work. Agents check citations, review arguments, catch numbers that don&apos;t add up.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {client.agents.map((agentId) => (
            <span
              key={agentId}
              style={{
                fontFamily: fd, fontSize: 13,
                color: 'var(--constellation)',
                background: 'var(--stardust)',
                borderRadius: 6,
                padding: '6px 14px',
              }}
            >
              {agentLabels[agentId] ?? agentId}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
