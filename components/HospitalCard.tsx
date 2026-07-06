"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import { Hospital } from "@/data/hospitals";
import { picsum } from "@/lib/utils";

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors duration-300 hover:border-primary"
    >
      <Link href={`/hospitals/${hospital.slug}`} className="flex h-full flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={picsum(hospital.photoSeed, 640, 400)}
            alt={`${hospital.name} exterior`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink shadow-sm">
            <ShieldCheck size={14} className="text-primary" />
            {hospital.accreditation}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold leading-tight text-ink">
              {hospital.name}
            </h3>
            <div className="flex shrink-0 items-center gap-1 text-sm font-bold text-ink">
              <Star size={14} className="fill-primary text-primary" />
              {hospital.rating}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-medium text-ink/60">
            <MapPin size={14} />
            {hospital.city}, {hospital.state}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {hospital.specialties.slice(0, 3).map((s) => (
              <span key={s} className="tag-pill bg-sky text-xs">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4">
            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors group-hover:text-primary-deep">
              View Profile
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
