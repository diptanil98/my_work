"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { constellationStars, StarNode } from "@/data/constellation";
import { soundManager } from "@/lib/sound";
import { Sparkles } from "lucide-react";

export default function LoveConstellation() {
  const [selectedStar, setSelectedStar] = useState<StarNode | null>(constellationStars[7]); // Defaults to 'Your heart'

  const handleSelectStar = (star: StarNode) => {
    setSelectedStar(star);
    soundManager.playChime(523 + star.x * 4);
  };

  // Connecting lines between stars for celestial pattern
  const lines = [
    [constellationStars[0], constellationStars[1]],
    [constellationStars[1], constellationStars[2]],
    [constellationStars[2], constellationStars[3]],
    [constellationStars[3], constellationStars[4]],
    [constellationStars[4], constellationStars[5]],
    [constellationStars[5], constellationStars[6]],
    [constellationStars[6], constellationStars[0]],
    // Connections to center star (Your heart)
    [constellationStars[7], constellationStars[0]],
    [constellationStars[7], constellationStars[1]],
    [constellationStars[7], constellationStars[4]],
    [constellationStars[7], constellationStars[6]],
  ];

  return (
    <section
      id="section-6"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-28 overflow-hidden select-none"
    >
      {/* Deep Space Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(224,82,99,0.05)_0%,rgba(8,8,13,0.98)_80%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto mb-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[#A7A5AE]/70 font-mono block mb-3"
        >
          Chapter 06 — Constellation
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-serif-cinematic text-4xl sm:text-5xl md:text-6xl text-[#F8F7F4] font-light"
        >
          Things I Love About You
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs sm:text-sm text-[#A7A5AE] mt-3 font-light"
        >
          Tap any glowing star in the sky to reveal a piece of what makes you irreplaceable.
        </motion.p>
      </div>

      {/* Interactive Constellation Sky Box */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[480px] rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Subtle star dust backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* SVG Connecting Celestial Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {lines.map(([p1, p2], idx) => {
              const isConnectedToSelected =
                selectedStar && (selectedStar.id === p1.id || selectedStar.id === p2.id);
              return (
                <line
                  key={idx}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke={isConnectedToSelected ? "rgba(224, 82, 99, 0.45)" : "rgba(232, 213, 181, 0.12)"}
                  strokeWidth={isConnectedToSelected ? "1.5" : "1"}
                  strokeDasharray={isConnectedToSelected ? "none" : "3 4"}
                  className="transition-all duration-700"
                />
              );
            })}
          </svg>

          {/* Interactive Star Nodes */}
          {constellationStars.map((star) => {
            const isSelected = selectedStar?.id === star.id;
            return (
              <button
                key={star.id}
                onClick={() => handleSelectStar(star)}
                type="button"
                aria-label={`Star: ${star.title}`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute group p-3 cursor-pointer focus:outline-none"
              >
                {/* Corona & Aura */}
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none ${
                    isSelected
                      ? "bg-[#E05263]/30 scale-150 blur-md animate-pulse"
                      : "bg-[#E8D5B5]/10 scale-90 group-hover:scale-125 group-hover:bg-[#E8D5B5]/25"
                  }`}
                />

                {/* Star Core */}
                <span
                  className={`relative block rounded-full transition-all duration-300 ${
                    isSelected
                      ? "w-4 h-4 bg-[#F8F7F4] shadow-[0_0_15px_#E05263] scale-125"
                      : "w-2.5 h-2.5 bg-[#E8D5B5] group-hover:scale-125 shadow-[0_0_8px_#E8D5B5]"
                  }`}
                />

                {/* Star Label on desktop */}
                <span
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[11px] font-mono tracking-wider transition-all duration-300 pointer-events-none ${
                    isSelected
                      ? "text-[#E8D5B5] font-semibold opacity-100"
                      : "text-[#A7A5AE]/60 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {star.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Star Reflection Card */}
        <div className="w-full max-w-xl mt-6 min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedStar && (
              <motion.div
                key={selectedStar.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="glass-panel w-full p-6 sm:p-7 rounded-2xl border border-[#E8D5B5]/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-center relative overflow-hidden"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E05263]/10 text-[#E05263] text-xs font-mono mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Constellation Point</span>
                </div>
                <h3 className="font-serif-cinematic text-2xl sm:text-3xl text-[#F8F7F4] font-medium mb-2">
                  {selectedStar.title}
                </h3>
                <p className="text-sm sm:text-base text-[#A7A5AE] font-light leading-relaxed max-w-md mx-auto">
                  {selectedStar.thought}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
