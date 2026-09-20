"use client";
import { useState } from "react";
import Link from "next/link";
import { projects, categories, portfolioCheckedOn } from "@/data/portfolio";
export function ProjectDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const shown = projects.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      `${p.name} ${p.summary} ${p.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <section
      id="projects"
      className="project-directory"
      aria-labelledby="directory-title"
    >
      <div className="directory-heading">
        <h2 id="directory-title" data-page-role="section-title">
          The collection
        </h2>
        <span>
          {projects.length} projects · {portfolioCheckedOn}
        </span>
      </div>
      <div className="directory-controls">
        <label className="project-search">
          <span>Find a project</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or subject"
          />
        </label>
        <fieldset>
          <legend>Category</legend>
          <div className="category-options">
            {categories.map((c) => (
              <button
                type="button"
                key={c}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="directory-count" role="status">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
        {category !== "All" ? ` in ${category.toLowerCase()}` : ""}
      </p>
      <div className="project-list">
        {shown.map((p) => (
          <article key={p.slug} className="project-row">
            <div className="project-meta">
              <span>{p.category}</span>
              <span className="project-status" data-status={p.status}>
                {p.status}
              </span>
            </div>
            <Link className="project-name" href={`/projects/${p.slug}`}>
              <h3>{p.name}</h3>
              <span aria-hidden="true">↗</span>
            </Link>
            <p>{p.summary}</p>
            <div className="project-actions">
              <Link href={`/projects/${p.slug}`}>
                Project notes <span aria-hidden="true">→</span>
              </Link>
              {p.status === "Live" && (
                <a href={p.url} target="_blank" rel="noreferrer">
                  Visit site ↗
                </a>
              )}
              {p.status === "Paused" && <span>Hosting paused</span>}
            </div>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <div className="directory-empty">
          <h3>No matching projects</h3>
          <p>Try another name or category.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
