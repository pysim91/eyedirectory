"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

const STORAGE_KEY = "hcp-acknowledged";
const REG_NUMBER_PATTERN = /^[A-Za-z0-9]{5,10}$/;

export default function HealthcareGate() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [regNumber, setRegNumber] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "true") {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isValid = REG_NUMBER_PATTERN.test(regNumber.trim());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setOpen(false);
  }

  if (!mounted || !open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hcp-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm dark:bg-black/80"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-2xl dark:border-white/10 dark:bg-surface"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-light">
          <ShieldCheck size={28} />
        </div>

        <h2
          id="hcp-gate-title"
          className="mt-5 text-xl font-extrabold text-ink dark:text-white"
        >
          For healthcare professionals
        </h2>

        <p className="mt-3 text-sm font-medium leading-relaxed text-ink/70 dark:text-white/70">
          This directory contains clinical referral information, contact
          details, and service-level designations intended for use by
          healthcare professionals only — it is not written for patients or
          the general public.
        </p>

        <label className="mt-5 block text-left">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink/50 dark:text-white/50">
            GMC/GOC/NMC/HCPC number
          </span>
          <input
            type="text"
            inputMode="text"
            autoFocus
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="e.g. 1234567"
            aria-invalid={touched && !isValid}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base font-medium text-ink placeholder:text-ink/40 focus:border-primary dark:border-white/10 dark:bg-ink dark:text-white dark:placeholder:text-white/40 dark:focus:border-primary-light"
          />
          {touched && !isValid && (
            <span className="mt-1.5 block text-xs font-bold text-status-booked">
              Enter a valid registration number.
            </span>
          )}
        </label>

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-primary px-6 py-3.5 text-base font-extrabold text-white transition-colors hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          I confirm I am a qualified healthcare professional — Enter
        </button>

        <a
          href="https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/"
          className="mt-3 inline-block text-sm font-bold text-ink/50 underline hover:text-ink dark:text-white/50 dark:hover:text-white"
        >
          I'm not a healthcare professional
        </a>
      </form>
    </div>
  );
}
