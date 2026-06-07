import type { Metadata } from "next";
import {
  AccessShell,
  Hero,
  Section,
  Card,
  CardGrid,
  Tags,
  Bullets,
  GhostCTA,
  ClosingCTA,
  AnchorNav,
  fi,
  fd,
  fj,
} from "@/components/access/primitives";

export const metadata: Metadata = {
  title: "Jenn Umanzor — Portfolio | Vela",
  description:
    "Jenn Umanzor: economic consultant who designs and ships software. Training platforms, client sites, and data tools — rigorous underneath, effortless on top.",
};

/* ── Headline numbers (all sourced from real, shipped work) ── */
const STATS: { label: string; value: string }[] = [
  { label: "Live products", value: "5" },
  { label: "Training pages shipped", value: "210+" },
  { label: "Interactive tools built", value: "15" },
  { label: "Flash designs catalogued", value: "230+" },
];

/* ── Flagship projects ── */
const FLAGSHIP: {
  name: string;
  accent: string;
  role: string;
  blurb: string;
  stats: { label: string; value: string }[];
  tags: string[];
  href: string;
  cta: string;
}[] = [
  {
    name: "LDR Hub — Training Portal",
    accent: "var(--star-gold)",
    role: "Design + build",
    blurb:
      "An internal training platform for a litigation & dispute-resolution consulting practice. Onboarding paths, quality standards, a 14-chapter R manual, and interactive analysis tools — one place instead of fifty scattered docs.",
    stats: [
      { label: "Pages", value: "210+" },
      { label: "Tools", value: "15" },
      { label: "Hubs", value: "12" },
      { label: "R manual", value: "14 ch" },
    ],
    tags: ["Next.js", "TypeScript", "Tailwind", "Data viz"],
    href: "https://ldrhub.vercel.app/explore",
    cta: "Visit LDR Hub",
  },
  {
    name: "jennumanzor.com",
    accent: "var(--lime)",
    role: "Design + build · ongoing",
    blurb:
      "My personal site and operating layer: a Pfitzinger running dashboard, Oura + Strava health metrics, travel galleries, a culture tracker, long-form essays, and a private command center — unified under one warm editorial system.",
    stats: [
      { label: "Essays", value: "35" },
      { label: "Build logs", value: "24" },
      { label: "Domains", value: "7" },
    ],
    tags: ["Next.js", "Editorial", "Charts", "Strava / Oura APIs"],
    href: "https://jennumanzor.com",
    cta: "Visit the site",
  },
];

/* ── Client / platform work ── */
const CLIENT_WORK: {
  name: string;
  accent: string;
  role: string;
  blurb: string;
  meta: string;
  href: string;
}[] = [
  {
    name: "Doldol Studio",
    accent: "var(--ember-copper)",
    role: "Tattoo studio · site + booking",
    blurb:
      "Public site, flash catalog, client portal, and aftercare flow for a tattoo studio.",
    meta: "18 pages · 230+ flash designs",
    href: "https://doldolstudio.vercel.app",
  },
  {
    name: "Cinque Photos",
    accent: "var(--nebula-amber)",
    role: "Photographer · portfolio",
    blurb:
      "A dark-hero gallery that scrolls into a cream collection, with brand-matched type.",
    meta: "Galleries · brand system",
    href: "https://cinque-photos.vercel.app",
  },
  {
    name: "Vela",
    accent: "var(--dusk)",
    role: "Platform · you are here",
    blurb:
      "The consulting platform this page lives on — client resource hubs, workspace setup, and an AI operating layer.",
    meta: "Next.js · Supabase · Auth",
    href: "/",
  },
];

/* ── Capabilities ── */
const CAPABILITIES: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { label: "Design", items: ["Figma", "UI / UX", "Editorial systems", "Brand", "Typography"] },
  { label: "Data & viz", items: ["Charts", "Dashboards", "D3", "Maps", "Timelines"] },
  { label: "Backend", items: ["APIs", "Node.js", "Supabase", "Vercel", "Data integration"] },
];

/* ── How I work ── */
const PRINCIPLES: string[] = [
  "Empirics before opinion. I make the argument, not the assertion — the data leads and the voice follows.",
  "Rigorous underneath, effortless on top. The hard part stays hidden so the tool feels obvious to use.",
  "Kindness first, then radical honesty. Useful feedback beats comfortable feedback, delivered with care.",
  "Marathon standard. The bar is the same on the first screen and the fiftieth: ship, then refine.",
];

