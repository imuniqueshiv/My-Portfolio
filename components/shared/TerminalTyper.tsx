"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { highlightCode } from "@/components/hero-terminal/SyntaxHighlighter";

interface TerminalTyperProps {
  code: string;
  language?: string;
  speed?: number;
  className?: string;
}

export function TerminalTyper({
  code,
  language = "bash",
  speed = 35,
  className = "",
}: TerminalTyperProps) {
  const [displayedCode, setDisplayedCode] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(true);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedCode("");
    setIsTyping(true);

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= code.length) {
        setDisplayedCode(
          code.slice(0, currentIndex)
        );

        currentIndex +=
          Math.floor(Math.random() * 2) + 1;

        // Auto-scroll
        if (containerRef.current) {
          containerRef.current.scrollTop =
            containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [code, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-y-auto scrollbar-hide ${className}`}
    >
      <pre className="whitespace-pre-wrap break-words font-mono">
        <code
          dangerouslySetInnerHTML={{
            __html: highlightCode(
              displayedCode,
              language
            ),
          }}
        />

        {/* Cursor */}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              ease: "linear",
            }}
            className="inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          />
        )}
      </pre>
    </div>
  );
}