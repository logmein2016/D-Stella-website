import { rooms } from "@/lib/data/rooms";
import ImageSlot from "@/components/shared/ImageSlot";
import styles from "./RoomGrid.module.css";

export default function RoomGrid() {
  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>Room by room</h6>
      <h2 className={styles.heading}>Every room, planned around how you live</h2>
      <div className={styles.grid}>
        {rooms.map((room) => (
          <div key={room.id} className={`card elev-sm ${styles.card}`}>
            <div className={`grayscale ${styles.imageWrap}`}>
              <ImageSlot
                src={room.photoSrc}
                alt={room.photoAlt ?? room.name}
                credit={room.photoCredit}
                creditHref={room.photoCreditHref}
                placeholder={room.name}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className={styles.caption}>
              <span className="card-kicker">{room.kicker}</span>
              <span className="card-title">{room.name}</span>
              <p className="card-body">{room.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
