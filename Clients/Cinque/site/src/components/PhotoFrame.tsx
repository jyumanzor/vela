import type { ReactNode } from "react";
import type { Photo } from "@/data/galleries";
import { hasPhotoAsset } from "@/data/galleries";

interface PhotoFrameProps {
  photo: Photo;
  className?: string;
  imageClassName?: string;
  showFallbackDetails?: boolean;
  children?: ReactNode;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function PhotoFrame({
  photo,
  className,
  imageClassName,
  showFallbackDetails = false,
  children,
}: PhotoFrameProps) {
  const hasAsset = hasPhotoAsset(photo);

  return (
    <div
      className={joinClasses("relative overflow-hidden", className)}
      style={{ aspectRatio: photo.aspect || "3/2" }}
    >
      {hasAsset ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className={joinClasses("h-full w-full object-cover", imageClassName)}
          loading="lazy"
          draggable={false}
        />
      ) : (
        <div
          aria-label={photo.alt}
          className="absolute inset-0 flex"
          style={{ background: photo.gradient }}
        >
          {showFallbackDetails && (
            <div className="mt-auto w-full bg-[linear-gradient(180deg,rgba(26,26,26,0.08)_0%,rgba(26,26,26,0.82)_100%)] px-4 py-4 sm:px-5">
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-cream/70">
                Preview
              </p>
              <p className="mt-2 font-display text-xl leading-tight text-cream sm:text-2xl">
                {photo.caption ?? photo.alt}
              </p>
              <p className="mt-2 font-body text-xs leading-relaxed text-cream/80 sm:text-sm">
                {[photo.location, photo.date].filter(Boolean).join(" • ") || photo.alt}
              </p>
            </div>
          )}
        </div>
      )}

      {children && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}

