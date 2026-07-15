"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const CONTACT_EMAIL = "enquiries@emergency-eyecare.co.uk";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = `Enquiry from ${name || "website visitor"}`;
      const body = `${message}\n\n—\nFrom: ${name}\nEmail: ${email}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Enquiry from ${name || "website visitor"}`,
          from_name: name,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-10 text-center dark:border-white/10 dark:bg-surface">
        <CheckCircle2 size={32} className="text-status-walkin" />
        <p className="text-lg font-bold text-ink dark:text-white">Message sent</p>
        <p className="text-sm font-medium text-ink/60 dark:text-white/60">
          Thanks for getting in touch — we&apos;ll get back to you soon
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-bold text-primary hover:text-primary-deep dark:text-primary-light"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 dark:border-white/10 dark:bg-surface sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-ink dark:text-white">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-xl border border-line bg-white px-4 py-3 text-base font-medium text-ink placeholder:text-ink/40 focus:border-primary dark:border-white/10 dark:bg-ink dark:text-white dark:placeholder:text-white/40 dark:focus:border-primary-light"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-bold text-ink dark:text-white">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-xl border border-line bg-white px-4 py-3 text-base font-medium text-ink placeholder:text-ink/40 focus:border-primary dark:border-white/10 dark:bg-ink dark:text-white dark:placeholder:text-white/40 dark:focus:border-primary-light"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-bold text-ink dark:text-white">Message</span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          className="resize-none rounded-xl border border-line bg-white px-4 py-3 text-base font-medium text-ink placeholder:text-ink/40 focus:border-primary dark:border-white/10 dark:bg-ink dark:text-white dark:placeholder:text-white/40 dark:focus:border-primary-light"
        />
      </label>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-status-booked/30 bg-status-booked/10 px-4 py-3 text-sm font-medium text-status-booked">
          <AlertCircle size={16} className="shrink-0" />
          Something went wrong sending your message Please try again, or email{" "}
          {CONTACT_EMAIL} directly
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-extrabold text-white transition-colors hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            Sending
            <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            Send message
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
