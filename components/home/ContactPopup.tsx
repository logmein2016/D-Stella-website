"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import LeadForm from "@/components/lead-form/LeadForm";
import styles from "./ContactPopup.module.css";

const STORAGE_KEY = "dstella-popup-shown";
const DELAY_MS = 15000;

export default function ContactPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Private browsing etc. — just show it once per page load instead.
    }
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore — nothing to persist to.
      }
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={() => setOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} aria-label="Close" onClick={() => setOpen(false)}>
          <X size={20} strokeWidth={2} />
        </button>
        <LeadForm
          kicker="Let's get started"
          heading="Have a project in mind?"
          subheading="Share a few details and a designer will call you within one working day."
          submitLabel="Get in touch"
          source="home-popup"
        />
      </div>
    </div>
  );
}
