"use client";

import { useMemo, useState } from "react";
import { allGenres, allMoods, recordings, RecordingStatus } from "@/data/recordings";
import { RecordingCard } from "@/components/RecordingCard";

const statuses: Array<{ value: "all" | RecordingStatus; label: string }> = [
  { value: "all", label: "All status" },
  { value: "idea", label: "Idea" },
  { value: "in-progress", label: "In progress" },
  { value: "mixed", label: "Mixed" },
  { value: "mastered", label: "Mastered" },
  { value: "released", label: "Released" },
];

export function RecordingsExplorer() {
  const [genre, setGenre] = useState("all");
  const [mood, setMood] = useState("all");
  const [status, setStatus] = useState<"all" | RecordingStatus>("all");

  const filtered = useMemo(() => {
    return recordings.filter((recording) => {
      const genreMatch = genre === "all" || recording.genre.includes(genre);
      const moodMatch = mood === "all" || recording.mood.includes(mood);
      const statusMatch = status === "all" || recording.status === status;
      return genreMatch && moodMatch && statusMatch;
    });
  }, [genre, mood, status]);

  return (
    <section className="explorer-shell">
      <div className="filter-bar" aria-label="Recording filters">
        <label>
          <span>Genre</span>
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option value="all">All genres</option>
            {allGenres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Mood</span>
          <select value={mood} onChange={(event) => setMood(event.target.value)}>
            <option value="all">All moods</option>
            {allMoods.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as "all" | RecordingStatus)}>
            {statuses.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="recordings-grid">
        {filtered.map((recording) => (
          <RecordingCard key={recording.id} recording={recording} />
        ))}
      </div>
    </section>
  );
}
