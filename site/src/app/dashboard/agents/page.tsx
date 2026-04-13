'use client';

import { useState, useCallback } from 'react';
import { agents } from '@/data/agents';
import type { AgentDefinition } from '@/data/agents';

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

function saveTasks(tasks: AgentTaskResult[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // localStorage full or unavailable
  }
}

function loadTasks(): AgentTaskResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function FindingsRenderer({ findings }: { findings: unknown }) {
  if (!findings) return null;

  // Raw string
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

  // Array of findings
  if (Array.isArray(findings)) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {findings.map((item, i) => {
          if (typeof item === 'string') {
            return (
              <div
                key={i}
                style={{
                  background: 'var(--deep-canopy)',
                  border: '1px solid var(--stardust)',
                  borderRadius: 8,
                  padding: '12px 16px',
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
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
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
                  <span style={{ fontFamily: fd, fontSize: 14, fontWeight: 600, color: 'var(--moonlight)' }}>
                    {item.claim || item.title || item.finding}
                  </span>
                )}
              </div>
              {(item.explanation || item.detail || item.reason || item.description) && (
                <p style={{ fontFamily: fd, fontSize: 13, color: 'var(--dusk)', lineHeight: 1.6, margin: 0 }}>
                  {item.explanation || item.detail || item.reason || item.description}
                </p>
              )}
              {item.recommendation && (
                <p style={{ fontFamily: fd, fontSize: 12, color: 'var(--constellation)', lineHeight: 1.5, marginTop: 8, marginBottom: 0 }}>
                  Recommendation: {item.recommendation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Object with nested arrays or special keys
  if (typeof findings === 'object' && findings !== null) {
    const obj = findings as Record<string, unknown>;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.entries(obj).map(([key, value]) => {
          // Highlighted callout for hardest_questions or strongest_counter_argument
          if (key === 'hardest_questions' || key === 'strongest_counter_argument') {
            return (
              <div
                key={key}
                style={{
                  background: 'var(--deep-canopy)',
                  borderLeft: '3px solid var(--ember-copper)',
                  borderRadius: 8,
                  padding: '16px 20px',
                }}
              >
                <div style={{ fontFamily: fj, fontSize: 11, color: 'var(--ember-copper)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {key.replace(/_/g, ' ')}
                </div>
                {typeof value === 'string' ? (
                  <p style={{ fontFamily: fd, fontSize: 14, color: 'var(--moonlight)', lineHeight: 1.7, margin: 0 }}>{value}</p>
                ) : Array.isArray(value) ? (
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {value.map((q, i) => (
                      <li key={i} style={{ fontFamily: fd, fontSize: 13, color: 'var(--moonlight)', lineHeight: 1.7, marginBottom: 6 }}>
                        {typeof q === 'string' ? q : JSON.stringify(q)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <pre style={{ fontFamily: fj, fontSize: 12, color: 'var(--moonlight)', whiteSpace: 'pre-wrap', margin: 0 }}>
                    {JSON.stringify(value, null, 2)}
                  </pre>
                )}
              </div>
            );
          }

          // Regular section with nested array
          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <div style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {key.replace(/_/g, ' ')}
                </div>
                <FindingsRenderer findings={value} />
              </div>
            );
          }

          // Single value
          return (
            <div
              key={key}
              style={{
                background: 'var(--deep-canopy)',
                border: '1px solid var(--stardust)',
                borderRadius: 8,
                padding: '12px 16px',
              }}
            >
              <span style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {key.replace(/_/g, ' ')}
              </span>
              <p style={{ fontFamily: fd, fontSize: 13, color: 'var(--moonlight)', lineHeight: 1.6, margin: '6px 0 0' }}>
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

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentDefinition | null>(null);
  const [inputText, setInputText] = useState('');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ findings: unknown; raw: string; timestamp: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetRunner = useCallback(() => {
    setInputText('');
    setResult(null);
    setError(null);
  }, []);

  const runAgent = useCallback(async () => {
    if (!selectedAgent || !inputText.trim()) return;

    setRunning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/agents/${selectedAgent.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Agent execution failed');
      }

      setResult({
        findings: data.findings,
        raw: data.raw,
        timestamp: data.timestamp,
      });

      // Save to localStorage
      const task: AgentTaskResult = {
        id: crypto.randomUUID(),
        agentId: selectedAgent.id,
        agentName: selectedAgent.name,
        inputPreview: inputText.slice(0, 100),
        findings: data.findings,
        raw: data.raw,
        timestamp: data.timestamp,
        status: 'completed',
      };

      const existing = loadTasks();
      saveTasks([task, ...existing]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);

      // Save failed task
      const task: AgentTaskResult = {
        id: crypto.randomUUID(),
        agentId: selectedAgent.id,
        agentName: selectedAgent.name,
        inputPreview: inputText.slice(0, 100),
        findings: null,
        raw: message,
        timestamp: new Date().toISOString(),
        status: 'failed',
      };

      const existing = loadTasks();
      saveTasks([task, ...existing]);
    } finally {
      setRunning(false);
    }
  }, [selectedAgent, inputText]);

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
          Agents
        </p>
        <h1 style={{ fontFamily: fi, fontSize: 32, color: 'var(--moonlight)', marginBottom: 8 }}>
          Run methodology on your work
        </h1>
        <p style={{ fontFamily: fd, fontSize: 15, color: 'var(--dusk)', lineHeight: 1.6, maxWidth: 560 }}>
          Upload text, pick an agent, see findings. Each agent runs a different check.
        </p>
      </div>

      {/* Agent selection grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 12,
          marginBottom: 32,
        }}
      >
        {agents.map((agent) => {
          const isSelected = selectedAgent?.id === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => {
                setSelectedAgent(agent);
                resetRunner();
              }}
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                background: isSelected ? 'rgba(212, 168, 67, 0.06)' : 'var(--understory)',
                border: '1px solid',
                borderColor: isSelected ? agent.categoryColor : 'var(--stardust)',
                borderLeft: `3px solid ${isSelected ? agent.categoryColor : 'var(--stardust)'}`,
                borderRadius: 10,
                padding: '16px 18px',
                transition: 'border-color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--constellation)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--stardust)';
                  e.currentTarget.style.borderLeftColor = 'var(--stardust)';
                }
              }}
            >
              <div style={{ fontFamily: fd, fontSize: 15, fontWeight: 600, color: 'var(--moonlight)', marginBottom: 4 }}>
                {agent.name}
              </div>
              <div style={{ fontFamily: fj, fontSize: 10, color: 'var(--constellation)', letterSpacing: '0.05em', marginBottom: 8 }}>
                {agent.persona}
              </div>
              <div style={{ fontFamily: fd, fontSize: 13, color: 'var(--dusk)', lineHeight: 1.5 }}>
                {agent.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Runner area */}
      {selectedAgent && !result && (
        <div
          style={{
            background: 'var(--understory)',
            border: '1px solid var(--stardust)',
            borderRadius: 12,
            padding: '24px 28px',
            marginBottom: 32,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: fd, fontSize: 16, fontWeight: 600, color: 'var(--moonlight)' }}>
              {selectedAgent.name}
            </span>
            <span style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', marginLeft: 10 }}>
              {selectedAgent.persona}
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={selectedAgent.inputPlaceholder}
            disabled={running}
            style={{
              width: '100%',
              minHeight: 200,
              background: 'var(--understory)',
              border: '1px solid var(--stardust)',
              borderRadius: 8,
              padding: 16,
              fontFamily: fd,
              fontSize: 14,
              color: 'var(--moonlight)',
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--star-gold)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--stardust)';
            }}
          />

          {error && (
            <p style={{ fontFamily: fd, fontSize: 13, color: 'var(--meteor-red)', marginTop: 12, marginBottom: 0 }}>
              {error}
            </p>
          )}

          <div style={{ marginTop: 16 }}>
            <button
              onClick={runAgent}
              disabled={running || !inputText.trim()}
              style={{
                fontFamily: fd,
                fontSize: 14,
                fontWeight: 600,
                color: running || !inputText.trim() ? 'var(--constellation)' : 'var(--forest-floor)',
                background: running || !inputText.trim() ? 'var(--stardust)' : 'var(--star-gold)',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                cursor: running || !inputText.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background 0.15s ease',
              }}
            >
              {running && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--star-gold)',
                    animation: 'pulse 1.2s ease-in-out infinite',
                  }}
                />
              )}
              {running ? 'Running...' : 'Run Agent'}
            </button>
          </div>
        </div>
      )}

      {/* Results area */}
      {result && selectedAgent && (
        <div
          style={{
            background: 'var(--understory)',
            border: '1px solid var(--stardust)',
            borderRadius: 12,
            padding: '24px 28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <span style={{ fontFamily: fd, fontSize: 16, fontWeight: 600, color: 'var(--moonlight)' }}>
                {selectedAgent.name}
              </span>
              <span style={{ fontFamily: fj, fontSize: 11, color: 'var(--constellation)', marginLeft: 12 }}>
                {new Date(result.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                at{' '}
                {new Date(result.timestamp).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>
            <button
              onClick={() => {
                resetRunner();
              }}
              style={{
                fontFamily: fd,
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--star-gold)',
                background: 'transparent',
                border: '1px solid var(--star-gold)',
                borderRadius: 6,
                padding: '6px 16px',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 168, 67, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Run Another
            </button>
          </div>

          <FindingsRenderer findings={result.findings} />
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        textarea::placeholder {
          color: var(--constellation);
        }
      `}</style>
    </div>
  );
}
