import type { Metadata } from "next";
import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { RevealGroup, RevealItem } from "@/components/RevealOnScroll";

const CONTACT_EMAIL = "enquiries@emergency-eyecare.co.uk";

export const metadata: Metadata = {
  title: "Contact | Emergency Eye Care Directory",
  description: "Questions or corrections about the UK eye casualty directory? Get in touch.",
};

export default function ContactPage() {
  return (
    <div>
      <div className="border-b border-line bg-sky py-16 dark:border-white/10 dark:bg-sky-dark">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-section-header font-extrabold text-ink dark:text-white">
            Contact
          </h1>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <RevealGroup>
          <RevealItem>
            <p className="text-lg font-medium leading-relaxed text-ink/80 dark:text-white/80">
              For any questions, corrections, or feedback about the
              directory, please use the form below.
            </p>
            <p className="mt-3 text-lg font-medium leading-relaxed text-ink/80 dark:text-white/80">
              You may also email us directly at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-primary-deep dark:text-primary-light"
              >
                <Mail size={16} />
                {CONTACT_EMAIL}
              </a>
            </p>
          </RevealItem>

          <RevealItem className="mt-10">
            <ContactForm />
          </RevealItem>
        </RevealGroup>
      </section>
    </div>
  );
}
