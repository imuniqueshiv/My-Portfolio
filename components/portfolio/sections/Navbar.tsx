"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_LINKS } from "../data/portfolioData";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);

    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#050510]/80 backdrop-blur-xl border-b border-white/5 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded border border-pink-500/50 flex items-center justify-center bg-pink-500/10">
            <span className="text-pink-400 font-bold text-xs">
              SR
            </span>
          </div>

          <span className="text-white/70 text-sm hidden sm:block">
            SHIV RAJ SINGH
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm text-white/50 hover:text-pink-400 transition-colors"
            >
              {link.label.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white/60"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#050510]/95 px-6 py-6 flex flex-col gap-6"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm text-white/60 hover:text-pink-400 text-left"
            >
              {link.label.toUpperCase()}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}