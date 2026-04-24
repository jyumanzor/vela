import Link from "next/link";
import { collaboratorSummaries } from "@/data/recordings";

export default function CollaboratorsPage() {
  const collaborators = collaboratorSummaries();

  return (
    <div className="page-shell">
      <header className="page-title">
        <p className="mono-label">Collaborators</p>
        <h1>Who appears across the archive.</h1>
        <p>
          Keep track of who shaped each piece and what patterns show up across sessions.
        </p>
      </header>
      <section className="collaborators-grid">
        {collaborators.map((collaborator) => (
          <article key={collaborator.name} className="collaborator-card">
            <p className="mono-label">{collaborator.count} recording{collaborator.count === 1 ? "" : "s"}</p>
            <h2>{collaborator.name}</h2>
            <div className="tag-row">
              {collaborator.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
            <div className="tag-row">
              {collaborator.recordings.map((recording) => (
                <Link key={recording.id} href={`/recordings/${recording.id}`}>
                  {recording.title}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
