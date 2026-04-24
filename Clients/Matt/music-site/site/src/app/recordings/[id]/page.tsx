import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusPill } from "@/components/RecordingCard";
import { getRecording, recordings } from "@/data/recordings";

export function generateStaticParams() {
  return recordings.map((recording) => ({ id: recording.id }));
}

export default async function RecordingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recording = getRecording(id);

  if (!recording) {
    notFound();
  }

  return (
    <div className="page-shell">
      <div className="detail-layout">
        <article>
          <p className="mono-label">{recording.date}</p>
          <h1 className="detail-title">{recording.title}</h1>
          <StatusPill status={recording.status} />
          <p className="detail-copy">{recording.sessionNotes}</p>
          <div className="audio-slot">
            <p className="mono-label">Audio</p>
            {recording.audioSrc ? (
              <audio controls src={recording.audioSrc} />
            ) : (
              <div>
                <div className="wave-placeholder" aria-hidden="true" />
                <p className="detail-copy">No audio file attached yet. Keep real files local until the sharing rule is decided.</p>
              </div>
            )}
          </div>
          <div className="detail-actions">
            <Link className="button button-secondary" href="/recordings">
              Back to recordings
            </Link>
          </div>
        </article>

        <aside className="detail-panel">
          <p className="mono-label">Metadata</p>
          <div className="tag-row">
            {[...recording.genre, ...recording.mood].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <p className="mono-label">Collaborators</p>
            <div className="tag-row">
              {recording.collaborators.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
