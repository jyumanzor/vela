import { type NextRequest, NextResponse } from "next/server";
import { checkPassword, tokenFor, cookieName } from "@/lib/clientAuth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** POST: check the submitted password, set the access cookie, redirect into the workspace. */
export async function POST(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const data = await req.formData();
  const password = String(data.get("password") ?? "");

  const workspace = `/access/${slug}/workspace`;

  if (!checkPassword(slug, password)) {
    return NextResponse.redirect(new URL(`${workspace}?e=1`, req.url), 303);
  }

  const res = NextResponse.redirect(new URL(workspace, req.url), 303);
  res.cookies.set(cookieName(slug), tokenFor(slug), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/access/${slug}`,
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

/** GET ?signout=1: clear the cookie and return to the public hub. */
export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const url = new URL(req.url);
  if (url.searchParams.get("signout")) {
    const res = NextResponse.redirect(new URL(`/access/${slug}`, req.url), 303);
    res.cookies.set(cookieName(slug), "", { path: `/access/${slug}`, maxAge: 0 });
    return res;
  }
  return NextResponse.redirect(new URL(`/access/${slug}/workspace`, req.url), 303);
}
