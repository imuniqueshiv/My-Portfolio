"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { smoothEasing } from "../data/portfolioData";
import { sendEmail } from "@/app/actions/sendEmail";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      await sendEmail(fields);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: smoothEasing }}
        className="rounded-[18px] overflow-hidden border border-green-500/15 bg-[#010101]/98 shadow-[0_0_40px_-18px_rgba(74,222,128,0.18)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="text-[9px] uppercase tracking-[0.25em] font-mono text-green-400/40">
            transmission_success
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="text-green-400 font-mono text-sm">
              root@shiv:~$
            </span>
            <div>
              <p className="text-green-300 text-sm font-mono">
                Message transmitted successfully.
              </p>
              <p className="text-white/30 text-xs mt-1 font-mono">
                secure_channel_established
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setFields({ name: "", email: "", message: "" });
            }}
            className="mt-4 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70 hover:text-cyan-300 transition-colors font-mono cursor-pointer"
          >
            restart transmission
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[18px] overflow-hidden border border-white/8 bg-[#010101]/98 backdrop-blur-2xl shadow-[0_0_50px_-20px_rgba(236,72,153,0.18)]"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6 opacity-95 transition-all duration-300 hover:scale-105 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)] contrast-125 brightness-125">
            <Image
              src="/Kalilinux.svg"
              alt="Kali Linux"
              fill
              className="object-contain scale-[1.08]"
              priority
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/55 font-mono">
            root access
          </span>
        </div>
        <div className="text-[9px] uppercase tracking-[0.28em] font-mono text-green-400/35">
          kali_secure_terminal
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-pink-400 text-xs font-mono">root@shiv</span>
          <span className="text-white/25 text-xs font-mono">:</span>
          <span className="text-cyan-400 text-xs font-mono">~/contact</span>
          <span className="text-white/40 text-xs font-mono">$</span>
          <span className="text-green-400/80 text-xs font-mono">
            establish_connection
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono">
            ⚡ {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.22em] text-white/30 font-mono">
                Name
              </label>
              <input
                type="text"
                required
                value={fields.name}
                onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
                placeholder="your_name"
                className="w-full h-10 rounded-xl border border-white/6 bg-white/5 px-4 text-sm text-green-300 placeholder:text-white/18 outline-none transition-all duration-300 font-mono focus:border-pink-500/30 focus:bg-white/8 focus:shadow-[0_0_30px_-14px_rgba(236,72,153,0.4)]"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.22em] text-white/30 font-mono">
                Email
              </label>
              <input
                type="email"
                required
                value={fields.email}
                onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
                placeholder="root@domain.com"
                className="w-full h-10 rounded-xl border border-white/6 bg-white/5 px-4 text-sm text-cyan-300 placeholder:text-white/18 outline-none transition-all duration-300 font-mono focus:border-cyan-500/30 focus:bg-white/8 focus:shadow-[0_0_30px_-14px_rgba(34,211,238,0.35)]"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.22em] text-white/30 font-mono">
              Message
            </label>
            <textarea
              rows={4}
              required
              value={fields.message}
              onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
              placeholder="Transmit encrypted message..."
              className="w-full rounded-xl border border-white/6 bg-white/5 px-4 py-2.5 text-sm leading-relaxed text-green-300 placeholder:text-white/18 outline-none resize-none transition-all duration-300 font-mono focus:border-pink-500/30 focus:bg-white/8 focus:shadow-[0_0_30px_-14px_rgba(236,72,153,0.4)]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className={`group relative h-10 rounded-xl overflow-hidden border border-pink-500/50 bg-pink-500/10 font-mono text-[11px] uppercase tracking-[0.28em] text-pink-300 transition-all duration-500 ${
              sending
                ? "opacity-70 cursor-not-allowed"
                : "hover:border-pink-400 hover:bg-pink-500/20 hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)] active:scale-[0.985]"
            }`}
          >
            <span className="relative z-10">
              {sending ? "transmitting..." : "initiate transmission"}
            </span>
            {!sending && (
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}