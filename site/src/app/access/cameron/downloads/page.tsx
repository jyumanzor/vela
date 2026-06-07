import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadsPage } from "@/components/access/DownloadsPage";
import { getClientDownloadKit } from "@/data/client-downloads";

export const metadata: Metadata = {
  title: "Cameron Markdown Downloads | Vela",
  description: "Cameron's downloadable Vela markdown kit: starter files, skills, and reviewer agents.",
  robots: { index: false },
};

export default function CameronDownloadsPage() {
  const kit = getClientDownloadKit("cameron");
  if (!kit) notFound();
  return <DownloadsPage kit={kit} />;
}
