"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Eye } from "lucide-react";
import { Hospital, ServiceLevel } from "@/data/hospitals";
import { serviceLevelMeta } from "@/lib/utils";

const tileStyles: Record<ServiceLevel, { bg: string; icon: string }> = {
  "walk-in": { bg: "bg-status-walkin/10", icon: "text-status-walkin" },
  booked: { bg: "bg-status-booked/10", icon: "text-status-booked" },
  none: { bg: "bg-status-none/10", icon: "text-status-none" },
};

export default function HospitalCard({
  hospital,
  distanceMiles,
}: {
  hospital: Hospital;
  distanceMiles?: number;
}) {
  const meta = serviceLevelMeta[hospital.serviceLevel];
  const tile = tileStyles[hospital.serviceLevel];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors duration-300 hover:border-primary dark:border-white/10 dark:bg-surface dark:hover:border-primary-light"
    >
      <Link href={`/hospitals/${hospital.slug}`} className="flex h-full flex-col">
        <div className={`flex h-28 shrink-0 items-center justify-center ${tile.bg}`}>
          <Eye size={36} strokeWidth={1.5} className={tile.icon} />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div
            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${meta.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </div>

          <h3 className="text-xl font-bold leading-tight text-ink dark:text-white">
            {hospital.name}
          </h3>

          <div className="flex items-center gap-1.5 text-sm font-medium text-ink/60 dark:text-white/60">
            <MapPin size={14} className="shrink-0" />
            {hospital.city}, {hospital.region}
            {distanceMiles !== undefined && (
              <span className="font-bold text-primary dark:text-primary-light">
                &middot; {distanceMiles < 10 ? distanceMiles.toFixed(1) : Math.round(distanceMiles)} mi
              </span>
            )}
          </div>

          {hospital.telephone && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-ink/60 dark:text-white/60">
              <Phone size={14} className="shrink-0" />
              <span className="truncate">{hospital.telephone.split("\n")[0]}</span>
            </div>
          )}

          <div className="mt-auto pt-1">
            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors group-hover:text-primary-deep dark:text-primary-light">
              View details
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
