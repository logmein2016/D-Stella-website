import Image from "next/image";
import { ImageIcon } from "lucide-react";
import styles from "./ImageSlot.module.css";

// Prototype tooling (image-slot.js) is explicitly "do not port" per the
// handoff — this is the codebase's own image component: a sized wrapper
// that renders a real <Image> when a src is supplied, or a graceful empty
// state when it isn't (Kitchen, Study, Kids' Room, and every portfolio tile
// have no photography yet). Real project photography from the client drops
// in here without touching any page/section component.

type ImageSlotProps = {
  src?: string;
  alt: string;
  credit?: string;
  creditHref?: string;
  placeholder?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function ImageSlot({
  src,
  alt,
  credit,
  creditHref,
  placeholder = "Photo coming soon",
  className,
  sizes = "(max-width: 640px) 100vw, 50vw",
  priority,
}: ImageSlotProps) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={styles.image}
            priority={priority}
          />
          {credit ? (
            <span className={styles.credit}>
              {creditHref ? (
                <a href={creditHref} target="_blank" rel="noopener noreferrer">
                  {credit}
                </a>
              ) : (
                credit
              )}
            </span>
          ) : null}
        </>
      ) : (
        <div className={styles.empty} aria-hidden="true">
          <ImageIcon size={28} strokeWidth={1.6} />
          <span className={styles.caption}>{placeholder}</span>
        </div>
      )}
    </div>
  );
}
