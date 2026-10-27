"use client";

import { motion, Variants } from "framer-motion";

const apologyLines = [
  "I'm sorry for the way I spoke.",
  "I'm sorry for making you feel unheard.",
  "I'm sorry for making you question how much you mean to me.",
  "I'm sorry for not handling my emotions better.",
  "I'm sorry that my words hurt you.",
  "I'm sorry.",
];

export default function ApologySection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="section-5"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 text-center select-none overflow-hidden"
    >
      {/* Slow Moving Luminous Radial Aura */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.95, 1],
          rotate: [0, 90, 180, 360],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,#E05263_0%,#E8D5B5_40%,transparent_70%)] blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Subtle chapter tag */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-[#A7A5AE]/70 font-mono block mb-4"
        >
          Chapter 05 — The Core
        </motion.span>

        {/* Big Solemn Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-serif-cinematic text-5xl sm:text-7xl md:text-8xl text-[#F8F7F4] font-light tracking-tight mb-14"
        >
          I'm sorry.
        </motion.h2>

        {/* Apology Lines Sequence */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 md:space-y-7 mb-16"
        >
          {apologyLines.map((line, idx) => (
            <motion.p
              key={idx}
              variants={itemVariants}
              className={`font-serif-cinematic text-xl sm:text-2xl md:text-3xl font-light leading-relaxed ${
                idx === apologyLines.length - 1
                  ? "text-[#E8D5B5] font-normal text-glow-champagne text-2xl sm:text-3xl md:text-4xl pt-2"
                  : "text-[#A7A5AE]"
              }`}
            >
              "{line}"
            </motion.p>
          ))}
        </motion.div>

        {/* Climax Lines */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 2.2, duration: 1.4 }}
          className="pt-8 border-t border-white/10 max-w-xl mx-auto space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#E8D5B5]/70 font-mono">
            But most importantly...
          </p>
          <p className="font-serif-cinematic text-2xl sm:text-3xl text-[#F8F7F4] font-light leading-snug">
            I don't want my apology to just be words.
          </p>
          <p className="font-serif-cinematic text-xl sm:text-2xl text-[#E05263] font-light italic text-glow-rose">
            I want my actions to make you feel loved again.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
