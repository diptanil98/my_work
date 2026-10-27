"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function CinematicHero() {
  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: custom,
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="section-1"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Subtle Warm Atmospheric Light Bloom */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#E05263]/20 via-[#E8D5B5]/15 to-transparent blur-[120px] pointer-events-none"
      />

      {/* Main Emotional Typography */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6 md:space-y-8 select-none py-12">
        <motion.h1
          custom={0.4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineVariants}
          className="font-serif-cinematic text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-[#F8F7F4] tracking-tight"
        >
          I know.
        </motion.h1>

        <motion.h2
          custom={1.6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineVariants}
          className="font-serif-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#A7A5AE] tracking-tight italic"
        >
          I messed up.
        </motion.h2>

        <motion.p
          custom={2.8}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineVariants}
          className="font-serif-cinematic text-2xl sm:text-3xl md:text-5xl text-[#E8D5B5] font-light tracking-wide max-w-2xl pt-4 text-glow-champagne"
        >
          And I'm genuinely sorry.
        </motion.p>
      </div>

      {/* Cinematic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#A7A5AE]/60 pointer-events-none select-none"
      >
        <span className="text-[11px] tracking-[0.25em] uppercase font-light">
          Keep scrolling
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#E8D5B5]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
