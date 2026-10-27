"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/sound";
import { Heart } from "lucide-react";

export default function FinalQuestion() {
  const [response, setResponse] = useState<"none" | "yes" | "giveTime">("none");

  const handleYes = () => {
    soundManager.playChime(784); // G5 warm resolution tone

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#E05263", "#E8D5B5", "#F8F7F4"],
      ticks: 300,
      disableForReducedMotion: true,
    });

    setResponse("yes");
  };

  const handleGiveTime = () => {
    soundManager.playChime(440); // A4 gentle tone
    setResponse("giveTime");
  };

  return (
    <section
      id="section-10"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 text-center select-none overflow-hidden"
    >
      {/* Background Soft Bloom for 'Yes' */}
      <AnimatePresence>
        {response === "yes" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,#E05263_0%,#E8D5B5_40%,transparent_75%)] blur-[120px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Unanswered State */}
        {response === "none" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <p className="font-serif-cinematic text-3xl sm:text-4xl text-[#A7A5AE] font-light mb-4">
              So...
            </p>

            <h2 className="font-serif-cinematic text-4xl sm:text-6xl text-[#F8F7F4] font-light tracking-tight mb-12">
              Can I make it up to you?
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* 'Yes' Button */}
              <button
                onClick={handleYes}
                type="button"
                className="group px-8 py-3.5 rounded-full glass-panel border border-[#E05263]/40 text-[#F8F7F4] font-serif-cinematic text-lg tracking-wider hover:border-[#E05263] hover:shadow-[0_0_30px_rgba(224,82,99,0.3)] transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>Yes</span>
                <Heart className="w-4 h-4 text-[#E05263] fill-current group-hover:scale-125 transition-transform" />
              </button>

              {/* 'Give me some time' Button */}
              <button
                onClick={handleGiveTime}
                type="button"
                className="px-7 py-3.5 rounded-full glass-panel-subtle border border-white/10 text-sm font-sans tracking-wide text-[#A7A5AE] hover:text-[#F8F7F4] hover:border-white/25 transition-all duration-300 cursor-pointer"
              >
                Give me some time
              </button>
            </div>
          </motion.div>
        )}

        {/* Response State: 'Yes' */}
        {response === "yes" && (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="font-serif-cinematic text-3xl sm:text-4xl text-[#E8D5B5] font-light">
              Okay.
            </p>

            <p className="font-serif-cinematic text-2xl sm:text-4xl text-[#F8F7F4] font-light leading-relaxed max-w-lg mx-auto">
              Then I'm going to spend a lot of time making sure you don't regret it.
            </p>

            <div className="pt-6">
              <p className="font-handwriting text-3xl sm:text-4xl text-[#E05263] text-glow-rose">
                Come here. ❤️
              </p>
            </div>
          </motion.div>
        )}

        {/* Response State: 'Give me some time' */}
        {response === "giveTime" && (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p className="font-serif-cinematic text-2xl sm:text-3xl text-[#E8D5B5] font-light">
              That's okay.
            </p>

            <p className="font-serif-cinematic text-2xl sm:text-3xl text-[#F8F7F4] font-light leading-relaxed">
              Take all the time you need.
            </p>

            <p className="font-serif-cinematic text-lg sm:text-xl text-[#A7A5AE] font-light italic pt-2">
              I'll still be here.
            </p>

            <div className="pt-6">
              <button
                onClick={() => setResponse("none")}
                className="text-xs text-[#A7A5AE]/60 hover:text-[#A7A5AE] tracking-widest uppercase font-mono transition-colors"
              >
                Change answer
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Subtle Bottom Aesthetic Signature */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[10px] text-[#A7A5AE]/30 font-mono tracking-widest uppercase pointer-events-none">
        Handcrafted with all my heart
      </footer>
    </section>
  );
}
