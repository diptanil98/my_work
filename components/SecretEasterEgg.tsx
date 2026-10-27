"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/lib/sound";
import { siteConfig } from "@/data/config";

export default function SecretEasterEgg() {
  const [starOpen, setStarOpen] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  const [heartEasterEggOpen, setHeartEasterEggOpen] = useState(false);

  const handleStarClick = () => {
    soundManager.playChime(880);
    setStarOpen(true);
  };

  const handleHeartClick = () => {
    soundManager.playChime(523.25 + heartClicks * 60);
    const next = heartClicks + 1;
    setHeartClicks(next);

    if (next === 5) {
      setHeartEasterEggOpen(true);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.9, x: 0.1 },
        colors: ["#E05263", "#E8D5B5", "#F8F7F4"],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <>
      {/* Hidden Star Icon in bottom right corner */}
      <button
        onClick={handleStarClick}
        aria-label="A tiny hidden star"
        className="fixed bottom-6 right-6 z-30 p-2 text-[#A7A5AE]/20 hover:text-[#E8D5B5]/80 transition-colors duration-500 cursor-pointer focus:outline-none"
        title="?"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>

      {/* Hidden Heart in bottom left corner */}
      <button
        onClick={handleHeartClick}
        aria-label="A subtle token"
        className="fixed bottom-6 left-6 z-30 p-2 text-[#A7A5AE]/20 hover:text-[#E05263]/70 transition-colors duration-500 cursor-pointer focus:outline-none"
        title="Tap me"
      >
        <Heart className={`w-3.5 h-3.5 transition-transform duration-200 ${heartClicks > 0 ? "scale-110 text-[#E05263]/40" : ""}`} />
      </button>

      {/* Hidden Star Modal */}
      <AnimatePresence>
        {starOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStarOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 rounded-2xl max-w-sm w-full relative border border-[#E8D5B5]/20 shadow-[0_0_50px_rgba(232,213,181,0.1)] text-center"
            >
              <button
                onClick={() => setStarOpen(false)}
                className="absolute top-4 right-4 text-[#A7A5AE] hover:text-[#F8F7F4] p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-[#E8D5B5]/10 flex items-center justify-center text-[#E8D5B5]">
                <Sparkles className="w-5 h-5" />
              </div>

              <p className="font-serif-cinematic text-2xl text-[#F8F7F4] mb-3">
                You found it.
              </p>

              <p className="text-sm text-[#A7A5AE] leading-relaxed mb-4">
                "I hid this here because I wanted you to find it."
              </p>

              <p className="font-handwriting text-lg text-[#E8D5B5]">
                {siteConfig.insideJoke}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5-Heart Clicks Easter Egg Modal */}
      <AnimatePresence>
        {heartEasterEggOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHeartEasterEggOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 rounded-2xl max-w-sm w-full relative border border-[#E05263]/30 shadow-[0_0_50px_rgba(224,82,99,0.2)] text-center"
            >
              <button
                onClick={() => setHeartEasterEggOpen(false)}
                className="absolute top-4 right-4 text-[#A7A5AE] hover:text-[#F8F7F4] p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#E05263]/15 flex items-center justify-center text-[#E05263]">
                <Heart className="w-6 h-6 fill-current animate-pulse" />
              </div>

              <p className="font-serif-cinematic text-2xl text-[#F8F7F4] mb-2">
                Okay okay...
              </p>

              <p className="text-base text-[#E8D5B5] font-serif-cinematic italic mb-3">
                I really, really love you.
              </p>

              <p className="text-xs text-[#A7A5AE] leading-relaxed">
                Even when I am clumsy with words, my heart is completely yours.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
