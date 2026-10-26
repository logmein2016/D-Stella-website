"use client";

import { usePathname } from "next/navigation";
import ContactIcons from "@/components/shared/ContactIcons";
import styles from "./ContactBar.module.css";

export default function ContactBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className={styles.bar}>
      <ContactIcons direction="column" className={styles.icons} />
    </div>
  );
}
