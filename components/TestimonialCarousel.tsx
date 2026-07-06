"use client";

import { Star } from "lucide-react";
import { hospitals } from "@/data/hospitals";

const testimonials = hospitals.flatMap((h) =>
  h.reviews.map((r) => ({ ...r, hospital: h.name }))
);

export default function TestimonialCarousel() {
  return (
    <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="flex w-[320px] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-line bg-white p-6 md:w-[380px]"
        >
          <div className="flex gap-1 text-primary">
            {Array.from({ length: t.rating }).map((_, idx) => (
              <Star key={idx} size={16} className="fill-primary text-primary" />
            ))}
          </div>
          <p className="text-lg font-medium leading-snug text-ink">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="mt-auto text-sm font-bold text-ink/60">
            {t.author} &middot; {t.hospital}
          </div>
        </div>
      ))}
    </div>
  );
}
