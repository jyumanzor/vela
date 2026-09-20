import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, portfolioCheckedOn } from "@/data/portfolio";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p ? `${p.name} | Vela` : "Project | Vela",
    description: p?.summary,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <article className="portfolio-shell project-detail">
      <Link className="portfolio-back" href="/#projects">
        ← All projects
      </Link>
      <header>
        <div className="project-meta">
          <span>{p.category}</span>
          <span className="project-status" data-status={p.status}>
            {p.status}
          </span>
        </div>
        <h1 data-page-role="hero-title">{p.name}</h1>
        <p className="project-headline">{p.headline}</p>
        <p className="portfolio-lede" data-page-role="body-copy">
          {p.summary}
        </p>
      </header>
      {["harper","jenn-site","project-clifford","fisheries","maritza"].includes(p.slug) && <figure className="project-screenshot"><Image src={`/portfolio/${p.slug}.jpg`} alt={`${p.name} website, captured September 20, 2026`} width={1440} height={1000} loading="eager" sizes="(max-width: 700px) 100vw, 1120px"/><figcaption>Public site · September 20, 2026</figcaption></figure>}
      <div className="project-detail-grid">
        <section>
          <h2 data-page-role="section-title">What’s inside</h2>
          <ul>
            {p.contents.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <h2>How it comes together</h2>
          <p>{p.approach}</p>
        </section>
        <aside>
          <h2>Project access</h2>
          <p>
            {p.status === "Paused"
              ? "Hosting is paused. The project remains part of the collection."
              : p.status === "Private"
                ? "The working version requires your workspace password."
                : p.status === "Here"
                  ? "You’re already in Vela. The methods library is part of this site."
                  : "The public site is available at the link below; some areas may require sign-in."}
          </p>
          {p.url && (
            <a
              className="portfolio-button"
              href={p.url}
              target={p.url.startsWith("http") ? "_blank" : undefined}
              rel={p.url.startsWith("http") ? "noreferrer" : undefined}
            >
              {p.status === "Private"
                ? "Workspace sign-in"
                : p.status === "Here"
                  ? "Methods library"
                  : "Visit site"}{" "}
              ↗
            </a>
          )}
          <small>Status reviewed {portfolioCheckedOn}</small>
        </aside>
      </div>
      <nav className="project-next" aria-label="Next project">
        <span>Next in the collection</span>
        <Link href={`/projects/${next.slug}`}>{next.name} →</Link>
      </nav>
    </article>
  );
}
