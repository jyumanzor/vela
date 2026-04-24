import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/recordings", label: "Recordings" },
  { href: "/sessions", label: "Sessions" },
  { href: "/collaborators", label: "Collaborators" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/">
          <span>Matt</span>
          <span className="wordmark-sub">archive</span>
        </Link>
        <nav className="top-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span>Private workshop</span>
        <span>Sample data only</span>
      </footer>
    </>
  );
}
