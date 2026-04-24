export type RecordingStatus = "idea" | "in-progress" | "mixed" | "mastered" | "released";

export interface Recording {
  id: string;
  title: string;
  date: string;
  genre: string[];
  mood: string[];
  collaborators: string[];
  status: RecordingStatus;
  sessionNotes: string;
  audioSrc?: string;
}

export interface SessionEntry {
  id: string;
  date: string;
  location: string;
  title: string;
  recordingIds: string[];
  notes: string;
}

export const statusLabels: Record<RecordingStatus, string> = {
  idea: "Idea",
  "in-progress": "In progress",
  mixed: "Mixed",
  mastered: "Mastered",
  released: "Released",
};

export const recordings: Recording[] = [
  {
    id: "late-room-sketch",
    title: "Late Room Sketch",
    date: "2026-04-12",
    genre: ["ambient", "guitar"],
    mood: ["quiet", "late-night"],
    collaborators: ["Solo"],
    status: "in-progress",
    sessionNotes:
      "Sample entry. Replace this with the real take notes, tuning, signal chain, and what still needs another pass.",
  },
  {
    id: "north-wall-take",
    title: "North Wall Take",
    date: "2026-03-28",
    genre: ["indie", "demo"],
    mood: ["warm", "unfinished"],
    collaborators: ["Alex R."],
    status: "mixed",
    sessionNotes:
      "Sample entry. The detail page is meant to hold what worked, what dragged, and what should happen in the next session.",
  },
  {
    id: "drift-index",
    title: "Drift Index",
    date: "2026-02-19",
    genre: ["electronic", "texture"],
    mood: ["patient", "wide"],
    collaborators: ["Mina"],
    status: "idea",
    sessionNotes:
      "Sample entry. Add source references, loop notes, and whether this is a standalone idea or part of a larger set.",
  },
  {
    id: "small-room-master",
    title: "Small Room Master",
    date: "2026-01-31",
    genre: ["folk", "voice"],
    mood: ["close", "plainspoken"],
    collaborators: ["Solo"],
    status: "mastered",
    sessionNotes:
      "Sample entry. Use this status once the file is ready to share, export, or file into the final archive.",
  },
];

export const sessions: SessionEntry[] = [
  {
    id: "session-apr-12",
    date: "2026-04-12",
    location: "Home room",
    title: "Guitar sketches and room tone",
    recordingIds: ["late-room-sketch"],
    notes: "Sample session note. Capture what was recorded, what sounded good, and what should be revisited.",
  },
  {
    id: "session-mar-28",
    date: "2026-03-28",
    location: "Practice space",
    title: "Two-take demo pass",
    recordingIds: ["north-wall-take"],
    notes: "Sample session note. This timeline should become the memory layer for the archive.",
  },
  {
    id: "session-feb-19",
    date: "2026-02-19",
    location: "Laptop session",
    title: "Texture set and loop sorting",
    recordingIds: ["drift-index"],
    notes: "Sample session note. Link rough loops to the recordings they may become.",
  },
];

export const allGenres = Array.from(new Set(recordings.flatMap((recording) => recording.genre))).sort();
export const allMoods = Array.from(new Set(recordings.flatMap((recording) => recording.mood))).sort();

export function getRecording(id: string) {
  return recordings.find((recording) => recording.id === id);
}

export function collaboratorSummaries() {
  const names = Array.from(new Set(recordings.flatMap((recording) => recording.collaborators))).sort();

  return names.map((name) => {
    const matches = recordings.filter((recording) => recording.collaborators.includes(name));
    return {
      name,
      count: matches.length,
      recordings: matches,
      genres: Array.from(new Set(matches.flatMap((recording) => recording.genre))).sort(),
    };
  });
}
