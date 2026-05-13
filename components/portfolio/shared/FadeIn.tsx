"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { smoothEasing } from "../data/portfolioData";

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay,
        ease: smoothEasing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}