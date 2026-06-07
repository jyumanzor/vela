"use client";

import { useState } from "react";
import { fd } from "./primitives";

export function CopyMarkdownButton({ text, accent }: { text: string; accent: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
      style={{
        fontFamily: fd,
        fontSize: 13,
        fontWeight: 700,
        color: copied ? "var(--forest-floor)" : accent,
        background: copied ? accent : "transparent",
        border: `1px solid ${accent}`,
        borderRadius: "var(--radius-pill)",
        padding: "8px 14px",
        cursor: "pointer",
      }}
    >
      {copied ? "Copied" : "Copy text"}
    </button>
  );
}
