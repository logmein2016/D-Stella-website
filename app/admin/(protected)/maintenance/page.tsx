"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Loader2, PlayCircle } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";
import styles from "./page.module.css";

type CheckStatus = "idle" | "running" | "pass" | "fail";
type CheckResult = { status: CheckStatus; message?: string };

const CHECKLIST: { period: string; items: string[] }[] = [
  {
    period: "Daily / as leads come in",
    items: [
      "Check the Leads dashboard for new submissions and respond within one working day.",
      "Update each lead's status as you work it (New → Contacted → Quoted → Won/Lost).",
    ],
  },
  {
    period: "Weekly",
    items: [
      "Follow up on anything still marked “New” after 2+ days — nothing should sit untouched.",
      "Run the health checks below, or submit a real test enquiry, to catch silent failures early.",
    ],
  },
  {
    period: "Monthly",
    items: [
      "Add newly completed projects via Admin → Photos.",
      "Confirm the phone number and WhatsApp links across the site still work (header, footer, floating buttons).",
      "Re-check the estimator's starting prices still reflect current material and labour costs.",
    ],
  },
  {
    period: "Quarterly",
    items: [
      "Click through every page and nav link, checking for anything broken or outdated.",
      "Review page copy (About, Process, Portfolio descriptions) for accuracy.",
      "Check Supabase usage (Project → Settings → Usage) isn't approaching free-tier limits.",
    ],
  },
  {
    period: "As needed",
    items: [
      "Rotate or refresh the home page hero carousel images.",
      "Retire portfolio projects/photos that no longer represent current work.",
    ],
  },
];

function ResultIcon({ status }: { status: CheckStatus }) {
  if (status === "running") return <Loader2 size={16} strokeWidth={2} className={styles.spin} />;
  if (status === "pass") return <CheckCircle2 size={16} strokeWidth={2} color="var(--color-emerald)" />;
  if (status === "fail") return <XCircle size={16} strokeWidth={2} color="var(--color-accent-700)" />;
  return <PlayCircle size={16} strokeWidth={2} />;
}

export default function MaintenancePage() {
  const [leadCheck, setLeadCheck] = useState<CheckResult>({ status: "idle" });
  const [storageCheck, setStorageCheck] = useState<CheckResult>({ status: "idle" });

  async function runLeadCheck() {
    setLeadCheck({ status: "running" });
    const marker = `maintenance-check-${Date.now()}`;
    const { data, error } = await supabaseBrowser
      .from("leads")
      .insert({ name: "Maintenance check", phone: marker, source: "maintenance-check" })
      .select()
      .single();

    if (error) {
      setLeadCheck({ status: "fail", message: error.message });
      return;
    }

    const { error: deleteError } = await supabaseBrowser.from("leads").delete().eq("id", data.id);
    if (deleteError) {
      setLeadCheck({
        status: "fail",
        message: `Insert worked but cleanup failed — a test row (${marker}) is left in the leads table. ${deleteError.message}`,
      });
      return;
    }

    setLeadCheck({ status: "pass", message: "Lead forms can write to the database — insert and cleanup both succeeded." });
  }

  async function runStorageCheck() {
    setStorageCheck({ status: "running" });
    const { error } = await supabaseBrowser.storage.from("gallery").list("", { limit: 1 });
    if (error) {
      setStorageCheck({ status: "fail", message: error.message });
      return;
    }
    setStorageCheck({ status: "pass", message: "Photo storage bucket is reachable." });
  }

  return (
    <div>
      <h1 className={styles.heading}>Maintenance</h1>
      <p className={styles.note}>
        Live checks to catch problems early, plus a checklist of what&rsquo;s worth doing on a
        regular basis.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Health checks</h2>

        <div className={styles.checkRow}>
          <div className={styles.checkInfo}>
            <span className={styles.checkTitle}>Lead form saving</span>
            <span className={styles.checkDesc}>
              Inserts and immediately deletes a test row — confirms the site&rsquo;s forms can
              actually reach the database (this is exactly the check that would have caught the
              missing-column bug immediately).
            </span>
          </div>
          <button type="button" className="btn btn-secondary" onClick={runLeadCheck} disabled={leadCheck.status === "running"}>
            <ResultIcon status={leadCheck.status} />
            Run check
          </button>
        </div>
        {leadCheck.message ? (
          <p className={leadCheck.status === "fail" ? styles.fail : styles.pass}>{leadCheck.message}</p>
        ) : null}

        <div className={styles.checkRow}>
          <div className={styles.checkInfo}>
            <span className={styles.checkTitle}>Photo storage</span>
            <span className={styles.checkDesc}>Confirms the admin panel can reach the photo storage bucket.</span>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={runStorageCheck}
            disabled={storageCheck.status === "running"}
          >
            <ResultIcon status={storageCheck.status} />
            Run check
          </button>
        </div>
        {storageCheck.message ? (
          <p className={storageCheck.status === "fail" ? styles.fail : styles.pass}>{storageCheck.message}</p>
        ) : null}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Regular maintenance checklist</h2>
        <div className={styles.checklistGrid}>
          {CHECKLIST.map((group) => (
            <div key={group.period} className={styles.checklistGroup}>
              <h3 className={styles.checklistPeriod}>{group.period}</h3>
              <ul className={styles.checklistItems}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
