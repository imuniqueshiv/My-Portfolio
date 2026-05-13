"use client";

import { useEffect, useRef, useState } from "react";

interface InlineTyperProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  start?: boolean;
}

export function InlineTyper({
  text,
  speed = 12,
  delay = 0,
  className = "",
  cursor = false,
  start = false,
}: InlineTyperProps) {
  const [displayedText, setDisplayedText] =
    useState("");

  const frameRef = useRef<number | null>(null);

  const lastUpdateRef = useRef(0);

  const currentIndexRef = useRef(0);

  useEffect(() => {
    // IMPORTANT
    // Do not start until section is visible
    if (!start) return;

    setDisplayedText("");

    currentIndexRef.current = 0;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp + delay;
      }

      if (timestamp < startTime) {
        frameRef.current =
          requestAnimationFrame(animate);

        return;
      }

      if (
        timestamp - lastUpdateRef.current >= speed
      ) {
        currentIndexRef.current += 1;

        setDisplayedText(
          text.slice(
            0,
            currentIndexRef.current
          )
        );

        lastUpdateRef.current = timestamp;
      }

      if (
        currentIndexRef.current < text.length
      ) {
        frameRef.current =
          requestAnimationFrame(animate);
      }
    };

    frameRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, speed, delay, start]);

  return (
    <span className={className}>
      {displayedText}

      {cursor &&
        displayedText.length < text.length && (
          <span className="animate-pulse text-cyan-400 ml-[1px]">
            |
          </span>
        )}
    </span>
  );
}