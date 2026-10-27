"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { memoriesData } from "@/data/memories";
import { soundManager } from "@/lib/sound";

export default function MemoryGallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseEnter = (id: string, idx: number) => {
    setHoveredId(id);
    soundManager.playChime(500 + idx * 80);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <section
      id="section-4"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-28 overflow-hidden select-none"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#11111A] via-[#08080D] to-[#08080D] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[#A7A5AE]/70 font-mono block mb-3"
        >
          Chapter 04 — What We Built
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-serif-cinematic text-4xl sm:text-5xl md:text-6xl text-[#F8F7F4] font-light"
        >
          Our Memories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sm text-[#A7A5AE] mt-4 font-light max-w-md mx-auto"
        >
          These are the moments that prove what we have is too precious to ever be reckless with.
        </motion.p>
      </div>

      {/* Desktop Layered Floating Gallery */}
      <div className="relative z-10 hidden lg:flex items-center justify-center gap-6 max-w-6xl w-full py-8">
        {memoriesData.map((mem, idx) => {
          const isHovered = hoveredId === mem.id;
          const isAnyHovered = hoveredId !== null;

          return (
            <motion.div
              key={mem.id}
              onMouseEnter={() => handleMouseEnter(mem.id, idx)}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.8 }}
              style={{
                rotate: isHovered ? 0 : mem.rotation,
                zIndex: isHovered ? 30 : 10,
              }}
              className="relative transition-all duration-500 ease-out cursor-pointer group"
            >
              {/* Polaroid-style Framed Container */}
              <div
                className={`p-3.5 pb-6 rounded-2xl glass-panel transition-all duration-500 ${
                  isHovered
                    ? "scale-110 shadow-[0_20px_50px_rgba(224,82,99,0.25)] border-[#E8D5B5]/50 bg-[#11111A]/90"
                    : isAnyHovered
                    ? "opacity-35 blur-[2.5px] scale-95"
                    : "hover:border-white/20"
                }`}
                style={{ width: "220px" }}
              >
                {/* Image Frame */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 mb-4 border border-white/5">
                  <img
                    src={mem.image}
                    alt={mem.placeholderTitle}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Captions */}
                <div className="text-center px-1">
                  <p className="font-handwriting text-lg text-[#E8D5B5] leading-snug">
                    "{mem.caption}"
                  </p>
                  <p className="text-[10px] text-[#A7A5AE]/70 font-mono tracking-wider uppercase mt-1">
                    {mem.dateOrPlace || `Memory 0${idx + 1}`}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile & Tablet Swipeable Story Strip */}
      <div className="relative z-10 lg:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-5 px-6 pb-6 pt-2 scrollbar-none">
        {memoriesData.map((mem, idx) => (
          <div
            key={mem.id}
            className="snap-center shrink-0 w-[260px] p-3.5 pb-6 rounded-2xl glass-panel border border-white/10 shadow-lg"
          >
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/40 mb-3 border border-white/5">
              <img
                src={mem.image}
                alt={mem.placeholderTitle}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center px-2">
              <p className="font-handwriting text-xl text-[#E8D5B5] leading-snug mb-1">
                "{mem.caption}"
              </p>
              <p className="text-[11px] text-[#A7A5AE] font-mono tracking-wider">
                {mem.placeholderTitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 lg:hidden mt-4 text-center">
        <span className="text-[11px] text-[#A7A5AE]/60 uppercase tracking-widest font-mono">
          ← Swipe to explore memories →
        </span>
      </div>
    </section>
  );
}
