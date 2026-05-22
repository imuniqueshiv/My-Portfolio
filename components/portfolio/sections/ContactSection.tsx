"use client";

import { FadeIn } from "../shared/FadeIn";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionLabel } from "../shared/SectionLabel";
import { ContactForm } from "../forms/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 bg-transparent"
    >

      {/* Top Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-14">

        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1fr] gap-8 lg:gap-10 items-start">

          {/* LEFT SIDE */}
          <div>

            <FadeIn>

              <SectionLabel>
                Get In Touch
              </SectionLabel>

              <SectionHeading>
                {"Let's work together"}
              </SectionHeading>

            </FadeIn>

            <FadeIn delay={0.08}>

              {/* Description */}
              <p
                className="
                  text-white/85
                  text-[13px]
                  leading-relaxed
                  max-w-sm
                  mb-5
                "
              >
                Open to internships, AI collaborations,
                freelance work, and futuristic digital
                products.
              </p>

              {/* Info Cards */}
              <div className="space-y-3">

                {/* Email */}
                <div
                  className="
                    flex
                    items-center
                    gap-3

                    rounded-xl

                    border
                    border-white/6

                    bg-[#020203]/70

                    px-4
                    py-2.5

                    backdrop-blur-md

                    transition-all
                    duration-300

                    hover:border-pink-500/20
                    hover:bg-pink-500/[0.03]
                  "
                >

                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.22em]

                      font-mono
                      text-pink-300/70

                      shrink-0
                    "
                  >
                    Email
                  </span>

                  <a
                    href="mailto:singhshivraj89969@gmail.com"
                    className="
                      text-[13px]
                      text-white/72

                      hover:text-pink-300

                      transition-colors
                      truncate
                    "
                  >
                    singhshivraj89969@gmail.com
                  </a>

                </div>

                {/* Location */}
                <div
                  className="
                  cursor-pointer
                    flex
                    items-center
                    gap-3

                    rounded-xl

                    border
                    border-white/6

                    bg-[#020203]/70

                    px-4
                    py-2.5

                    backdrop-blur-md

                    transition-all
                    duration-300

                    hover:border-cyan-500/20
                    hover:bg-cyan-500/[0.03]
                  "
                >

                <a 
                  href="https://www.google.com/maps/place/Bhopal,+Madhya+Pradesh/@23.1990663,77.0762346,10z/data=!3m1!4b1!4m6!3m5!1s0x397c428f8fd68fbd:0x2155716d572d4f8!8m2!3d23.2599333!4d77.412615!16zL20vMGN3NTE?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      font-mono
                      text-cyan-300/70
                      shrink-0
                    "
                  >
                    Location
                  </span>

                  <span className="text-[13px] text-white/72 underline decoration-cyan-300/30 underline-offset-4">
                    Bhopal, India
                  </span>
                </a>

                </div>

                {/* Status */}
                <div
                  className="
                    flex
                    items-center
                    gap-3

                    rounded-xl

                    border
                    border-white/6

                    bg-[#020203]/70

                    px-4
                    py-2.5

                    backdrop-blur-md

                    transition-all
                    duration-300

                    hover:border-green-500/20
                    hover:bg-green-500/[0.03]
                  "
                >

                  <span
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.22em]

                      font-mono
                      text-green-300/70

                      shrink-0
                    "
                  >
                    Status
                  </span>

                  <span className="flex items-center gap-2 text-[13px] text-white/72">

                    <span
                      className="
                        w-1.5
                        h-1.5

                        rounded-full

                        bg-green-400

                        animate-pulse

                        shadow-[0_0_10px_rgba(74,222,128,0.8)]
                      "
                    />

                    Available for opportunities

                  </span>

                </div>

              </div>

             {/* Social Buttons */}
<div className="flex items-center gap-3 mt-5">
  {/* GitHub – pink sweep */}
  <a
    href="https://github.com/imuniqueshiv"
    target="_blank"
    rel="noopener noreferrer"
    className="
      group relative px-4 h-9 inline-flex items-center justify-center
      rounded-xl overflow-hidden
      border border-pink-500/50 bg-pink-500/10
      font-mono text-[10px] uppercase tracking-[0.24em] text-pink-300
      transition-all duration-500
      hover:border-pink-400 hover:bg-pink-500/20
      hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)]
    "
  >
    <span className="relative z-10">GitHub</span>
    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
  </a>

  {/* LinkedIn – cyan sweep */}
  <a
    href="https://www.linkedin.com/in/shiv-raj-singh-387973299/"
    target="_blank"
    rel="noopener noreferrer"
    className="
      group relative px-4 h-9 inline-flex items-center justify-center
      rounded-xl overflow-hidden
      border border-cyan-500/50 bg-cyan-500/10
      font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300
      transition-all duration-500
      hover:border-cyan-400 hover:bg-cyan-500/20
      hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]
    "
  >
    <span className="relative z-10">LinkedIn</span>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
  </a>
</div>

            </FadeIn>

          </div>

          {/* RIGHT SIDE */}
          <FadeIn delay={0.12}>

            <div className="relative">

              {/* Ambient Glow */}
              <div
                className="
                  absolute
                  inset-0

                  opacity-35
                  pointer-events-none

                  bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.10),transparent_72%)]
                "
              />

              <div className="relative z-10">
                <ContactForm />
              </div>

            </div>

          </FadeIn>

        </div>

      </div>

      {/* Footer */}
<footer className="border-t border-white/[0.06] bg-black">

  <div
    className="
      max-w-6xl
      mx-auto

      px-5
      sm:px-8

      py-5

      flex
      flex-col
      sm:flex-row

      items-center
      justify-between

      gap-3
    "
  >

    <p
      className="
        cursor-pointer
        text-white/45
        hover:text-red-400
        text-[11px]

        font-mono

        tracking-[0.16em]
        uppercase
      "
    >
      © {new Date().getFullYear()} Shiv Raj Singh
    </p>

    <div className="flex items-center gap-2.5">

      <span
        className="
          w-1.5
          h-1.5

          rounded-full

          bg-emerald-400

          shadow-[0_0_10px_rgba(74,222,128,0.9)]
        "
      />

      <span
        className="
          cursor-pointer
          text-white/45
          hover:text-green-500
          text-[10px]

          uppercase
          tracking-[0.22em]

          font-mono
        "
      >
        System Online
      </span>

    </div>

  </div>

</footer>

    </section>
  );
}