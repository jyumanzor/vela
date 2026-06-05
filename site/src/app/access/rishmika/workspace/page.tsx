import type { Metadata } from "next";
import { cookies } from "next/headers";
import { verifyToken, cookieName } from "@/lib/clientAuth";
import { SignInScreen } from "@/components/access/SignInScreen";
import { ClientWorkspace } from "@/components/access/ClientWorkspace";

export const metadata: Metadata = { title: "Rishmika Workspace | Vela", robots: { index: false } };
export const dynamic = "force-dynamic";

const SLUG = "rishmika";
const NAME = "Rishmika";
const ACCENT = "var(--ember-copper)";

export default async function RishmikaWorkspacePage({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const sp = await searchParams;
  const store = await cookies();
  const authed = verifyToken(SLUG, store.get(cookieName(SLUG))?.value);
  if (!authed) {
    return <SignInScreen slug={SLUG} name={NAME} accent={ACCENT} error={sp.e === "1"} />;
  }
  return <ClientWorkspace slug={SLUG} accent={ACCENT} />;
}
