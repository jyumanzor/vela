import Image from "next/image";
import Link from "next/link";
import { RecordingCard } from "@/components/RecordingCard";
import { recordings, sessions } from "@/data/recordings";

const current = recordings.filter((recording) => recording.status === "in-progress" || recording.status === "idea");

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero">
        <div>
          <p className="mono-label">Music seed project</p>
          <h1>Private studio memory for works in motion.</h1>
          <p>
            A local archive for recordings, sessions, collaborators, and the small decisions that get lost between takes.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/recordings">
              Browse recordings
            </Link>
            <Link className="button button-secondary" href="/sessions">
              Review sessions
            </Link>
          </div>
        </div>
        <figure className="hero-visual">
          <Image src="/studio-wave.svg" alt="Layered waveform and archive status visual" width={960} height={420} priority />
        </figure>
      </section>

      <section className="section-band">
        <p className="mono-label">Current state</p>
        <div className="overview-grid">
          <div className="metric-tile">
            <span className="mono-label">Recordings</span>
            <strong>{recordings.length}</strong>
          </div>
          <div className="metric-tile">
            <span className="mono-label">Sessions</span>
            <strong>{sessions.length}</strong>
          </div>
          <div className="metric-tile">
            <span className="mono-label">Active ideas</span>
            <strong>{current.length}</strong>
          </div>
        </div>
      </section>

      <section className="section-band">
        <p className="mono-label">Up next</p>
        <h2 className="section-title">Current projects</h2>
        <div className="recordings-grid">
          {current.map((recording) => (
            <RecordingCard key={recording.id} recording={recording} />
          ))}
        </div>
      </section>
    </div>
  );
}
