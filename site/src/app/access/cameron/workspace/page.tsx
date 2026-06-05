import type { Metadata } from "next";
import { cookies } from "next/headers";
import { verifyToken, cookieName } from "@/lib/clientAuth";
import { SignInScreen } from "@/components/access/SignInScreen";
import { ClientWorkspace } from "@/components/access/ClientWorkspace";

export const metadata: Metadata = { title: "Cameron Workspace | Vela", robots: { index: false } };
export const dynamic = "force-dynamic";

const SLUG = "cameron";
const NAME = "Cameron";
const ACCENT = "var(--star-gold)";

export default async function CameronWorkspacePage({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const sp = await searchParams;
  const store = await cookies();
  const authed = verifyToken(SLUG, store.get(cookieName(SLUG))?.value);
  if (!authed) {
    return <SignInScreen slug={SLUG} name={NAME} accent={ACCENT} error={sp.e === "1"} />;
  }
  return <ClientWorkspace slug={SLUG} accent={ACCENT} />;
}
