"use client";

import { motion, Variants } from "framer-motion";
import { promisesData } from "@/data/promises";

export default function PromiseSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="section-8"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center">
        {/* Chapter marker */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[#A7A5AE]/70 font-mono block mb-4"
        >
          Chapter 08 — Moving Forward
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif-cinematic text-3xl sm:text-5xl md:text-6xl text-[#A7A5AE] font-light leading-snug mb-3"
        >
          I can't promise I'll never make mistakes.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-serif-cinematic text-2xl sm:text-4xl text-[#E8D5B5] font-light italic mb-14"
        >
          But I can promise...
        </motion.p>

        {/* List of Promises */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-4 max-w-xl mx-auto text-left mb-16"
        >
          {promisesData.map((p) => (
            <motion.div
              key={p.id}
              variants={item}
              className="p-5 rounded-2xl glass-panel-subtle border border-white/5 hover:border-[#E8D5B5]/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E05263] mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                <div>
                  <h3 className="font-serif-cinematic text-xl sm:text-2xl text-[#F8F7F4] font-normal leading-snug">
                    {p.text}
                  </h3>
                  {p.subtext && (
                    <p className="text-xs sm:text-sm text-[#A7A5AE] mt-1 font-light leading-relaxed">
                      {p.subtext}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="max-w-lg mx-auto pt-8 border-t border-white/10"
        >
          <p className="font-serif-cinematic text-2xl sm:text-3xl text-[#F8F7F4] font-light leading-relaxed">
            And when I get it wrong,
          </p>
          <p className="font-serif-cinematic text-2xl sm:text-3xl text-[#E8D5B5] font-light italic mt-1 text-glow-champagne">
            I'll do better instead of just saying sorry.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
