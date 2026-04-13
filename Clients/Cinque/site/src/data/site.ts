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
    "Photography by Cinque. Shot on 35mm film with a 1970s Nikon FM.",
  hero: {
    eyebrow: "35mm film photography",
    intro:
      "Shot on a Nikon FM across six countries.",
  },
  introduction:
    "Film photography from France, the United Kingdom, Italy, the United States, Indonesia, and Portugal.",
  previewNotice:
    "",
  about: {
    title: "About",
    locationLabel: "Chicago, IL",
    paragraphs: [
      "Born and raised in Chicago. Shooting on a Nikon FM — a 1970s film camera.",
    ],
    focusAreas: [] satisfies FocusArea[],
    availability: "",
  },
  contact: {
    intro: "For prints, commissions, or collaborations.",
    note: "",
    methods: [] as ContactMethod[],
    checklist: [],
  },
  services: [
    {
      title: "Prints",
      description: "Fine art prints from the collection.",
      detail: "8x10, 11x14, 16x20. Custom sizes available.",
      ctaLabel: "Browse prints",
      href: "/shop",
    },
    {
      title: "Commissions",
      description: "Custom photography for events, portraits, or editorial.",
      detail: "",
      ctaLabel: "Get in touch",
    },
    {
      title: "Licensing",
      description: "License photographs for editorial, commercial, or personal use.",
      detail: "",
      ctaLabel: "Inquire",
    },
  ] satisfies ServiceOffering[],
};
