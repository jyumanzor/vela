import { NextRequest, NextResponse } from "next/server";
import { getPublicDownloadKit } from "@/data/public-downloads";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function redirectTo(req: NextRequest, params: Record<string, string>) {
  const url = new URL("/downloads", req.url);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return NextResponse.redirect(url, { status: 303 });
}

function absoluteUrl(origin: string, path: string) {
  return new URL(path, origin).toString();
}

function buildEmail({ email, kit, origin }: { email: string; kit: ReturnType<typeof getPublicDownloadKit>; origin: string }) {
  const libraryUrl = absoluteUrl(origin, kit.libraryPath);
  const fileLinks = kit.files.map((file) => ({
    ...file,
    url: absoluteUrl(origin, file.path),
  }));

  const text = [
    `${kit.label}`,
    "",
    kit.description,
    "",
    `Full kit library: ${libraryUrl}`,
    "",
    "Core files:",
    ...fileLinks.map((file) => `- ${file.label}: ${file.url}`),
    "",
    "Sent from Vela.",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #141E18; line-height: 1.55;">
      <p style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #566B5C;">Vela downloads</p>
      <h1 style="font-size: 28px; margin: 0 0 12px;">${kit.label}</h1>
      <p>${kit.description}</p>
      <p><a href="${libraryUrl}" style="color: #7A4A2B; font-weight: 700;">Open the full markdown library</a></p>
      <p style="margin-top: 24px; font-weight: 700;">Core files</p>
      <ul>
        ${fileLinks.map((file) => `<li><a href="${file.url}" style="color: #7A4A2B;">${file.label}</a></li>`).join("")}
      </ul>
      <p style="font-size: 12px; color: #566B5C; margin-top: 28px;">Requested by ${email}.</p>
    </div>
  `;

  return { text, html };
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const kit = getPublicDownloadKit(String(form.get("kit") ?? ""));

  if (!EMAIL_PATTERN.test(email)) {
    return redirectTo(req, { kit: kit.id, status: "invalid" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.DOWNLOAD_FROM_EMAIL || process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(`[downloads] Email provider missing; request not sent. kit=${kit.id} email=${email}`);
    return redirectTo(req, { kit: kit.id, email, status: "setup" });
  }

  const origin = req.headers.get("origin") || new URL(req.url).origin;
  const message = buildEmail({ email, kit, origin });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: `Vela ${kit.shortLabel}`,
      html: message.html,
      text: message.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`[downloads] Resend failed. status=${response.status} body=${body}`);
    return redirectTo(req, { kit: kit.id, email, status: "error" });
  }

  return redirectTo(req, { kit: kit.id, email, status: "sent" });
}
