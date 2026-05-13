"use client";

import { motion, useTransform } from "framer-motion";
import { useLenisScroll } from "@/components/providers/SmoothScrollProvider";

export function GlobalAtmosphere() {
  // ── Use the single source of truth for scroll – no extra `useScroll` listener ──
  const { scrollY } = useLenisScroll();

  // Fade the entire backdrop out as you scroll past 1200px.
  // Opacity is composited by the GPU, no repaint.
  const opacity = useTransform(scrollY, [0, 1200], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="
        fixed inset-0 -z-50 overflow-hidden pointer-events-none
        transform-gpu          /* promotes to GPU layer → zero repaints when opacity changes */
      "
    >
      {/* Solid dark base */}
      <div className="absolute inset-0 bg-[#04040b]" />

      {/*
        All blurred blobs are completely static.
        No scale / translate / filter animations → Chrome NEVER repaints them.
      */}
      <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[1400px] h-[700px] rounded-full bg-pink-500/20 blur-[180px]" />
      <div className="absolute top-[5%] right-[10%] w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[140px]" />

      {/* Subtle grid – static */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Scanlines – static */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]" />
    </motion.div>
  );
}