"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { submitLead, type LeadInput } from "@/lib/leads";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import ContextChip from "@/components/shared/ContextChip";
import styles from "./LeadForm.module.css";

export type LeadFormProps = {
  kicker: string;
  heading: string;
  subheading: string;
  submitLabel?: string;
  /** Home page only — shows the reference-link field alongside Email as a
   * 2-up pair. When false, Email renders full width instead of leaving a
   * dead half-width cell (see the handoff README). */
  showReference?: boolean;
  /** Human-readable selection summary; renders the context chip when set. */
  context?: string;
  bhk?: string;
  finish?: string;
  priceRange?: string;
  /** Which form this is — written to the leads table's source column. */
  source: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  reference: string;
  message: string;
  whatsappOk: boolean;
  company: string; // honeypot
  sending: boolean;
  done: boolean;
  error: string;
  whatsappHref: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  reference: "",
  message: "",
  whatsappOk: true,
  company: "",
  sending: false,
  done: false,
  error: "",
  whatsappHref: "",
};

export default function LeadForm({
  kicker,
  heading,
  subheading,
  submitLabel = "Send my enquiry",
  showReference = false,
  context = "",
  bhk = "",
  finish = "",
  priceRange = "",
  source,
}: LeadFormProps) {
  const [state, setState] = useState<FormState>(initialState);
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!state.name.trim() || !state.phone.trim()) {
      set("error", "Please add your name and phone number.");
      return;
    }
    setState((s) => ({ ...s, sending: true, error: "" }));

    const lead: LeadInput = {
      name: state.name.trim(),
      phone: state.phone.trim(),
      email: state.email.trim(),
      reference: state.reference.trim(),
      message: state.message.trim(),
      whatsappOk: state.whatsappOk,
      bhk,
      finish,
      priceRange,
      context,
      source,
      company: state.company,
    };

    const res = await submitLead(lead, WHATSAPP_NUMBER);
    setState((s) => ({
      ...s,
      sending: false,
      done: true,
      whatsappHref: res.ok ? "" : res.whatsapp || "",
    }));
  }

  if (state.done) {
    const doneName = state.name.trim().split(/\s+/)[0] || "there";
    return (
      <div className={styles.card}>
        <div className={styles.success}>
          <div className={styles.badge}>
            <Check size={24} strokeWidth={2.5} />
          </div>
          <h3 className={styles.successHeading}>Thanks, {doneName}.</h3>
          <p className={styles.successBody}>
            We&rsquo;ve got your details. One of our designers will call you within one working day.
          </p>
          {state.whatsappHref ? (
            <a
              href={state.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ justifyContent: "flex-start" }}
            >
              Continue on WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <form className={styles.stack} onSubmit={handleSubmit} noValidate>
        <div className={styles.intro}>
          <span className={styles.kicker}>{kicker}</span>
          <h3 className={styles.heading}>{heading}</h3>
          <p className={styles.subheading}>{subheading}</p>
        </div>

        {context ? <ContextChip context={context} /> : null}

        <div className={styles.grid}>
          <div className="field">
            <label htmlFor={`${source}-name`}>Your name</label>
            <input
              id={`${source}-name`}
              className="input"
              type="text"
              placeholder="Full name"
              value={state.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor={`${source}-phone`}>Phone number</label>
            <input
              id={`${source}-phone`}
              className="input"
              type="tel"
              placeholder="+91 98765 43210"
              value={state.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        </div>

        <label className={styles.consentRow}>
          <input
            type="checkbox"
            checked={state.whatsappOk}
            onChange={(e) => set("whatsappOk", e.target.checked)}
          />
          <span>This number is on WhatsApp — reach me there</span>
        </label>

        {showReference ? (
          <div className={styles.grid}>
            <div className="field">
              <label htmlFor={`${source}-email`}>
                Email <span className={styles.optional}>(optional)</span>
              </label>
              <input
                id={`${source}-email`}
                className="input"
                type="email"
                placeholder="you@example.com"
                value={state.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor={`${source}-reference`}>
                Reference link <span className={styles.optional}>(optional)</span>
              </label>
              <input
                id={`${source}-reference`}
                className="input"
                type="url"
                placeholder="Pinterest board or design link"
                value={state.reference}
                onChange={(e) => set("reference", e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="field">
            <label htmlFor={`${source}-email`}>
              Email <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id={`${source}-email`}
              className="input"
              type="email"
              placeholder="you@example.com"
              value={state.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
        )}

        <div className="field">
          <label htmlFor={`${source}-message`}>
            Anything you&rsquo;d like to tell us <span className={styles.optional}>(optional)</span>
          </label>
          <textarea
            id={`${source}-message`}
            className="input"
            rows={3}
            placeholder="Apartment name, possession date, rooms you want done first…"
            value={state.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </div>

        {/* Honeypot — hidden from real visitors via CSS, not `type=hidden`,
            so a naive bot that only skips hidden inputs still fills it in. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={`${source}-company`}>Company</label>
          <input
            id={`${source}-company`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={state.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>

        {state.error ? <p className={styles.error}>{state.error}</p> : null}

        <div className={styles.actions}>
          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            style={{ justifyContent: "flex-start" }}
            disabled={state.sending}
          >
            {state.sending ? "Sending…" : submitLabel}
          </button>
          <span className={styles.reassurance}>Name and phone are all we need.</span>
        </div>
      </form>
    </div>
  );
}
