"use client";

import dynamic from "next/dynamic";import { SinglePagePortfolio } from "@/components/portfolio/SinglePagePortfolio";

const Scene = dynamic(
  () => import("@/components/scene/Scene").then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-[#050510] z-0">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin" />
          <span className="text-pink-400/60 text-sm font-mono tracking-wider">
            INITIALIZING...
          </span>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <>
      {/* Fixed 3D scene — only visible in hero viewport */}
      <div className="fixed inset-0 z-0">
        <Scene />
        {/* Scanlines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
          }}
        />
        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(5,5,16,0.35) 65%, rgba(5,5,16,0.75) 100%)",
          }}
        />
      </div>

      {/* Scrollable content on top */}
      <SinglePagePortfolio />
    </>
  );
}
