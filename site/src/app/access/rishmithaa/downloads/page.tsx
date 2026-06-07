import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadsPage } from "@/components/access/DownloadsPage";
import { getClientDownloadKit } from "@/data/client-downloads";

export const metadata: Metadata = {
  title: "Rishmithaa Markdown Downloads | Vela",
  description: "Rishmithaa's downloadable Vela markdown kit: starter files, front-end skills, and reviewer agents.",
  robots: { index: false },
};

export default function RishmithaaDownloadsPage() {
  const kit = getClientDownloadKit("rishmithaa");
  if (!kit) notFound();
  return <DownloadsPage kit={kit} />;
}
