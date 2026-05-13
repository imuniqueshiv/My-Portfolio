"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { highlightCode } from "./SyntaxHighlighter";

interface LiveCodeTyperProps {
  code: string;
  language: string;
  tabId: string;
  onTypingChange: (isTyping: boolean) => void;
}

export function LiveCodeTyper({
  code,
  language,
  tabId,
  onTypingChange,
}: LiveCodeTyperProps) {
  const [displayedCode, setDisplayedCode] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onTypingChange(true);
    setDisplayedCode("");

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    // Much slower cinematic typing speed
    const typingSpeed = language === "bash" ? 500 : 650;

    const typeCode = () => {
      if (currentIndex <= code.length) {
        setDisplayedCode(code.slice(0, currentIndex));

        // Type exactly one character
        currentIndex += 1;

        // Auto scroll vertically only
        if (containerRef.current) {
          containerRef.current.scrollTop =
            containerRef.current.scrollHeight;
        }

        timeoutId = setTimeout(typeCode, typingSpeed);
      } else {
        onTypingChange(false);
      }
    };

    typeCode();

    return () => clearTimeout(timeoutId);
  }, [tabId, code, language, onTypingChange]);

  return (
    <div
      ref={containerRef}
      className="
        relative
        p-4 sm:p-6
        min-h-[250px]
        sm:min-h-[350px]
        max-h-[400px]
        overflow-y-auto
        overflow-x-hidden
        font-mono
        text-xs
        sm:text-sm
        leading-relaxed
        custom-scrollbar
      "
    >
      {/* Subtle futuristic grid background */}
      <div
        className="
          absolute inset-0
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]
          opacity-40
          pointer-events-none
          z-0
          mix-blend-screen
        "
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={tabId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full overflow-hidden"
        >
          <pre
            className="
              whitespace-pre-wrap
              break-words
              overflow-x-hidden
              w-full
            "
          >
            <code
              className="block w-full"
              dangerouslySetInnerHTML={{
                __html: highlightCode(displayedCode, language),
              }}
            />

            {/* Blinking Terminal Cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: "linear",
              }}
              className="
                inline-block
                w-2
                h-4
                sm:h-5
                bg-cyan-400
                ml-1
                align-middle
                shadow-[0_0_10px_rgba(34,211,238,0.9)]
              "
            />
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}