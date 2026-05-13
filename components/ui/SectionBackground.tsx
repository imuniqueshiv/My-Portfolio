"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionBackgroundProps {
  children: ReactNode;
  variant?: "education" | "skills" | "projects";
}

export function SectionBackground({
  children,
  variant = "education",
}: SectionBackgroundProps) {
  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden

        will-change-transform
        transform-gpu
      "
    >
      {/* Shared Top Divider */}
      <div
        className="
          absolute
          top-0
          left-0
          z-20
          h-px
          w-full

          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />

      {/* Shared Cinematic Atmosphere */}
      <motion.div
        animate={{
          opacity: [0.16, 0.24, 0.16],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-0

          pointer-events-none

          bg-[radial-gradient(circle_at_top,rgba(255,20,147,0.08),transparent_65%)]
        "
      />

      {/* Shared Ambient Grid */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.018]

          pointer-events-none

          bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]

          bg-[size:90px_90px]
        "
      />

      {/* Shared Scanlines */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.018]

          pointer-events-none

          bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.18)_50%)]

          bg-[length:100%_4px]
        "
      />

      {/* EDUCATION */}
      {variant === "education" && (
        <>
          {/* Main Orb */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.08, 0.14, 0.08],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              top-16
              left-[8%]

              h-[320px]
              w-[320px]

              rounded-full

              bg-pink-500/10

              blur-[160px]

              pointer-events-none
            "
          />

          {/* Vertical Neural Lines */}
          <div
            className="
              absolute
              inset-0

              opacity-[0.03]

              pointer-events-none

              bg-[linear-gradient(90deg,transparent_0%,rgba(236,72,153,0.08)_50%,transparent_100%)]

              bg-[size:240px_100%]
            "
          />

          {/* Floating Ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              top-24
              right-[12%]

              h-36
              w-36

              rounded-full

              border
              border-pink-500/10

              opacity-20

              blur-sm

              pointer-events-none
            "
          />

          {/* Education Ambient Glow */}
          <div
            className="
              absolute
              bottom-[-140px]
              left-1/2
              -translate-x-1/2

              h-[260px]
              w-[700px]

              rounded-full

              bg-pink-500/6

              blur-[160px]

              pointer-events-none
            "
          />
        </>
      )}

      {/* SKILLS */}
      {variant === "skills" && (
        <>
          {/* Cyan Atmosphere */}
          <motion.div
            animate={{
              opacity: [0.03, 0.06, 0.03],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-0

              pointer-events-none

              bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16)_0%,transparent_70%)]
            "
          />

          {/* Holographic Scan */}
          <motion.div
            animate={{
              backgroundPosition: [
                "0px 0px",
                "0px 120px",
              ],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-0

              opacity-[0.03]

              pointer-events-none

              bg-[linear-gradient(transparent_0%,rgba(34,211,238,0.08)_50%,transparent_100%)]

              bg-[size:100%_14px]
            "
          />

          {/* Cyan Orb */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.08, 0.13, 0.08],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-8
              right-[12%]

              h-[320px]
              w-[320px]

              rounded-full

              bg-cyan-500/10

              blur-[160px]

              pointer-events-none
            "
          />

          {/* Geometric Overlay */}
          <div
            className="
              absolute
              inset-0

              opacity-[0.018]

              pointer-events-none

              bg-[linear-gradient(45deg,rgba(34,211,238,0.12)_1px,transparent_1px)]

              bg-[size:70px_70px]
            "
          />

          {/* Neural Bottom Glow */}
          <div
            className="
              absolute
              bottom-[-160px]
              left-1/2
              -translate-x-1/2

              h-[280px]
              w-[900px]

              rounded-full

              bg-cyan-500/6

              blur-[180px]

              pointer-events-none
            "
          />
        </>
      )}

      {/* PROJECTS */}
      {variant === "projects" && (
        <>
          {/* Terminal Atmosphere */}
          <motion.div
            animate={{
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-0

              pointer-events-none

              bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.16)_0%,transparent_45%)]
            "
          />

          {/* Left Edge */}
          <motion.div
            animate={{
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-y-0
              left-0
              w-px

              bg-gradient-to-b
              from-transparent
              via-pink-500/30
              to-transparent

              pointer-events-none
            "
          />

          {/* Right Edge */}
          <motion.div
            animate={{
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 5,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-y-0
              right-0
              w-px

              bg-gradient-to-b
              from-transparent
              via-cyan-500/30
              to-transparent

              pointer-events-none
            "
          />

          {/* Bottom Glow */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.08, 0.13, 0.08],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-[-120px]
              left-1/2
              -translate-x-1/2

              h-[220px]
              w-[700px]

              rounded-full

              bg-pink-500/10

              blur-[160px]

              pointer-events-none
            "
          />

          {/* Code Texture */}
          <motion.div
            animate={{
              backgroundPosition: [
                "0px 0px",
                "0px 100px",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-0

              opacity-[0.02]

              pointer-events-none

              bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]

              bg-[size:100%_18px]
            "
          />
        </>
      )}

      {/* Shared Noise Texture */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.015]

          mix-blend-screen

          pointer-events-none

          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0idHVyYnVsZW5jZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]
        "
      />

      {/* Shared Vignette */}
      <div
        className="
          absolute
          inset-0

          pointer-events-none

          bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)]
        "
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </section>
  );
}