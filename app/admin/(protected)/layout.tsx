"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase/client";
import styles from "./layout.module.css";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabaseBrowser.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === null) router.replace("/admin/login");
  }, [session, router]);

  if (session === undefined) {
    return <div className={styles.loading}>Loading…</div>;
  }
  if (session === null) {
    return null;
  }

  async function handleLogout() {
    await supabaseBrowser.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <span className={styles.brand}>D&rsquo;Stella Admin</span>
        <nav className={styles.nav}>
          <Link href="/admin" className={pathname === "/admin" ? styles.navLinkActive : styles.navLink}>
            Leads
          </Link>
          <Link
            href="/admin/photos"
            className={pathname === "/admin/photos" ? styles.navLinkActive : styles.navLink}
          >
            Photos
          </Link>
          <Link
            href="/admin/maintenance"
            className={pathname === "/admin/maintenance" ? styles.navLinkActive : styles.navLink}
          >
            Maintenance
          </Link>
        </nav>
        <button type="button" className={styles.logout} onClick={handleLogout}>
          Log out
        </button>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
