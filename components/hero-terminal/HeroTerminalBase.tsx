"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data Models ---
type ScriptTab = {
  id: string;
  title: string;
  language: string;
  code: string;
};

const terminalScripts: ScriptTab[] = [
  {
    id: "boot",
    title: "boot.sh",
    language: "bash",
    code: `> neural interface initialized...
> encrypted uplink synced...
> access granted.

$ node server.js
> localhost:3000 ONLINE
> USER_NOT_FOUND [404]
> rebooting shadow node...
> darknet tunnel established...
> root access granted.

┌──(root㉿hypercore)-[/system]
└─$ whoami
Shiv Raj Singh

┌──(root㉿hypercore)-[/system]
└─$ status
> AI Core: ONLINE
> Neural Engine: CONNECTED
> Protocol: ACTIVE`,
  },

  {
    id: "profile",
    title: "profile.ex",
    language: "elixir",
    code: `defmodule HyperCore.Profile do

  @identity %{
    name: "Shiv Raj Singh",
    role: "AI/ML Engineer",
    focus: [
      "AI Systems",
      "Full Stack",
      "Automation",
      "Scalable Infrastructure"
    ],
    philosophy: "Code Beyond Limits.",
    status: :building_future
  }

  def initialize do
    IO.puts("HyperCore Initialized")
  end

end`,
  },

  {
    id: "skills",
    title: "skills.fs",
    language: "fsharp",
    code: `module HyperSkills

let frontend =
  ["Next.js" "React" "Tailwind" "Framer Motion"]

let backend =
  ["Node.js" "Express" "Prisma" "REST APIs"]

let ai_ml =
  ["Python" "TensorFlow" "PyTorch" "LLMs"]

let database =
  ["PostgreSQL" "MongoDB" "Redis"]

printfn "Skills Engine Active..."`,
  },
];

// --- Syntax Highlighter Utility ---
const highlightCode = (code: string, language: string) => {
  if (!code) return "";

  let html = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (language === "bash") {
    html = html
      .replace(/(&gt;.*)/g, '<span class="text-pink-500/80">$1</span>')
      .replace(/(&gt; access granted\.)/g, '<span class="text-green-400 font-bold">$1</span>')
      .replace(/(&gt; Server running on: http:\/\/localhost:3000)/g, '<span class="text-green-400 font-bold">$1</span>')
      .replace(/(&gt; Warning: USER_NOT_FOUND \[404\])/g, '<span class="text-red-400 font-bold">$1</span>')
      .replace(/(&gt; restarting shadow instance\.\.\.)/g, '<span class="text-orange-400 font-bold">$1</span>')
      .replace(/(&gt; switching to underground linux network\.\.\.)/g, '<span class="text-zinc-500 italic">$1</span>')
      .replace(/(&gt; root access granted\.)/g, '<span class="text-green-400 font-bold">$1</span>')
      .replace(/(\$.*)/g, '<span class="text-cyan-400">$1</span>')
      .replace(/(Shiv Raj Singh)/g, '<span class="text-white font-extrabold tracking-wide">$1</span>')
      .replace(/\b(CONNECTED|ACTIVE|ENABLED|ONLINE)\b/g, '<span class="text-green-400 font-bold">$1</span>');
  } else {
    const strings: string[] = [];
    html = html.replace(/("(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g, (match) => {
      strings.push(match);
      return `__STR${strings.length - 1}__`;
    });

    html = html
      .replace(/\b(const|let|var|class|function|return|import|from|export|default|defmodule|def|module|type|printfn)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/([a-zA-Z0-9_]+)(?=:)/g, '<span class="text-cyan-400">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
      .replace(/([{}[\],;])/g, '<span class="text-white/40">$1</span>');

    html = html.replace(/__STR(\d+)__/g, (_, index) => {
      return `<span class="text-green-400">${strings[Number(index)]}</span>`;
    });
  }

  return html;
};

// --- Main Component ---
export function HeroTerminalBase() {
  const [activeTabId, setActiveTabId] = useState<string>(terminalScripts[0].id);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeTab = terminalScripts.find((t) => t.id === activeTabId) || terminalScripts[0];

  // Typing Effect – always finishes the full code
  useEffect(() => {
    setIsTyping(true);
    setDisplayedCode("");

    let currentIndex = 0;
    const fullCode = activeTab.code;
    const typingSpeed = activeTab.language === "bash" ? 45 : 55;

    const interval = setInterval(() => {
      if (currentIndex < fullCode.length) {
        currentIndex += Math.floor(Math.random() * 2) + 2;
        setDisplayedCode(fullCode.slice(0, Math.min(currentIndex, fullCode.length)));

        // auto-scroll to bottom while typing
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setDisplayedCode(fullCode);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [activeTabId, activeTab.code, activeTab.language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-5, 5, -5] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative w-full max-w-[650px] mx-auto perspective-1000"
    >
      {/* Background Glow Effects */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl opacity-50 z-0 rounded-xl" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/10 blur-[80px] z-0 rounded-full" />

      {/* Terminal Window */}
      <div className="relative z-10 w-full rounded-xl border border-white/10 bg-[#0a0a12]/80 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">

          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>

          {/* Tabs */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 max-w-[45%] sm:max-w-none overflow-hidden">
            {terminalScripts.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-1.5 sm:px-3 py-1 text-[8px] sm:text-xs font-mono rounded-md transition-all duration-300 relative truncate ${
                  activeTabId === tab.id
                    ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/20"
                    : "text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.title}

                {activeTabId === tab.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute -bottom-[1px] left-2 right-2 h-[1px] bg-cyan-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg
                className="w-4 h-4 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Code Content – scrollable, no visible scrollbar */}
        <div
          ref={containerRef}
          className="p-4 sm:p-6 h-[300px] sm:h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] font-mono text-xs sm:text-sm leading-relaxed relative"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 z-0 pointer-events-none mix-blend-screen" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <pre className="whitespace-pre-wrap break-words">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(displayedCode, activeTab.language),
                  }}
                />

                {/* Blinking cursor – disappears when typing finishes */}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "linear",
                    }}
                    className="inline-block w-2 h-4 sm:h-5 bg-cyan-400 ml-1 align-middle shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  />
                )}
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg
                className="w-3 h-3 text-cyan-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              {activeTab.language.toUpperCase()}
            </span>

            <span className="flex items-center gap-1">
              <svg
                className="w-3 h-3 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {isTyping ? "PROCESSING..." : "READY"}
            </span>
          </div>

          <span>UTF-8</span>
        </div>
      </div>
    </motion.div>
  );
}