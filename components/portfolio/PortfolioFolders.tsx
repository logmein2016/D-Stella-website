import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { galleryRooms } from "@/lib/data/gallery";
import styles from "./PortfolioFolders.module.css";

export default function PortfolioFolders() {
  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>Browse by room</h6>
      <h2 className={styles.heading}>Real homes, organised by room</h2>

      <div className={styles.grid}>
        {galleryRooms.map((room) => (
          <Link key={room.slug} href={`/portfolio/${room.slug}`} className={styles.folder}>
            <div className={styles.folderImage}>
              <Image
                src={room.coverSrc}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className={styles.image}
              />
            </div>
            <div className={styles.folderCaption}>
              <span className={styles.folderName}>{room.name}</span>
              <span className={styles.folderCount}>{room.photos.length} photo{room.photos.length === 1 ? "" : "s"}</span>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/portfolio/inspirations" className={styles.inspirations}>
        <Sparkles size={20} strokeWidth={2} />
        <span className={styles.inspirationsText}>
          <span className={styles.inspirationsTitle}>Design Inspirations</span>
          <span className={styles.inspirationsSub}>Concept boards and ideas we&rsquo;re curating for upcoming styles</span>
        </span>
        <ArrowRight size={18} strokeWidth={2} />
      </Link>
    </section>
  );
}
