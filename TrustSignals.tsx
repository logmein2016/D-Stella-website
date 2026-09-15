import { ShieldCheck, Wallet, CalendarCheck } from "lucide-react";
import styles from "./TrustSignals.module.css";

// Only categories and language D'Stella has actually confirmed appear here —
// no specific warranty terms, EMI tenures or delivery dates are invented.
// See design_handoff follow-up notes: "Warranty / EMI / delivery-time
// guarantees" as a category, plus the client's own reliability statement,
// quoted verbatim in the callout below.
const trustItems = [
  {
    icon: ShieldCheck,
    title: "Workmanship warranty",
    body: "Every project is backed by a workmanship warranty, so defects after handover are on us to fix.",
  },
  {
    icon: Wallet,
    title: "EMI options",
    body: "Spread the cost with easy EMI options — ask your designer what's available for your budget.",
  },
  {
    icon: CalendarCheck,
    title: "A committed handover date",
    body: "You get a delivery timeline in writing before work begins, not a moving target.",
  },
];

export default function TrustSignals() {
  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>Why homeowners choose us</h6>
      <h2 className={styles.heading}>Reliability and predictability</h2>

      <div className={styles.grid}>
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className={`card elev-sm ${styles.card}`}>
              <Icon size={24} strokeWidth={2} color="var(--color-accent)" />
              <span className="card-title">{item.title}</span>
              <p className="card-body">{item.body}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.callout}>
        <p className={styles.quote}>
          &ldquo;No surprises in terms of random charges and last minute unnecessary delays.&rdquo;
        </p>
        <span className={styles.quoteAttr}>— D&rsquo;Stella Interiors</span>
      </div>
    </section>
  );
}
