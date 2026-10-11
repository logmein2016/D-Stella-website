"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { processFaq } from "@/lib/data/process-faq";
import styles from "./ProcessFaq.module.css";

export default function ProcessFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {processFaq.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className={styles.item}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.question}</span>
              <Plus size={18} strokeWidth={2} className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} />
            </button>
            {isOpen ? <p className={styles.answer}>{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
