import { cookies } from "next/headers";
import Link from "next/link";
import {
  verifyAdmin,
  adminCookieName,
  verifyToken,
  cookieName,
} from "@/lib/clientAuth";
import { SignInScreen } from "@/components/access/SignInScreen";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Jenn’s workspace | Vela",
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const c = await cookies();
  const sp = await searchParams;
  if (
    !verifyAdmin(c.get(adminCookieName)?.value) &&
    !verifyToken("jenn", c.get(cookieName("jenn"))?.value)
  )
    return (
      <SignInScreen
        slug="jenn"
        name="Jenn"
        accent="var(--star-gold)"
        error={sp.e === "1"}
      />
    );
  return (
    <div className="portfolio-shell workspace-index">
      <p className="portfolio-eyebrow">Private workspace</p>
      <h1>Jenn’s workspace</h1>
      <p className="portfolio-lede">
        Project links, client workspaces and the AI use-case lab.
      </p>
      <div className="workspace-links">
        <Link href="/access/jenn/workspace/lab">
          AI Use-Case Lab{" "}
          <span>Decision exercises, task router and test records →</span>
        </Link>
        <Link href="/projects">
          Project collection{" "}
          <span>Public project notes and destinations →</span>
        </Link>
        {["cameron", "rishmithaa"].map((x) => (
          <Link key={x} href={`/access/${x}/workspace`}>
            {x === "cameron" ? "Cameron" : "Rishmithaa"}
            <span>Private client workspace →</span>
          </Link>
        ))}
      </div>
      <form action="/api/access/jenn" method="get">
        <button className="portfolio-button" name="signout" value="1">
          Sign out
        </button>
      </form>
    </div>
  );
}
