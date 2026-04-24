import { RecordingsExplorer } from "@/components/RecordingsExplorer";

export default function RecordingsPage() {
  return (
    <div className="page-shell">
      <header className="page-title">
        <p className="mono-label">Recordings</p>
        <h1>Sort the archive by status, mood, and sound.</h1>
        <p>
          Sample entries are included so the structure is ready before real audio or private notes are added.
        </p>
      </header>
      <RecordingsExplorer />
    </div>
  );
}
