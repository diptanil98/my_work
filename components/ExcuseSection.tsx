"use client";

import { motion, Variants } from "framer-motion";

export default function ExcuseSection() {
  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 35, filter: "blur(10px)" },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="section-3"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center select-none py-32"
    >
      {/* Absolute Minimal Negative Space Container */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-12 md:space-y-16">
        <motion.p
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={lineVariants}
          className="font-serif-cinematic text-3xl sm:text-5xl md:text-6xl text-[#A7A5AE] font-light leading-snug tracking-tight"
        >
          I'm not here to explain why I did it.
        </motion.p>

        <motion.p
          custom={1.6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={lineVariants}
          className="font-serif-cinematic text-3xl sm:text-5xl md:text-6xl text-[#F8F7F4] font-light leading-snug tracking-tight"
        >
          I'm here to admit that <span className="text-[#E05263] italic">I hurt you</span>.
        </motion.p>

        <motion.p
          custom={3.0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={lineVariants}
          className="font-serif-cinematic text-2xl sm:text-4xl md:text-5xl text-[#E8D5B5] font-light italic leading-snug max-w-2xl pt-2 text-glow-champagne"
        >
          And I hate that I made the person I love feel that way.
        </motion.p>
      </div>
    </section>
  );
}
