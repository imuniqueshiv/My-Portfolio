"use client";

import { GlobalAtmosphere } from "../ui/GlobalAtmosphere";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";

export function SinglePagePortfolio() {
  return (
    <div className="relative">
      {/* 
        ⚠️ `scroll-smooth` removed – Lenis already handles smooth scrolling.
        Leaving it could conflict and cause micro-stutters.
      */}

      <Navbar />

      <GlobalAtmosphere />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}