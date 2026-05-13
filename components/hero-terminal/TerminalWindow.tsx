"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export type ScriptTab = {
  id: string;
  title: string;
  language: string;
  code: string;
};

interface TerminalWindowProps {
  tabs: ScriptTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  copied: boolean;
  onCopy: () => void;
  isTyping: boolean;
  children: ReactNode;
}

export function TerminalWindow({
  tabs,
  activeTabId,
  onTabChange,
  copied,
  onCopy,
  isTyping,
  children,
}: TerminalWindowProps) {
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div
      className="
        relative z-10 w-full

        h-[420px] sm:h-[460px] lg:h-[520px]
        min-h-[420px] max-h-[420px]
        sm:min-h-[460px] sm:max-h-[460px]
        lg:min-h-[520px] lg:max-h-[520px]

        rounded-xl border border-white/10
        bg-[#0a0a12]/80 backdrop-blur-2xl shadow-2xl
        overflow-hidden flex flex-col
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5 shrink-0">
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 absolute left-1/2 -translate-x-1/2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-mono rounded-md transition-all duration-300 relative whitespace-nowrap ${
                activeTabId === tab.id
                  ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/20"
                  : "text-white/40 hover:text-white/80 border border-transparent"
              }`}
            >
              {tab.title}
              {activeTabId === tab.id && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute -bottom-[1px] left-2 right-2 h-[1px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Copy */}
        <button
          onClick={onCopy}
          className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs shrink-0"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>

      {/* Scrollable Content — hidden scrollbar */}
      <div
        className="
          flex-1 min-h-0
          overflow-y-auto overflow-x-hidden

          /* Hide scrollbar for Chrome, Safari, Edge, Brave */
          [&::-webkit-scrollbar]:hidden

          /* Hide scrollbar for Firefox */
          [scrollbar-width:none]
        "
      >
        {children}
      </div>

      {/* Footer */}
      <div className="px-4 py-1.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-mono shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            {activeTab.language.toUpperCase()}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {isTyping ? "PROCESSING..." : "READY"}
          </span>
        </div>
        <span>UTF-8</span>
      </div>
    </div>
  );
}