import { services } from "@/lib/data/services";
import styles from "./Services.module.css";

const TONES = [styles.toneAccent, styles.toneGold, styles.toneEmerald];

export default function Services() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h6 className={styles.kicker}>Services</h6>
        <h2 className={styles.heading}>End-to-end home interiors, in one place</h2>
        <p className={styles.intro}>
          Every room, every fixture, built and installed by the same team — no separate
          contractors to coordinate between.
        </p>

        <div className={styles.grid}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className={styles.item}>
                <div className={`${styles.iconWrap} ${TONES[i % TONES.length]}`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <span className={styles.label}>{service.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
