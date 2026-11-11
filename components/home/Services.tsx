import Image from "next/image";
import { serviceGroups } from "@/lib/data/services";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h6 className={styles.kicker}>Services</h6>
        <h2 className={styles.heading}>End to end home interiors, in one place</h2>
        <p className={styles.intro}>
          Every room, every fixture, built and installed by the same team &mdash; no separate
          contractors to coordinate between.
        </p>

        <div className={styles.grid}>
          {serviceGroups.map((group) => (
            <article key={group.title} className={styles.card}>
              <div className={styles.photo}>
                <Image
                  src={group.photo.src}
                  alt={group.photo.alt}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 400px"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{group.title}</h3>
                <ul className={styles.items}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
