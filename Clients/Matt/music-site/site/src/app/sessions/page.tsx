import Link from "next/link";
import { getRecording, sessions } from "@/data/recordings";

export default function SessionsPage() {
  return (
    <div className="page-shell">
      <header className="page-title">
        <p className="mono-label">Sessions</p>
        <h1>A timeline for what happened in the room.</h1>
        <p>
          Session notes are the memory layer: what was recorded, what worked, and what the next pass should do.
        </p>
      </header>
      <section className="timeline">
        {sessions.map((session) => (
          <article key={session.id} className="timeline-item">
            <p className="mono-label">{session.date} / {session.location}</p>
            <h2>{session.title}</h2>
            <p>{session.notes}</p>
            <div className="tag-row">
              {session.recordingIds.map((id) => {
                const recording = getRecording(id);
                return recording ? (
                  <Link key={id} href={`/recordings/${recording.id}`}>
                    {recording.title}
                  </Link>
                ) : null;
              })}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
