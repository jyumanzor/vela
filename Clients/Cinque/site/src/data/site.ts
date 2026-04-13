export interface ContactMethod {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export interface FocusArea {
  title: string;
  body: string;
}

export interface ServiceOffering {
  title: string;
  description: string;
  detail: string;
  ctaLabel: string;
  href?: string;
}

export const siteProfile = {
  name: "Cinque",
  title: "Cinque Photography",
  description:
    "A growing photography portfolio focused on travel, architecture, and quiet observations across France, the United Kingdom, Italy, the United States, Indonesia, and Portugal.",
  hero: {
    eyebrow: "Travel, architecture, and quiet light",
    intro:
      "Cinque is building a body of work around place, atmosphere, and the moments that usually go unnoticed.",
  },
  introduction:
    "This site is designed as a living portfolio for an emerging photographer: a place to share new work, refine a point of view, and make it easy for future clients to understand the kind of images Cinque wants to make.",
  previewNotice:
    "This portfolio is still in progress. Final image files and direct booking details are being added as new work is edited.",
  about: {
    title: "A practice built by paying attention",
    locationLabel:
      "Portfolio spanning France, the United Kingdom, Italy, the United States, Indonesia, and Portugal",
    paragraphs: [
      "Cinque approaches photography as a way of studying how a place feels before she decides what it means. The work is less about spectacle and more about atmosphere: the quality of late light on a wall, the geometry of a staircase, the quiet pause before a street fills again.",
      "The current portfolio moves between travel, architecture, and everyday observation. Some images hold on to broad landscapes or city structure; others stay close to texture, shadow, and the details that make a destination feel inhabited instead of staged.",
      "This is a growing archive rather than a finished monograph. The site is meant to evolve alongside the work, adding stronger selects, clearer sequencing, and a more recognizable voice over time.",
    ],
    focusAreas: [
      {
        title: "Travel",
        body: "Landscape, movement, and the mood of arriving somewhere unfamiliar.",
      },
      {
        title: "Architecture",
        body: "Lines, materials, and the way built spaces shape a scene.",
      },
      {
        title: "Everyday moments",
        body: "Observed details that make a place feel lived in rather than staged.",
      },
    ] satisfies FocusArea[],
    availability:
      "Open to portraits, travel stories, editorial collaborations, and selected print inquiries.",
  },
  contact: {
    intro:
      "Use this page to see what Cinque is available for and what to include when you reach out.",
    note: "Direct email and social links are still being finalized for this preview site.",
    methods: [] as ContactMethod[],
    checklist: [
      "The kind of shoot, story, or project you have in mind",
      "Timing, location, and whether travel is involved",
      "How the images will be used",
      "Any visual references or examples you already have",
    ],
  },
  services: [
    {
      title: "Portrait sessions",
      description:
        "Natural-light portraits for students, creatives, and personal milestones.",
      detail:
        "Best for graduation portraits, refreshed personal work, and editorial-style sessions that feel calm rather than overproduced.",
      ctaLabel: "Start a portrait inquiry",
    },
    {
      title: "Travel and editorial work",
      description:
        "Photography shaped by place, atmosphere, and story rather than heavy staging.",
      detail:
        "A fit for destination features, boutique hospitality, campus stories, and visual essays that need a quieter point of view.",
      ctaLabel: "Talk through a project",
    },
    {
      title: "Fine Art Prints",
      description:
        "Limited edition prints from the collection, shot on 35mm film with a 1970s Nikon FM.",
      detail:
        "Available in 8x10, 11x14, and 16x20. Custom sizes and framing available on request.",
      ctaLabel: "Browse prints",
      href: "/shop",
    },
  ] satisfies ServiceOffering[],
};
