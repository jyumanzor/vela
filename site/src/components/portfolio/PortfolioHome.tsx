import Link from "next/link";
import { ProjectDirectory } from "./ProjectDirectory";
export function PortfolioHome() {
  return (
    <div className="portfolio-shell">
      <header className="portfolio-intro">
        <p className="portfolio-eyebrow">Jenn Umanzor · Project portfolio</p>
        <h1 data-page-role="hero-title">
          Vela<span aria-hidden="true">✦</span>
        </h1>
        <p className="portfolio-lede" data-page-role="body-copy">
          Websites, research tools and the work behind them.
        </p>
        <div className="portfolio-intro-links">
          <a href="#projects">The collection ↓</a>
          <Link href="/workspaces">Private workspaces ↗</Link>
        </div>
      </header>
      <ProjectDirectory />
      <aside className="portfolio-methods">
        <div>
          <p className="portfolio-eyebrow">Behind the projects</p>
          <h2>Methods worth keeping</h2>
          <p>
            Reusable rules, practical guides and starter kits from the work.
          </p>
        </div>
        <div>
          <Link href="/rules">Rules & methods →</Link>
          <Link href="/tools">Tools →</Link>
          <Link href="/explainers">Explainers →</Link>
          <Link href="/downloads">Starter kits →</Link>
        </div>
      </aside>
    </div>
  );
}
