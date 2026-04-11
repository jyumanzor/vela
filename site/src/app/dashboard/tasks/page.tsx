'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { agents } from '@/data/agents';

const fi = 'var(--font-instrument), serif';
const fd = 'var(--font-dm-sans), sans-serif';
const fj = 'var(--font-jetbrains), monospace';

const STORAGE_KEY = 'vela-agent-tasks';

interface AgentTaskResult {
  id: string;
  agentId: string;
  agentName: string;
  inputPreview: string;
  findings: unknown;
  raw: string;
  timestamp: string;
  status: 'completed' | 'failed';
}

function getAgentColor(agentId: string): string {
  const agent = agents.find((a) => a.id === agentId);
  return agent?.categoryColor || 'var(--constellation)';
}

function getSeverityColor(severity: string): string {
  const s = severity.toUpperCase();
  if (s === 'CRITICAL' || s === 'PERJURY_RISK' || s === 'PERJURY RISK') return 'var(--meteor-red)';
  if (s === 'SIGNIFICANT' || s === 'INADMISSIBLE' || s === 'HIGH') return 'var(--nebula-amber)';
  if (s === 'MINOR' || s === 'ADMISSIBLE' || s === 'LOW') return 'var(--lime)';
  if (s === 'MEDIUM') return 'var(--nebula-amber)';
  return 'var(--constellation)';
}

function getSeverityTextColor(severity: string): string {
  const s = severity.toUpperCase();
  if (s === 'MINOR' || s === 'ADMISSIBLE' || s === 'LOW') return 'var(--deep-canopy)';
  return 'var(--forest-floor)';
}

function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) +
    ' at ' +
    d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
}

