import type { GraphData } from '@/components/access/NetworkGraph';

/* Seed site/design atlas for Rishmithaa's first front-end build (a portfolio).
   Site at the centre; pages on the first ring; the components each page is built
   from, the design tokens those components share, and the content that feeds
   them fan outward. Swap these nodes for her real site when it exists. */
export const rishmithaaGraph: GraphData = {
  rootId: 'site',
  nodes: [
    { id: 'site', type: 'site', label: 'Portfolio site', note: 'The product. Start here: every page and component hangs off this root, and they all share one design system so the site reads as deliberate, not assembled.' },

    { id: 'home', type: 'page', label: 'Home', note: 'The first impression. One clear statement, your best work above the fold, and a single next step.' },
    { id: 'work', type: 'page', label: 'Work', note: 'The case for hiring you. A grid of projects, each opening into a detail page with the problem, what you built, and the result.' },
    { id: 'about', type: 'page', label: 'About', note: 'Who you are and how you work. Short, specific, human — not a résumé in prose.' },
    { id: 'contact', type: 'page', label: 'Contact', note: 'One way to reach you that you actually check. No form maze.' },

    { id: 'hero', type: 'component', label: 'Hero', note: 'Statement + one call to action. The most-edited 100 words on the site.' },
    { id: 'project-grid', type: 'component', label: 'Project grid', note: 'Responsive card grid. Each card is a quiet promise of the detail page behind it.' },
    { id: 'project-detail', type: 'component', label: 'Project detail', note: 'Problem → approach → outcome, with real images. This is where the work gets judged.' },
    { id: 'bio-block', type: 'component', label: 'Bio block', note: 'Photo, two paragraphs, the tools you reach for. Reused on Home and About.' },
    { id: 'footer', type: 'component', label: 'Footer', note: 'Contact, socials, and the one-line version of who you are. On every page.' },

    { id: 'color', type: 'token', label: 'Color system', note: 'A small, deliberate palette. One accent. Consistency here is what reads as "designed."' },
    { id: 'type', type: 'token', label: 'Type scale', note: 'A display face, a body face, and a fixed set of sizes. Never freehand a font size.' },
    { id: 'spacing', type: 'token', label: 'Spacing scale', note: 'One spacing ramp used everywhere. Whitespace is structure — add room before adding elements.' },

    { id: 'projects-data', type: 'content', label: 'Projects', note: 'The source of truth for your work — one entry per project, rendered by the grid and the detail pages.' },
    { id: 'bio-copy', type: 'content', label: 'Bio + photo', note: 'Your words and image, written once and reused wherever the bio block appears.' },
  ],
  edges: [
    { from: 'site', to: 'home', type: 'contains' },
    { from: 'site', to: 'work', type: 'contains' },
    { from: 'site', to: 'about', type: 'contains' },
    { from: 'site', to: 'contact', type: 'contains' },

    { from: 'home', to: 'hero', type: 'contains' },
    { from: 'home', to: 'bio-block', type: 'contains' },
    { from: 'home', to: 'footer', type: 'contains' },
    { from: 'work', to: 'project-grid', type: 'contains' },
    { from: 'work', to: 'project-detail', type: 'contains' },
    { from: 'about', to: 'bio-block', type: 'contains' },
    { from: 'home', to: 'work', type: 'links' },

    { from: 'hero', to: 'type', type: 'uses' },
    { from: 'hero', to: 'color', type: 'uses' },
    { from: 'project-grid', to: 'spacing', type: 'uses' },
    { from: 'project-grid', to: 'color', type: 'uses' },
    { from: 'project-detail', to: 'type', type: 'uses' },
    { from: 'bio-block', to: 'spacing', type: 'uses' },

    { from: 'projects-data', to: 'project-grid', type: 'feeds' },
    { from: 'projects-data', to: 'project-detail', type: 'feeds' },
    { from: 'bio-copy', to: 'bio-block', type: 'feeds' },
  ],
};
