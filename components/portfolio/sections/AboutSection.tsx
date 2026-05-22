"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { SectionBackground } from "@/components/ui/SectionBackground";
import { CERTS } from "../data/portfolioData";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionLabel } from "../shared/SectionLabel";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const viewportConfig = (amount = 0.3) => ({
  once: true,
  amount,
});

export function AboutSection() {
  const sectionRef = useRef(null);

  return (
    <SectionBackground variant="education" glowColor="pink">
      <section
        id="about"
        ref={sectionRef}
        className="relative z-10 bg-transparent"
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig(0.3)}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                variants={fadeUp}
              >
                <SectionLabel>About Me</SectionLabel>
                <SectionHeading>
                  Passionate about intelligent systems
                </SectionHeading>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig(0.3)}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                variants={fadeUp}
              >
                <p className="text-white/550 font-light leading-relaxed text-base mb-5 text-pretty">
                  I&apos;m a B.Tech student specializing in Artificial Intelligence &amp; Machine Learning at Sagar Institute of Research and Technology, Bhopal. I&apos;m passionate about building AI-driven and scalable web applications that solve real-world problems.
                </p>
                <p className="text-white/550 font-light leading-relaxed text-base text-pretty">
                  My expertise spans full-stack web development, modern JavaScript frameworks, and AI-powered systems. I enjoy combining intelligent automation with clean, user-friendly interfaces to create impactful digital products.
                </p>
              </motion.div>
            </div>

            {/* Right Terminal */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig(0.2)}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              variants={fadeUp}
              className="h-full"
            >
              <div className="relative flex flex-col rounded-xl overflow-hidden border border-white/10 bg-[#020203]/96 backdrop-blur-xl shadow-2xl h-full group transition-all duration-700 hover:border-pink-500/30 hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.2)]">
                {/* Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 border border-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 border border-green-500/50" />
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    knowledge_base.log
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 font-mono text-sm flex flex-col gap-4 relative z-10 h-full">
                  {/* Education */}
                  <div>
                    <p className="text-cyan-400 text-xs mb-3 flex items-center gap-2">
                      <span className="text-pink-500">root@hypercore:~#</span>
                      ./fetch --education
                    </p>

                    <div className="relative ml-2 space-y-4">
                      <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-pink-500/60 via-cyan-500/40 to-transparent shadow-[0_0_8px_rgba(236,72,153,0.5)]" />

                      <div className="relative pl-6 group/item transition-all duration-300 hover:translate-x-1">
                        <div className="absolute left-[0px] top-1.5 w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(236,72,153,1)] animate-pulse" />
                        <p className="text-white/90 font-medium text-sm mb-1 group-hover/item:text-pink-300 transition-colors">
                          B.Tech — Artificial Intelligence/ Machine Learning
                        </p>
                        <p className="text-white/50 text-xs">
                          Sagar Institute of Research and Technology, Bhopal
                        </p>
                        <p className="text-pink-400/80 text-[10px] mt-1 tracking-widest font-semibold uppercase">
                          [ STATUS: IN_PROGRESS | 2024 — Present ]
                        </p>
                      </div>

                      <div className="relative pl-6 group/item transition-all duration-300 hover:translate-x-1">
                        <div className="absolute left-[0px] top-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        <p className="text-white/90 font-medium text-sm mb-1 group-hover/item:text-cyan-300 transition-colors">
                          Higher Secondary (XII) — PCM
                        </p>
                        <p className="text-white/50 text-xs">
                          D.N. Jain Higher Secondary School, Jabalpur
                        </p>
                        <p className="text-green-400/80 text-[10px] mt-1 tracking-widest font-semibold uppercase">
                          [ STATUS: COMPLETED | 2021 ]
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="pt-1">
                    <p className="text-cyan-400 text-xs mb-3 flex items-center gap-2">
                      <span className="text-pink-500">root@hypercore:~#</span>
                      ./fetch --certifications
                    </p>

                    <div className="relative ml-2 space-y-2">
                      <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gradient-to-b from-green-500/40 to-transparent" />

                      {CERTS.map((cert) => (
                        <div
                          key={cert}
                          className="relative pl-6 flex items-start gap-1 text-white/70 text-xs group/cert transition-all duration-300 hover:translate-x-1 hover:text-white/90"
                        >
                          <span className="absolute left-[0px] top-0.5 text-green-400 text-[10px] drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]">
                            ✔
                          </span>
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SectionBackground>
  );
}