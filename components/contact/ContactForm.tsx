"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { submitLead, type LeadInput } from "@/lib/leads";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import styles from "./ContactForm.module.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectName: string;
  company: string; // honeypot
  sending: boolean;
  done: boolean;
  error: string;
  whatsappHref: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  projectName: "",
  company: "",
  sending: false,
  done: false,
  error: "",
  whatsappHref: "",
};

export default function ContactForm() {
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
      reference: "",
      message: "",
      whatsappOk: true,
      projectName: state.projectName.trim(),
      source: "contact-page",
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
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            className="input"
            type="text"
            placeholder="Full name"
            value={state.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="contact-email">
            Email ID <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="contact-email"
            className="input"
            type="email"
            placeholder="you@example.com"
            value={state.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="contact-phone">
            Phone number <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-phone"
            className="input"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={state.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="contact-project">
            Project name <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="contact-project"
            className="input"
            type="text"
            placeholder="Apartment / society name"
            value={state.projectName}
            onChange={(e) => set("projectName", e.target.value)}
          />
        </div>

        {/* Honeypot — hidden from real visitors via CSS, not `type=hidden`,
            so a naive bot that only skips hidden inputs still fills it in. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
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
            className="btn btn-primary"
            style={{ justifyContent: "flex-start" }}
            disabled={state.sending}
          >
            {state.sending ? "Sending…" : "Submit"}
          </button>
          <span className={styles.reassurance}>Only phone number is required.</span>
        </div>
      </form>
    </div>
  );
}
