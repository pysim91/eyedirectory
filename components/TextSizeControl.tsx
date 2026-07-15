"use client";

import { useEffect, useState } from "react";

type TextSize = "normal" | "large" | "larger";

const sizes: { value: TextSize; label: string; glyphSize: string }[] = [
  { value: "normal", label: "Normal text size", glyphSize: "text-xs" },
  { value: "large", label: "Large text size", glyphSize: "text-sm" },
  { value: "larger", label: "Larger text size", glyphSize: "text-base" },
];

export default function TextSizeControl({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState<TextSize>("normal");

  useEffect(() => {
    setMounted(true);
    const attr = document.documentElement.getAttribute("data-text-size");
    setSize(attr === "large" || attr === "larger" ? attr : "normal");
  }, []);

  function apply(next: TextSize) {
    setSize(next);
    if (next === "normal") {
      document.documentElement.removeAttribute("data-text-size");
    } else {
      document.documentElement.setAttribute("data-text-size", next);
    }
    localStorage.setItem("textSize", next);
  }

  if (!mounted) {
    return <div className={`h-10 w-24 ${className}`} aria-hidden="true" />;
  }

  return (
    <div
      role="group"
      aria-label="Adjust text size"
      className={`notranslate flex h-10 items-center gap-0.5 rounded-full border border-line px-1.5 text-ink dark:border-white/10 dark:text-white ${className}`}
    >
      {sizes.map((s, i) => (
        <div key={s.value} className="flex items-center">
          {i > 0 && <span className="text-ink/20 dark:text-white/20">|</span>}
          <button
            type="button"
            onClick={() => apply(s.value)}
            aria-label={s.label}
            aria-pressed={size === s.value}
            className={`flex h-7 w-7 items-center justify-center rounded-full font-extrabold transition-colors ${s.glyphSize} ${
              size === s.value
                ? "bg-primary text-white"
                : "text-ink/60 hover:text-primary dark:text-white/60 dark:hover:text-primary-light"
            }`}
          >
            A
          </button>
        </div>
      ))}
    </div>
  );
}
