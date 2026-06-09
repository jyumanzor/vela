import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyToken, cookieName, verifyAdmin, adminCookieName } from "@/lib/clientAuth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

function authed(req: NextRequest, slug: string): boolean {
  return (
    verifyToken(slug, req.cookies.get(cookieName(slug))?.value) ||
    verifyAdmin(req.cookies.get(adminCookieName)?.value)
  );
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  if (!authed(req, slug)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("client_graphs")
    .select("root_id, nodes, edges, updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ stored: false });
  }

  return NextResponse.json({
    stored: true,
    graph: { rootId: data.root_id, nodes: data.nodes, edges: data.edges },
    updatedAt: data.updated_at,
  });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  if (!authed(req, slug)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { rootId, nodes, edges } = body as {
    rootId: string;
    nodes: unknown[];
    edges: unknown[];
  };

  if (!rootId || !Array.isArray(nodes) || !Array.isArray(edges)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const { error } = await supabase.from("client_graphs").upsert(
    { slug, root_id: rootId, nodes, edges, updated_at: new Date().toISOString() },
    { onConflict: "slug" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