const ANCHORS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ display: "block", fontFamily: fj, fontSize: 19, fontWeight: 500, color: "var(--moonlight)" }}>
        {value}
      </span>
      <span
        style={{
          display: "block",
          fontFamily: fj,
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--constellation)",
          marginTop: 4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function FlagshipCard({ p }: { p: (typeof FLAGSHIP)[number] }) {
  return (
    <Card accent={p.accent}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <h3 style={{ fontFamily: fi, fontSize: "clamp(24px, 3.4vw, 30px)", lineHeight: 1.05, color: "var(--moonlight)", margin: 0 }}>
          {p.name}
        </h3>
        <span style={{ fontFamily: fj, fontSize: 11, letterSpacing: "0.08em", color: "var(--constellation)" }}>{p.role}</span>
      </div>
      <p style={{ fontFamily: fd, fontSize: 15, lineHeight: 1.6, color: "var(--dusk)", margin: "14px 0 0", maxWidth: 640 }}>
        {p.blurb}
      </p>
      <div style={{ display: "flex", gap: "26px 36px", flexWrap: "wrap", margin: "24px 0 0" }}>
        {p.stats.map((s) => (
          <Stat key={s.label} label={s.label} value={s.value} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          flexWrap: "wrap",
          marginTop: 26,
        }}
      >
        <Tags items={p.tags} />
        <GhostCTA href={p.href} accent={p.accent}>
          {p.cta}
        </GhostCTA>
      </div>
    </Card>
  );
}

function ClientCard({ p }: { p: (typeof CLIENT_WORK)[number] }) {
  return (
    <Card accent={p.accent} style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontFamily: fi, fontSize: 22, color: "var(--moonlight)", margin: 0, lineHeight: 1.1 }}>{p.name}</h3>
      <span
        style={{
          fontFamily: fj,
          fontSize: 10.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--constellation)",
          marginTop: 8,
        }}
      >
        {p.role}
      </span>
      <p style={{ fontFamily: fd, fontSize: 14, lineHeight: 1.55, color: "var(--dusk)", margin: "13px 0 0", flex: 1 }}>
        {p.blurb}
      </p>
      <p style={{ fontFamily: fj, fontSize: 11, color: "var(--dusk)", margin: "16px 0 0" }}>{p.meta}</p>
      <div style={{ marginTop: 16 }}>
        <GhostCTA href={p.href} accent={p.accent}>
          Visit
        </GhostCTA>
      </div>
    </Card>
  );
}

export default function JennPortfolioPage() {
  return (
    <AccessShell>
      <Hero
        eyebrow="Portfolio · Jenn Umanzor"
        title={
          <>
            I build the tools I{" "}
            <span style={{ fontStyle: "italic", color: "var(--lime)" }}>wish existed.</span>
          </>
        }
        lede={
          "I'm Jenn Umanzor — an economic consultant who designs and ships software. Training platforms, client sites, data tools: rigorous underneath, effortless on top."
        }
        primary={{ href: "#work", label: "See the work" }}
        secondary={{ href: "https://jennumanzor.com", label: "jennumanzor.com" }}
      />

      <AnchorNav items={ANCHORS} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 28, marginTop: 52 }}>
        {STATS.map((s) => (
          <Stat key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <Section id="work" eyebrow="Selected work" title="Things I've shipped." accent="var(--star-gold)">
        <div style={{ display: "grid", gap: 16 }}>
          {FLAGSHIP.map((p) => (
            <FlagshipCard key={p.name} p={p} />
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <CardGrid min={250}>
            {CLIENT_WORK.map((p) => (
              <ClientCard key={p.name} p={p} />
            ))}
          </CardGrid>
        </div>
      </Section>

      <Section id="capabilities" eyebrow="Capabilities" title="What I work in." accent="var(--lime)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px 28px" }}>
          {CAPABILITIES.map((c) => (
            <Tags key={c.label} label={c.label} items={c.items} />
          ))}
        </div>
      </Section>

      <Section id="approach" eyebrow="Approach" title="How I work." accent="var(--ember-copper)">
        <p style={{ fontFamily: fd, fontSize: 16, lineHeight: 1.7, color: "var(--dusk)", maxWidth: 600, margin: "0 0 30px" }}>
          I&apos;m a first-generation economist and a runner. Both show up in how I build: pull the real
          numbers, respect the reader, and hold the same standard at mile two and mile twenty-two.
        </p>
        <Bullets items={PRINCIPLES} accent="var(--ember-copper)" />
      </Section>

      <div id="contact">
        <ClosingCTA
          line="If it resonates, maybe we are meant to build something meaningful together."
          href="https://jennumanzor.com/about"
          label="More about me"
        />
      </div>
    </AccessShell>
  );
}
