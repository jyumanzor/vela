import Link from "next/link";
import { Recording, statusLabels } from "@/data/recordings";

export function StatusPill({ status }: { status: Recording["status"] }) {
  return <span className={`status-pill status-${status}`}>{statusLabels[status]}</span>;
}

export function RecordingCard({ recording }: { recording: Recording }) {
  return (
    <Link className="recording-card" href={`/recordings/${recording.id}`}>
      <div className="recording-card-top">
        <span className="mono-label">{recording.date}</span>
        <StatusPill status={recording.status} />
      </div>
      <h3>{recording.title}</h3>
      <p>{recording.sessionNotes}</p>
      <div className="tag-row">
        {[...recording.genre, ...recording.mood].map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </Link>
  );
}