function FindingsRenderer({ findings }: { findings: unknown }) {
  if (!findings) return null;

  if (typeof findings === 'string') {
    return (
      <pre
        style={{
          fontFamily: fj,
          fontSize: 12,
          color: 'var(--moonlight)',
          background: 'var(--deep-canopy)',
          border: '1px solid var(--stardust)',
          borderRadius: 8,
          padding: 16,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.6,
        }}
      >
        {findings}
      </pre>
    );
  }

  if (Array.isArray(findings)) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {findings.map((item, i) => {
          if (typeof item === 'string') {
            return (
              <div
                key={i}
                style={{
                  background: 'var(--deep-canopy)',
                  border: '1px solid var(--stardust)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontFamily: fd,
                  fontSize: 13,
                  color: 'var(--moonlight)',
                  lineHeight: 1.6,
                }}
              >
                {item}
              </div>
            );
          }

          const severity = item.severity || item.verdict || item.level || '';
          return (
            <div
              key={i}
              style={{
                background: 'var(--deep-canopy)',
                border: '1px solid var(--stardust)',
                borderRadius: 8,
                padding: '12px 14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                {severity && (
                  <span
                    style={{
                      fontFamily: fj,
                      fontSize: 10,
                      letterSpacing: '0.05em',
                      color: getSeverityTextColor(severity),
                      background: getSeverityColor(severity),
                      borderRadius: 4,
                      padding: '2px 8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {severity}
                  </span>
                )}
                {(item.claim || item.title || item.finding) && (
                  <span style={{ fontFamily: fd, fontSize: 13, fontWeight: 600, color: 'var(--moonlight)' }}>
                    {item.claim || item.title || item.finding}
                  </span>
                )}
              </div>
              {(item.explanation || item.detail || item.reason || item.description) && (
                <p style={{ fontFamily: fd, fontSize: 12, color: 'var(--dusk)', lineHeight: 1.5, margin: 0 }}>
                  {item.explanation || item.detail || item.reason || item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (typeof findings === 'object' && findings !== null) {
    const obj = findings as Record<string, unknown>;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(obj).map(([key, value]) => {
          if (key === 'hardest_questions' || key === 'strongest_counter_argument') {
            return (
              <div
                key={key}
                style={{
                  background: 'var(--deep-canopy)',
                  borderLeft: '3px solid var(--ember-copper)',
                  borderRadius: 8,
                  padding: '14px 18px',
                }}
              >
                <div style={{ fontFamily: fj, fontSize: 10, color: 'var(--ember-copper)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {key.replace(/_/g, ' ')}
                </div>
                {typeof value === 'string' ? (
                  <p style={{ fontFamily: fd, fontSize: 13, color: 'var(--moonlight)', lineHeight: 1.6, margin: 0 }}>{value}</p>
                ) : Array.isArray(value) ? (
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {value.map((q, i) => (
                      <li key={i} style={{ fontFamily: fd, fontSize: 12, color: 'var(--moonlight)', lineHeight: 1.6, marginBottom: 4 }}>
                        {typeof q === 'string' ? q : JSON.stringify(q)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <pre style={{ fontFamily: fj, fontSize: 11, color: 'var(--moonlight)', whiteSpace: 'pre-wrap', margin: 0 }}>
                    {JSON.stringify(value, null, 2)}
                  </pre>
                )}
              </div>
            );
          }

          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <div style={{ fontFamily: fj, fontSize: 10, color: 'var(--constellation)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {key.replace(/_/g, ' ')}
                </div>
                <FindingsRenderer findings={value} />
              </div>
            );
          }

          return (
            <div
              key={key}
              style={{
                background: 'var(--deep-canopy)',
                border: '1px solid var(--stardust)',
                borderRadius: 8,
                padding: '10px 14px',
              }}
            >
              <span style={{ fontFamily: fj, fontSize: 10, color: 'var(--constellation)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {key.replace(/_/g, ' ')}
              </span>
              <p style={{ fontFamily: fd, fontSize: 12, color: 'var(--moonlight)', lineHeight: 1.5, margin: '4px 0 0' }}>
                {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<AgentTaskResult[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
    setMounted(true);
  }, []);

  function loadTasks(): AgentTaskResult[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
    setTasks([]);
    setExpandedId(null);
  }

  if (!mounted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
        <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--dusk)' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p
          style={{
            fontFamily: fj,
            fontSize: 11,
            letterSpacing: '0.15em',
            color: 'var(--constellation)',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Task History
        </p>
        <h1 style={{ fontFamily: fi, fontSize: 32, color: 'var(--moonlight)', marginBottom: 8 }}>
          Past agent runs
        </h1>
      </div>

      {/* Empty state */}
      {tasks.length === 0 && (
        <div
          style={{
            background: 'var(--understory)',
            border: '1px solid var(--stardust)',
            borderRadius: 12,
            padding: '40px 28px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: fd, fontSize: 15, color: 'var(--dusk)', lineHeight: 1.6, marginBottom: 16 }}>
            No agent runs yet. Head to Agents to run your first check.
          </p>
          <Link
            href="/dashboard/agents"
            style={{
              fontFamily: fd,
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--forest-floor)',
              background: 'var(--star-gold)',
              borderRadius: 8,
              padding: '10px 24px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Go to Agents
          </Link>
        </div>
      )}

      {/* Task list */}
      {tasks.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tasks.map((task) => {
            const isExpanded = expandedId === task.id;
            return (
              <div
                key={task.id}
                style={{
                  background: 'var(--understory)',
                  border: '1px solid var(--stardust)',
                  borderRadius: 10,
                  overflow: 'hidden',
                  transition: 'border-color 0.15s ease',
                }}
              >
                {/* Task summary row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : task.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                  }}
                >
                  {/* Agent color dot */}
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: getAgentColor(task.agentId),
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontFamily: fd, fontSize: 14, fontWeight: 600, color: 'var(--moonlight)' }}>
                        {task.agentName}
                      </span>
                      <span
                        style={{
                          fontFamily: fj,
                          fontSize: 9,
                          letterSpacing: '0.05em',
                          color: task.status === 'completed' ? 'var(--deep-canopy)' : 'var(--forest-floor)',
                          background: task.status === 'completed' ? 'var(--lime)' : 'var(--meteor-red)',
                          borderRadius: 4,
                          padding: '1px 6px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {task.status}
                      </span>
                    </div>
                    <div style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', marginBottom: 6 }}>
                      {formatTimestamp(task.timestamp)}
                    </div>
                    <div
                      style={{
                        fontFamily: fd,
                        fontSize: 13,
                        color: 'var(--dusk)',
                        lineHeight: 1.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {task.inputPreview}{task.inputPreview.length >= 100 ? '...' : ''}
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <span
                    style={{
                      fontFamily: fd,
                      fontSize: 14,
                      color: 'var(--constellation)',
                      flexShrink: 0,
                      marginTop: 4,
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    {'\u25BC'}
                  </span>
                </button>

                {/* Expanded findings */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '0 20px 20px',
                      borderTop: '1px solid var(--stardust)',
                      paddingTop: 16,
                    }}
                  >
                    {task.status === 'failed' ? (
                      <p style={{ fontFamily: fd, fontSize: 13, color: 'var(--meteor-red)' }}>
                        {task.raw}
                      </p>
                    ) : (
                      <FindingsRenderer findings={task.findings} />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Clear history */}
          <div style={{ marginTop: 16 }}>
            <button
              onClick={clearHistory}
              style={{
                fontFamily: fd,
                fontSize: 13,
                color: 'var(--dusk)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 0',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--meteor-red)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--dusk)';
              }}
            >
              Clear all history
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
