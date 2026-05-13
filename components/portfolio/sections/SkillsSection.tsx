"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionBackground } from "@/components/ui/SectionBackground";
import { SKILLS } from "../data/portfolioData";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionLabel } from "../shared/SectionLabel";

const skillColors: Record<string, string> = {
  Python: "border-yellow-500/20 bg-yellow-500/[0.06] text-yellow-200 hover:border-yellow-400/40",
  JavaScript: "border-yellow-400/20 bg-yellow-400/[0.06] text-yellow-100 hover:border-yellow-300/40",
  TypeScript: "border-blue-500/20 bg-blue-500/[0.06] text-blue-200 hover:border-blue-400/40",
  "React.js": "border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-200 hover:border-cyan-400/40",
  "Next.js": "border-white/10 bg-white/[0.04] text-white/90 hover:border-white/30",
  Tailwind: "border-sky-500/20 bg-sky-500/[0.06] text-sky-200 hover:border-sky-400/40",
  HTML5: "border-orange-500/20 bg-orange-500/[0.06] text-orange-200 hover:border-orange-400/40",
  CSS3: "border-blue-400/20 bg-blue-400/[0.06] text-blue-200 hover:border-blue-300/40",
  "Node.js": "border-green-500/20 bg-green-500/[0.06] text-green-200 hover:border-green-400/40",
  Express: "border-neutral-400/20 bg-neutral-400/[0.05] text-neutral-200 hover:border-neutral-300/40",
  FastAPI: "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-200 hover:border-emerald-400/40",
  MongoDB: "border-green-600/20 bg-green-600/[0.06] text-green-200 hover:border-green-500/40",
  Git: "border-orange-600/20 bg-orange-600/[0.06] text-orange-200 hover:border-orange-500/40",
  GitHub: "border-white/10 bg-white/[0.04] text-white/90 hover:border-white/30",
  Vercel: "border-white/10 bg-white/[0.04] text-white/90 hover:border-white/30",
  Streamlit: "border-red-500/20 bg-red-500/[0.06] text-red-200 hover:border-red-400/40",
  TensorFlow: "border-orange-500/20 bg-orange-500/[0.06] text-orange-200 hover:border-orange-400/40",
  OpenCV: "border-purple-500/20 bg-purple-500/[0.06] text-purple-200 hover:border-purple-400/40",
  NLP: "border-pink-500/20 bg-pink-500/[0.06] text-pink-200 hover:border-pink-400/40",
  "LLM Integration": "border-fuchsia-500/20 bg-fuchsia-500/[0.06] text-fuchsia-200 hover:border-fuchsia-400/40",
  "AI Automation": "border-rose-500/20 bg-rose-500/[0.06] text-rose-200 hover:border-rose-400/40",
  TypeScript:
  "border-blue-500/20 bg-blue-500/[0.06] text-blue-200 hover:border-blue-400/40",

"Socket.io":
  "border-neutral-400/20 bg-neutral-400/[0.05] text-neutral-200 hover:border-neutral-300/40",

JWT:
  "border-purple-500/20 bg-purple-500/[0.06] text-purple-200 hover:border-purple-400/40",

PostgreSQL:
  "border-sky-500/20 bg-sky-500/[0.06] text-sky-200 hover:border-sky-400/40",

Prisma:
  "border-indigo-500/20 bg-indigo-500/[0.06] text-indigo-200 hover:border-indigo-400/40",

Redis:
  "border-red-500/20 bg-red-500/[0.06] text-red-200 hover:border-red-400/40",

Render:
  "border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-200 hover:border-cyan-400/40",

Postman:
  "border-orange-500/20 bg-orange-500/[0.06] text-orange-200 hover:border-orange-400/40",

GSAP:
  "border-lime-500/20 bg-lime-500/[0.06] text-lime-200 hover:border-lime-400/40",

Anaconda:
  "border-green-500/20 bg-green-500/[0.06] text-green-200 hover:border-green-400/40",

Ollama:
  "border-neutral-500/20 bg-neutral-500/[0.06] text-neutral-200 hover:border-neutral-400/40",

NumPy:
  "border-blue-400/20 bg-blue-400/[0.06] text-blue-200 hover:border-blue-300/40",

Pandas:
  "border-indigo-500/20 bg-indigo-500/[0.06] text-indigo-200 hover:border-indigo-400/40",

"Scikit-learn":
  "border-orange-400/20 bg-orange-400/[0.06] text-orange-200 hover:border-orange-300/40",

Selenium:
  "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-200 hover:border-emerald-400/40",
};

const runtimeMessages: Record<string, string> = {
  "Programming Languages": "Compiling core language modules...",
  Frontend: "Initializing UI systems...",
  Backend: "Booting server infrastructure...",
  Databases: "Connecting distributed data layer...",
  Tools: "Loading development environment...",
  "AI / ML": "Loading neural inference stack...",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export function SkillsSection() {
  return (
    <SectionBackground variant="skills" glowColor="cyan">
      <section id="skills" className="relative z-10 bg-transparent">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/10 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SectionLabel>Expertise</SectionLabel>
            <SectionHeading>Skills &amp; Technologies</SectionHeading>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(SKILLS).map(([category, items], i) => (
              <motion.div
                key={category}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={cardVariants}
                className="h-full"
              >
                <div className="relative flex flex-col h-full rounded-xl overflow-hidden border border-white/10 bg-[#030304]/95 backdrop-blur-xl transition-all duration-500 group hover:-translate-y-1 hover:border-pink-500/30 hover:shadow-[0_0_35px_-12px_rgba(236,72,153,0.18)]">
                  {/* Scanline */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.12)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-700" />

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.06),transparent_65%)]" />

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-gradient-to-r from-[#140a12] via-[#1a0d18] to-[#120811]">
                    <div className="flex items-center gap-2">
                      <div className="relative w-5 h-5 rounded overflow-hidden">
                        <Image
                          src="/Powershell.svg"
                          alt="PowerShell"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                          PowerShell
                        </span>
                        <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400/50 tracking-wide">
                          <span className="w-1 h-1 rounded-full bg-emerald-400/70 animate-pulse" />
                        </span>
                      </div>
                    </div>
                    <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase truncate">
                      {`\\skills\\${category
                        .toLowerCase()
                        .replace(/\s+/g, "_")}`}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-5 flex-1 flex flex-col">
                    <h3 className="text-white font-mono text-base mb-1 flex items-center gap-2 group-hover:text-pink-300 transition-colors duration-500">
                      <span className="text-pink-500 font-bold">❯</span>
                      <span>{category}</span>
                    </h3>

                    <p className="font-mono text-[10px] tracking-wide text-white/25 mb-4 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-pink-400/50 animate-pulse" />
                      {runtimeMessages[category]}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <div
                          key={skill}
                          className={`group/tag relative overflow-hidden rounded-md border px-2.5 py-1 transition-all duration-300 ${
                            skillColors[skill] ||
                            "border-white/10 bg-white/[0.03] text-white/70 hover:border-pink-500/30"
                          }`}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
                          <span className="relative z-10 text-[10px] font-mono tracking-wide">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionBackground>
  );
}