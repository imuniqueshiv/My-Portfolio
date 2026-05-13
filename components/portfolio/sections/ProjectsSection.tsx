"use client";

import { motion } from "framer-motion";

import { SectionBackground } from "@/components/ui/SectionBackground";
import { PROJECTS } from "../data/portfolioData";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionLabel } from "../shared/SectionLabel";

const techColors: Record<string, string> = {
  Python: "border-yellow-500/20 bg-yellow-500/[0.06] text-yellow-200",
  JavaScript: "border-yellow-400/20 bg-yellow-400/[0.06] text-yellow-100",
  TypeScript: "border-blue-500/20 bg-blue-500/[0.06] text-blue-200",
  "React.js": "border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-200",
  "Next.js": "border-white/10 bg-white/[0.04] text-white/90",
  Tailwind: "border-sky-500/20 bg-sky-500/[0.06] text-sky-200",
  HTML: "border-orange-500/20 bg-orange-500/[0.06] text-orange-200",
  CSS: "border-blue-400/20 bg-blue-400/[0.06] text-blue-200",
  "Node.js": "border-green-500/20 bg-green-500/[0.06] text-green-200",
  Express: "border-neutral-400/20 bg-neutral-400/[0.05] text-neutral-200",
  MongoDB: "border-green-600/20 bg-green-600/[0.06] text-green-200",
  FastAPI: "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-200",
  NLP: "border-pink-500/20 bg-pink-500/[0.06] text-pink-200",
  LLMs: "border-fuchsia-500/20 bg-fuchsia-500/[0.06] text-fuchsia-200",
  "JWT Auth": "border-rose-500/20 bg-rose-500/[0.06] text-rose-200",
};

const runtimeMessages = [
  "Initializing deployment container...",
  "Syncing AI runtime modules...",
  "Monitoring active infrastructure...",
  "Loading production environment...",
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const runtimeMessage =
    runtimeMessages[project.name.length % runtimeMessages.length];

  return (
    <div className="relative flex flex-col h-full rounded-xl overflow-hidden border border-pink-500/20 bg-[#09090f]/90 backdrop-blur-xl transition-all duration-500 group hover:-translate-y-1 hover:border-pink-400/40 shadow-[0_0_25px_-12px_rgba(236,72,153,0.22)] hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.35)]">
      {/* Ambient Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.08),transparent_60%)]" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02] relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          <span className="w-1 h-1 rounded-full bg-pink-400 animate-pulse" />
          Active
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="flex items-center gap-2 text-[17px] font-mono text-white mb-1.5 group-hover:text-pink-300 transition-colors duration-300 leading-tight">
          <span className="text-pink-500">~/</span>
          {project.name}
        </h3>

        <p className="flex items-center gap-1.5 text-[9px] font-mono tracking-wide text-white/25 mb-3 uppercase">
          <span className="w-1 h-1 rounded-full bg-pink-400/70 animate-pulse" />
          {runtimeMessage}
        </p>

        <p className="text-[14px] leading-relaxed text-white/85 group-hover:text-white/550 transition-colors duration-300 mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-[5px] rounded-md border text-[9px] font-mono transition-all duration-300 ${
                techColors[tech] ||
                "border-white/10 bg-white/[0.03] text-white/70"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto">
  {project.githubUrl && (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-1 px-3 py-2 rounded-md overflow-hidden border border-pink-500/50 bg-pink-500/10 text-pink-300 text-[10px] font-mono text-center tracking-wide transition-all duration-500 hover:border-pink-400 hover:bg-pink-500/20 hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)]"
    >
      <span className="relative z-10">Git Repo</span>
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
    </a>
  )}
  {project.liveUrl && (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-1 px-3 py-2 rounded-md overflow-hidden border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 text-[10px] font-mono text-center tracking-wide transition-all duration-500 hover:border-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]"
    >
      <span className="relative z-10">Live Demo</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
    </a>
  )}
</div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <SectionBackground variant="projects" glowColor="purple">
      <section id="projects" className="relative z-10 bg-transparent">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <SectionLabel>Selected Work</SectionLabel>
            <SectionHeading>Projects</SectionHeading>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={cardVariants}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionBackground>
  );
}