"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letterSalutation, letterContent, letterSignOff, letterAuthor } from "@/data/letter";
import { siteConfig } from "@/data/config";
import { soundManager } from "@/lib/sound";
import { Feather, ChevronDown } from "lucide-react";

export default function LoveLetter() {
  // Reveal progressively: start with 2 paragraphs visible
  const [visibleCount, setVisibleCount] = useState(2);

  const handleContinue = () => {
    soundManager.playChime(580);
    setVisibleCount((prev) => Math.min(letterContent.length, prev + 1));
  };

  const isFullyRevealed = visibleCount >= letterContent.length;

  return (
    <section
      id="section-7"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-28 overflow-hidden select-none"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#11111A_0%,#08080D_70%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[#A7A5AE]/70 font-mono block mb-3"
        >
          Chapter 07 — In Writing
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-serif-cinematic text-4xl sm:text-5xl md:text-6xl text-[#F8F7F4] font-light"
        >
          A Private Letter
        </motion.h2>
      </div>

      {/* Luxury Parchment Surface */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl w-full p-8 sm:p-12 md:p-14 rounded-3xl glass-panel border border-[#E8D5B5]/20 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      >
        {/* Subtle decorative parchment stamp */}
        <div className="absolute top-6 right-6 text-[#E8D5B5]/30">
          <Feather className="w-5 h-5" />
        </div>

        {/* Salutation */}
        <div className="mb-6">
          <p className="font-serif-cinematic text-2xl sm:text-3xl text-[#F8F7F4] font-medium">
            {siteConfig.recipientName !== "[GIRLFRIEND_NAME]"
              ? `Hey ${siteConfig.recipientName},`
              : letterSalutation}
          </p>
        </div>

        {/* Letter Paragraphs */}
        <div className="space-y-6 text-[#F8F7F4]/90 font-serif-cinematic text-lg sm:text-xl font-light leading-relaxed">
          {letterContent.slice(0, visibleCount).map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={para.startsWith("[LETTER_CONTENT") ? "text-[#E8D5B5]/80 italic border-l-2 border-[#E8D5B5]/30 pl-4 py-1" : ""}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Continue Reading Button */}
        <AnimatePresence>
          {!isFullyRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 pt-6 border-t border-white/10 flex justify-center"
            >
              <button
                onClick={handleContinue}
                type="button"
                className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full glass-pill text-xs uppercase tracking-widest text-[#E8D5B5] hover:text-[#F8F7F4] hover:border-[#E8D5B5]/40 transition-all duration-300 cursor-pointer"
              >
                <span>Continue reading</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sign-off (Revealed when finished) */}
        <AnimatePresence>
          {isFullyRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-10 pt-6 border-t border-white/10 flex flex-col items-end"
            >
              <p className="font-handwriting text-2xl text-[#E8D5B5]">
                {letterSignOff}
              </p>
              <p className="font-handwriting text-xl text-[#F8F7F4]">
                {letterAuthor}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
