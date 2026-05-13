"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";

import Lenis from "lenis";
import { MotionValue, useMotionValue } from "framer-motion";

// ─── Context ──────────────────────────────────────────────────────────────────

interface LenisContextValue {
  scrollY: MotionValue<number>;
  lenis: React.MutableRefObject<Lenis | null>;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenisScroll(): LenisContextValue {
  const ctx = useContext(LenisContext);
  if (!ctx)
    throw new Error(
      "useLenisScroll must be used inside <SmoothScrollProvider>"
    );
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const scrollY = useMotionValue(0);
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      smoothTouch: false, // native touch is already smooth
      touchMultiplier: 1.0,
      normalizeWheel: true, // critical for cross-device consistency
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync scroll value into Framer's MotionValue – zero lag
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      scrollY.set(scroll);
    });

    const tick = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lenis.destroy();
      lenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LenisContext.Provider value={{ scrollY, lenis: lenisRef }}>
      {children}
    </LenisContext.Provider>
  );
}