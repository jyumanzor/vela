import type { Metadata } from "next";
import { cookies } from "next/headers";
import { verifyToken, cookieName, verifyAdmin, adminCookieName } from "@/lib/clientAuth";
import { SignInScreen } from "@/components/access/SignInScreen";
import { ClientWorkspace } from "@/components/access/ClientWorkspace";

export const metadata: Metadata = { title: "Rishmithaa Workspace | Vela", robots: { index: false } };
export const dynamic = "force-dynamic";

const SLUG = "rishmithaa";
const NAME = "Rishmithaa";
const ACCENT = "var(--ember-copper)";

export default async function RishmithaaWorkspacePage({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const sp = await searchParams;
  const store = await cookies();
  const authed = verifyToken(SLUG, store.get(cookieName(SLUG))?.value) || verifyAdmin(store.get(adminCookieName)?.value);
  if (!authed) {
    return <SignInScreen slug={SLUG} name={NAME} accent={ACCENT} error={sp.e === "1"} />;
  }
  return <ClientWorkspace slug={SLUG} accent={ACCENT} />;
}
