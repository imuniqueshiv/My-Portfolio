"use client";

import { motion } from "framer-motion";

import { HeroTerminalBase } from "@/components/hero-terminal/HeroTerminalBase";
import { GlitchText } from "../shared/GlitchText";
import { useLenisScroll } from "@/components/providers/SmoothScrollProvider";

// Optimized cubic‑bezier – no layout jank, GPU‑only transforms
const smoothEasing = [0.25, 0.1, 0.25, 1] as const;

export function HeroSection() {
  const { lenis } = useLenisScroll();

  // Lenis‑native smooth scroll to sections – zero conflict with our provider
  const scrollTo = (id: string) => {
    lenis.current?.scrollTo(id, {
      offset: 0,
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
    });
  };

  return (
    <section
      className="relative z-10 min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      <div className="max-w-6xl mx-auto w-full px-6 sm:px-10 pt-24 pb-16 flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 max-w-xl z-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: smoothEasing }}
            className="font-mono text-xs sm:text-sm tracking-[0.3em] text-pink-400/80 uppercase mb-5"
          >
            AI/ML Student &amp; Full Stack Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: smoothEasing }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white leading-none mb-6 text-balance"
          >
            <GlitchText text="Hi, I'm" />
            <br />
            <span className="text-pink-400">Shiv Raj</span>
            <br />
            <GlitchText text="Singh." />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: smoothEasing }}
            className="text-white/500 text-base font-light leading-relaxed mb-8 max-w-sm text-pretty"
          >
            Building AI-driven and scalable web applications that solve
            real-world problems. Intelligent automation meets clean interfaces.
          </motion.p>

          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.8, ease: smoothEasing }}
  className="flex flex-wrap gap-3 mt-10"
>
  {/* VIEW PROJECTS – pink/red (unchanged) */}
  <button
    onClick={() => scrollTo("#projects")}
    className="group relative px-7 py-3 overflow-hidden rounded border border-pink-500/50 bg-pink-500/10 backdrop-blur-sm transition-all duration-500 hover:border-pink-400 hover:bg-pink-500/20 hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)]"
  >
    <span className="relative z-10 text-pink-300 font-light tracking-widest text-sm">
      VIEW PROJECTS
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
  </button>

  {/* CONTACT – blue+green (teal) */}
  <button
    onClick={() => scrollTo("#contact")}
    className="group relative px-7 py-3 overflow-hidden rounded border border-teal-500/50 bg-teal-500/10 backdrop-blur-sm transition-all duration-500 hover:border-teal-400 hover:bg-teal-500/20 hover:shadow-[0_0_20px_-5px_rgba(45,212,191,0.3)]"
  >
    <span className="relative z-10 text-teal-300 font-light tracking-widest text-sm">
      CONTACT
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
  </button>
</motion.div>
        </div>

        {/* Right Side: OS Terminal */}
        <div className="w-full lg:absolute lg:right-[2%] xl:right-[4%] lg:w-[600px] h-full min-h-[400px] relative pointer-events-auto z-20 flex items-center justify-center lg:items-center lg:justify-end lg:translate-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1.2, ease: smoothEasing }}
            className="w-full max-w-[600px] relative"
          >
            <HeroTerminalBase />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue – pure composited animation, zero repaints */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: smoothEasing }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-white/25 text-xs tracking-[0.2em] uppercase font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </section>
  );
}