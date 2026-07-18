"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "zh-CN", label: "中文（简体）" },
  { code: "nl", label: "Nederlands" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pl", label: "Polski" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
];

let googleTranslateLoadStarted = false;

function loadGoogleTranslate() {
  if (googleTranslateLoadStarted) return;
  googleTranslateLoadStarted = true;

  (window as any).googleTranslateElementInit = function () {
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "ar,zh-CN,nl,en,fr,de,it,pl,pt,es",
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };

  const script = document.createElement("script");
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
}

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setMounted(true);
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    if (match) {
      setLang(match[1]);
      // Returning visitor already has a non-English language selected —
      // load the widget immediately so the page actually translates.
      if (match[1] !== "en") loadGoogleTranslate();
    }
  }, []);

  function changeLanguage(code: string) {
    setLang(code);

    if (code === "en") {
      document.cookie = "googtrans=/en/en; path=/";
      document.cookie = `googtrans=/en/en; domain=.${window.location.hostname}; path=/`;
    } else {
      document.cookie = `googtrans=/en/${code}; path=/`;
      document.cookie = `googtrans=/en/${code}; domain=.${window.location.hostname}; path=/`;
    }

    const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  }

  if (!mounted) {
    return <div className={`h-10 w-10 ${className}`} aria-hidden="true" />;
  }

  return (
    <div className={`notranslate relative flex h-10 items-center ${className}`}>
      <Languages
        size={15}
        className="pointer-events-none absolute left-3 text-ink/60 dark:text-white/60"
      />
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        onFocus={loadGoogleTranslate}
        onMouseDown={loadGoogleTranslate}
        aria-label="Translate this page"
        className="h-10 appearance-none rounded-full border border-line bg-white py-0 pl-8 pr-3 text-sm font-bold text-ink transition-colors hover:border-primary focus:border-primary dark:border-white/10 dark:bg-ink dark:text-white dark:hover:border-primary-light dark:focus:border-primary-light"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
