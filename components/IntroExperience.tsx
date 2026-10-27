"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sound";
import { siteConfig } from "@/data/config";

interface IntroExperienceProps {
  onEnter: () => void;
}

export default function IntroExperience({ onEnter }: IntroExperienceProps) {
  const [phase, setPhase] = useState<"initial" | "zooming" | "lineReveal" | "finished">("initial");

  const handleStart = () => {
    // Start ambient audio and warm chime
    soundManager.setMuted(false, siteConfig.audio.src);
    soundManager.playChime(440);

    setPhase("zooming");

    setTimeout(() => {
      setPhase("lineReveal");
    }, 1100);

    setTimeout(() => {
      setPhase("finished");
      onEnter();
    }, 4200);
  };

  if (phase === "finished") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08080D] px-6 text-center select-none overflow-hidden"
      >
        {/* Subtle cinematic radial vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(224,82,99,0.06)_0%,rgba(8,8,13,0.95)_70%)]" />

        {/* Phase 1: Minimal Initial Prompt */}
        {phase === "initial" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center max-w-md mx-auto"
          >
            <p className="text-sm md:text-base font-light text-[#A7A5AE] tracking-wide mb-8">
              Before you leave... give me 2 minutes.
            </p>

            <button
              onClick={handleStart}
              type="button"
              className="group relative px-8 py-3 rounded-full text-xs uppercase tracking-[0.25em] text-[#F8F7F4]/90 glass-pill hover:text-[#F8F7F4] hover:border-[#E8D5B5]/50 transition-all duration-500 cursor-pointer overflow-hidden focus:outline-none focus:ring-1 focus:ring-[#E8D5B5]/60"
            >
              {/* Subtle button breathing shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E8D5B5]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative z-10 font-serif-cinematic text-sm tracking-[0.2em]">
                Enter
              </span>
            </button>
          </motion.div>
        )}

        {/* Phase 2 & 3: Camera Zoom & Line Reveal */}
        {(phase === "zooming" || phase === "lineReveal") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center max-w-xl mx-auto px-4"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.4 }}
              className="font-serif-cinematic text-2xl md:text-4xl text-[#F8F7F4] font-light leading-relaxed tracking-wide"
            >
              This isn't a website.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.4 }}
              className="font-serif-cinematic text-xl md:text-3xl text-[#E8D5B5] font-light italic mt-3"
            >
              It's everything I couldn't say properly.
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
