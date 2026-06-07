export type PublicDownloadKitId = "rishmithaa" | "cameron";

export interface PublicDownloadKit {
  id: PublicDownloadKitId;
  label: string;
  shortLabel: string;
  description: string;
  libraryPath: string;
  accent: string;
  files: { label: string; path: string }[];
}

export const publicDownloadKits: Record<PublicDownloadKitId, PublicDownloadKit> = {
  rishmithaa: {
    id: "rishmithaa",
    label: "Front-end starter kit",
    shortLabel: "Front-end kit",
    description: "CLAUDE.md, first-site workspace files, front-end skills, and reviewer agents.",
    libraryPath: "/access/rishmithaa/downloads",
    accent: "var(--ember-copper)",
    files: [
      { label: "CLAUDE.md", path: "/kits/rishmithaa/CLAUDE.md" },
      { label: "Frontend System", path: "/kits/rishmithaa/skills/frontend-system.md" },
      { label: "Spacing Enforcement", path: "/kits/rishmithaa/skills/spacing-enforcement.md" },
      { label: "Holistic Reviewer", path: "/kits/rishmithaa/agents/holistic-reviewer.md" },
    ],
  },
  cameron: {
    id: "cameron",
    label: "Writing starter kit",
    shortLabel: "Writing kit",
    description: "CLAUDE.md, white-paper workspace files, research skills, and reviewer agents.",
    libraryPath: "/access/cameron/downloads",
    accent: "var(--star-gold)",
    files: [
      { label: "CLAUDE.md", path: "/kits/cameron/CLAUDE.md" },
      { label: "Operating Loop", path: "/kits/cameron/skills/operating-loop.md" },
      { label: "Word Document Review", path: "/kits/cameron/skills/word-document-review.md" },
      { label: "Citation Checker", path: "/kits/cameron/agents/citation-checker.md" },
    ],
  },
};

export function getPublicDownloadKit(value: string | null | undefined): PublicDownloadKit {
  if (value === "cameron" || value === "rishmithaa") {
    return publicDownloadKits[value];
  }

  return publicDownloadKits.rishmithaa;
}
