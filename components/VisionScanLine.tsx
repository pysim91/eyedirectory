"use client";

import { motion } from "framer-motion";

export function VisionScanSweep({ delay = 0 }: { delay?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 h-px w-1/3 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ boxShadow: "0 0 24px 2px rgba(30, 79, 255, 0.6)" }}
        initial={{ x: "-120%", opacity: 0 }}
        animate={{ x: ["-120%", "320%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2.2,
          delay,
          ease: [0.65, 0, 0.35, 1],
          times: [0, 0.15, 0.85, 1],
        }}
      />
    </div>
  );
}

export function ScanDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden bg-line dark:bg-white/10">
      <motion.div
        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ x: "-10%" }}
        whileInView={{ x: "110%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      />
    </div>
  );
}
