import Link from "next/link";
export const metadata = {
  title: "Private workspaces | Vela",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <div className="portfolio-shell workspace-index">
      <p className="portfolio-eyebrow">Vela · Private access</p>
      <h1 data-page-role="hero-title">Workspaces</h1>
      <p className="portfolio-lede" data-page-role="body-copy">
        Use a workspace password for project work, or your account for the
        dashboard.
      </p>
      <div className="workspace-links">
        <Link href="/access/jenn/workspace">
          Jenn’s workspace <span>Project links & AI use-case lab →</span>
        </Link>
        <Link href="/login">
          Account dashboard <span>Existing account sign-in →</span>
        </Link>
      </div>
      <p>
        Client workspaces remain available at the individual links shared with
        each client.
      </p>
      <Link className="portfolio-back" href="/">
        ← Public collection
      </Link>
    </div>
  );
}
