"use client";

import { useEffect, useState } from "react";

export function GlitchText({
  text,
}: {
  text: string;
}) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.88) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 120);
      }
    }, 2400);

    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-block">
      <span className={glitch ? "opacity-0" : "opacity-100"}>
        {text}
      </span>

      {glitch && (
        <>
          <span className="absolute inset-0 text-pink-500 translate-x-[2px]">
            {text}
          </span>

          <span className="absolute inset-0 text-cyan-400 -translate-x-[2px]">
            {text}
          </span>
        </>
      )}
    </span>
  );
}