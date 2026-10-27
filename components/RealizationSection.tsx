"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sound";

interface RealizationMoment {
  id: string;
  tag: string;
  thought: string;
  reflection: string;
  accentColor: string;
}

const moments: RealizationMoment[] = [
  {
    id: "m1",
    tag: "What I said",
    thought: "Careless words spoken defensively in the heat of the moment.",
    reflection: "Instead of being your safe place, I spoke without pausing to think how heavy those words would land.",
    accentColor: "#E05263",
  },
  {
    id: "m2",
    tag: "What I should have said",
    thought: "'I hear you, I'm sorry, and your feelings matter far more than my ego.'",
    reflection: "Nothing is worth making the person I cherish most feel like she has to fight to be understood.",
    accentColor: "#E8D5B5",
  },
  {
    id: "m3",
    tag: "What you probably felt",
    thought: "Unheard, isolated, and unfairly let down.",
    reflection: "Wondering why the person who is supposed to care for you the most was causing you sorrow.",
    accentColor: "#DFBD89",
  },
  {
    id: "m4",
    tag: "What I wish I had done instead",
    thought: "Stopped everything, put my arms around you, and just listened.",
    reflection: "Giving you warmth and space, without needing to justify myself or win an argument.",
    accentColor: "#E05263",
  },
];

export default function RealizationSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleSelectMoment = (idx: number) => {
    setActiveIdx(idx);
    soundManager.playChime(440 + idx * 75);
  };

  return (
    <section
      id="section-2"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background Shift based on current active thought */}
      <motion.div
        key={activeIdx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.2 }}
        style={{ backgroundColor: moments[activeIdx].accentColor }}
        className="absolute inset-0 pointer-events-none blur-[140px]"
      />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-16 select-none">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[#A7A5AE]/70 font-mono block mb-3"
        >
          Chapter 02 — The Mind Replay
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 1 }}
          className="font-serif-cinematic text-3xl sm:text-5xl md:text-6xl text-[#F8F7F4] font-light leading-tight"
        >
          I've replayed that moment in my head.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sm text-[#A7A5AE] mt-4 font-light"
        >
          Tracing every second where I should have chosen gentleness over pride.
        </motion.p>
      </div>

      {/* Interactive Floating Moments Showcase */}
      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Navigation list on left */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {moments.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMoment(idx)}
                className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-500 relative cursor-pointer border ${
                  isSelected
                    ? "glass-panel border-[#E8D5B5]/30 shadow-[0_0_30px_rgba(232,213,181,0.08)] translate-x-1"
                    : "glass-panel-subtle border-transparent hover:border-white/10 opacity-60 hover:opacity-90"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-xs uppercase tracking-widest font-mono ${
                      isSelected ? "text-[#E8D5B5]" : "text-[#A7A5AE]"
                    }`}
                  >
                    {m.tag}
                  </span>
                  <span className="text-[10px] text-[#A7A5AE]/50 font-mono">0{idx + 1}</span>
                </div>
                <p
                  className={`font-serif-cinematic text-lg sm:text-xl line-clamp-2 transition-colors ${
                    isSelected ? "text-[#F8F7F4] font-medium" : "text-[#A7A5AE]"
                  }`}
                >
                  {m.thought}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Floating Thought Spotlight on right */}
        <div className="md:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden min-h-[320px] flex flex-col justify-center">
            {/* Ambient inner glow */}
            <div
              className="absolute -right-16 -top-16 w-52 h-52 rounded-full blur-[80px] pointer-events-none opacity-20"
              style={{ backgroundColor: moments[activeIdx].accentColor }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E8D5B5]/80 block mb-4">
                  Inside my thoughts
                </span>
                <p className="font-serif-cinematic text-2xl sm:text-3xl text-[#F8F7F4] font-light leading-relaxed mb-6">
                  "{moments[activeIdx].thought}"
                </p>
                <div className="w-12 h-[1px] bg-[#E8D5B5]/30 mb-6" />
                <p className="text-sm sm:text-base text-[#A7A5AE] leading-relaxed font-light">
                  {moments[activeIdx].reflection}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
