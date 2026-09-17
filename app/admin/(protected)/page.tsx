"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { Download, Trash2, RefreshCw } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";
import styles from "./page.module.css";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  whatsapp_ok: boolean;
  message: string | null;
  reference: string | null;
  bhk: string | null;
  finish: string | null;
  price_range: string | null;
  context: string | null;
  project_name: string | null;
  source: string | null;
  status: string;
};

const STATUS_OPTIONS = ["new", "contacted", "quoted", "won", "lost"] as const;

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toCsv(rows: Lead[]): string {
  const headers = [
    "Created",
    "Name",
    "Phone",
    "Email",
    "WhatsApp OK",
    "Source",
    "BHK",
    "Finish",
    "Price range",
    "Project",
    "Message",
    "Status",
  ];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [headers.map(escape).join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.created_at,
        r.name,
        r.phone,
        r.email ?? "",
        r.whatsapp_ok ? "Yes" : "No",
        r.source ?? "",
        r.bhk ?? "",
        r.finish ?? "",
        r.price_range ?? "",
        r.project_name ?? "",
        r.message ?? "",
        r.status,
      ]
        .map((v) => escape(String(v)))
        .join(","),
    );
  }
  return lines.join("\n");
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabaseBrowser
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setLeads((data as Lead[]) ?? []);
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.email ?? "").toLowerCase().includes(q) ||
        (l.source ?? "").toLowerCase().includes(q)
      );
    });
  }, [leads, query, statusFilter]);

  async function updateStatus(id: string, status: string) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    const { error: updateError } = await supabaseBrowser.from("leads").update({ status }).eq("id", id);
    if (updateError) setError(updateError.message);
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead? This can't be undone.")) return;
    const prev = leads;
    setLeads((cur) => cur.filter((l) => l.id !== id));
    const { error: deleteError } = await supabaseBrowser.from("leads").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      setLeads(prev);
    }
  }

  function exportCsv() {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className={styles.headRow}>
        <div>
          <h1 className={styles.heading}>Leads</h1>
          <p className={styles.count}>
            {filtered.length} of {leads.length}
          </p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.iconBtn} onClick={loadLeads} title="Refresh">
            <RefreshCw size={16} strokeWidth={2} />
          </button>
          <button type="button" className="btn btn-primary" onClick={exportCsv}>
            <Download size={16} strokeWidth={2} />
            Export CSV
          </button>
        </div>
      </div>

      <div className={styles.filterRow}>
        <input
          className={`input ${styles.search}`}
          type="text"
          placeholder="Search name, phone, email, source…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {capitalize(s)}
            </option>
          ))}
        </select>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}

      {loading ? (
        <p className={styles.empty}>Loading…</p>
      ) : filtered.length === 0 ? (
        <p className={styles.empty}>No leads found.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Source</th>
                <th>BHK / Finish</th>
                <th>Message</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id}>
                  <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td>{lead.name}</td>
                  <td>
                    <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                  </td>
                  <td>{lead.email || "—"}</td>
                  <td>{lead.source || "—"}</td>
                  <td>
                    {[lead.bhk, lead.finish].filter(Boolean).join(" · ") || "—"}
                  </td>
                  <td className={styles.messageCell}>{lead.message || lead.context || "—"}</td>
                  <td>
                    <select
                      className={styles.statusSelect}
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {capitalize(s)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => deleteLead(lead.id)}
                      aria-label="Delete lead"
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
