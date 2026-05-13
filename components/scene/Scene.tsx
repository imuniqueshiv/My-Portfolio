"use client";

import {
  Suspense,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { motion, useReducedMotion, useTransform } from "framer-motion";

import { HologramFigure } from "./Hologram";
import { Particles, HologramParticles } from "./Particles";
import { CyberpunkEnvironment } from "./Environment";
import { CameraController } from "./CameraController";
import { PostProcessingEffects } from "./PostProcessing";
import { useLenisScroll } from "@/components/providers/SmoothScrollProvider";

// ─── Module‑level constants (stable references — Canvas never re‑inits) ──────

const SCROLL_MAX = 2800;

const GL_OPTIONS = {
  antialias: false,
  alpha: true,
  powerPreference: "high-performance" as const,
  stencil: false,
  depth: false,
} as const;

const CAMERA_OPTIONS = {
  position: [0, 1, 8] as [number, number, number],
  fov: 58,
  near: 0.1,
  far: 1000,
} as const;

// ─── SceneContent — memoised, never re‑renders from scroll ────────────────────

interface SceneContentProps {
  mousePosition: { x: number; y: number };
}

const SceneContent = memo(function SceneContent({
  mousePosition,
}: SceneContentProps) {
  return (
    <>
      <CameraController mousePosition={mousePosition} />

      <ambientLight intensity={0.12} color="#160b22" />
      <directionalLight position={[5, 5, 5]} intensity={0.32} color="#ff1493" />
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.18}
        color="#00bfff"
      />

      <CyberpunkEnvironment />
      <HologramFigure mousePosition={mousePosition} />

      <Particles count={180} color="#ff69b4" size={0.013} spread={18} />
      <Particles count={120} color="#00bfff" size={0.009} spread={22} />
      <HologramParticles />

      <PostProcessingEffects quality="low" />
      <Preload all />
    </>
  );
});

const LoadingFallback = memo(function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ff1493" wireframe />
    </mesh>
  );
});

// ─── Scene ────────────────────────────────────────────────────────────────────

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // ── Mobile detection ──────────────────────────────────────────────────────

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handle = (e: MediaQueryList | MediaQueryListEvent) =>
      setIsMobile(e.matches);
    handle(mq);
    mq.addEventListener("change", handle as EventListener);
    return () => mq.removeEventListener("change", handle as EventListener);
  }, []);

  // ── Scroll – direct MotionValue read (no extra spring) ────────────────────

  const { scrollY } = useLenisScroll();

  const opacity = useTransform(
    scrollY,
    [0, 900, 1700, SCROLL_MAX],
    [1, 1, 0.7, 0.24]
  );
  const scale = useTransform(scrollY, [0, SCROLL_MAX], [1, 0.982]);
  const yCanvas = useTransform(scrollY, [0, SCROLL_MAX], [0, 70]);

  const atmosY = useTransform(scrollY, [0, SCROLL_MAX], [0, -80]);
  const glowScale = useTransform(scrollY, [0, SCROLL_MAX], [1, 1.15]);
  const cyanOpacity = useTransform(scrollY, [0, SCROLL_MAX], [0.08, 0]);

  // ── Mouse tracking – RAF‑throttled ────────────────────────────────────────

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || prefersReducedMotion) return;
      if (rafRef.current !== null) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const cx = e.clientX;
      const cy = e.clientY;

      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({
          x: ((cx - rect.left) / rect.width) * 2 - 1,
          y: -(((cy - rect.top) / rect.height) * 2 - 1),
        });
        rafRef.current = null;
      });
    },
    [isMobile, prefersReducedMotion]
  );

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  // ── DPR – capped for Retina performance ───────────────────────────────────

  const dpr = useMemo<number | [number, number]>(
    () => (isMobile ? 1 : [1, Math.min(window.devicePixelRatio ?? 2, 1.5)]),
    [isMobile]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/*
        Atmosphere layer – fully static except cyan opacity.
        No blur elements animate transform/scale → zero repaints.
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-50 overflow-hidden pointer-events-none"
      >
        {/* Pink bloom – static, GPU‑promoted via translateZ(0) */}
        <div
          className="absolute bottom-[-260px] left-1/2 -translate-x-1/2
                     w-[1500px] h-[760px] rounded-full
                     bg-pink-500/[0.16] blur-[160px]"
          style={{ transform: "translateX(-50%) translateZ(0)" }}
        />

        {/* Red accent – static */}
        <div
          className="absolute top-[12%] right-[6%]
                     w-[620px] h-[620px] rounded-full
                     bg-red-500/[0.08] blur-[140px]"
          style={{ transform: "translateZ(0)" }}
        />

        {/* Cyan accent – opacity only, compositor‑only animation */}
        <motion.div
          style={{ opacity: cyanOpacity }}
          className="absolute bottom-[8%] left-[4%]
                     w-[480px] h-[480px] rounded-full
                     bg-cyan-500/[0.08] blur-[120px]"
        />
      </div>

      {/*
        Canvas wrapper – GPU‑composited transforms only.
        No CSS filter, `contain: strict` blocks layout recalculations.
      */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none
                   transform-gpu will-change-transform"
        style={
          {
            opacity,
            scale,
            y: yCanvas,
            contain: "strict",
          } as React.CSSProperties
        }
      >
        {/* Static vignette gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top,    rgba(255,20,147,0.08) 0%, transparent 70%)," +
              "radial-gradient(circle at bottom, rgba(0,191,255,0.04)  0%, transparent 65%)",
          }}
        />

        <Canvas
          frameloop="always"
          dpr={dpr}
          performance={{ min: 0.5, max: 1 }}
          camera={CAMERA_OPTIONS}
          gl={GL_OPTIONS}
        >
          <color attach="background" args={["#050510"]} />
          <fog attach="fog" args={["#06060d", 10, 58]} />

          <Suspense fallback={<LoadingFallback />}>
            <SceneContent mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </motion.div>
    </>
  );
}