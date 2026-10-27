"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sound";
import { Sparkles } from "lucide-react";

interface HeartParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  opacity: number;
}

export default function SurpriseReveal() {
  const [isOpen, setIsOpen] = useState(false);
  const [revealStep, setRevealStep] = useState<"idle" | "singleParticle" | "formingHeart" | "textReveal">("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleOpenSurprise = () => {
    soundManager.playChime(659.25);
    setIsOpen(true);
    setRevealStep("singleParticle");

    setTimeout(() => {
      setRevealStep("formingHeart");
    }, 1800);

    setTimeout(() => {
      setRevealStep("textReveal");
    }, 3800);
  };

  useEffect(() => {
    if (!isOpen || revealStep === "idle") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mathematical heart coordinates
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const scale = Math.min(width, height) / 38;

    const particleCount = 280;
    const particles: HeartParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Parametric equation for a heart
      const t = (Math.PI * 2 * i) / particleCount;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      const targetX = centerX + hx * scale;
      const targetY = centerY + hy * scale;

      const isRose = Math.random() > 0.45;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX,
        targetY,
        size: Math.random() * 2 + 1,
        color: isRose ? "rgba(224, 82, 99, " : "rgba(232, 213, 181, ",
        speed: Math.random() * 0.04 + 0.02,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    // Single traveling particle state
    let singleX = 0;
    let singleY = height * 0.7;

    const render = () => {
      ctx.fillStyle = "rgba(5, 5, 8, 0.25)";
      ctx.fillRect(0, 0, width, height);

      if (revealStep === "singleParticle") {
        singleX += (width * 0.5 - singleX) * 0.04;
        singleY += (centerY - singleY) * 0.04;

        ctx.beginPath();
        ctx.arc(singleX, singleY, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#E8D5B5";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#E8D5B5";
        ctx.fill();
      } else {
        // Hundreds of particles form the heart
        particles.forEach((p) => {
          p.x += (p.targetX - p.x) * p.speed;
          p.y += (p.targetY - p.y) * p.speed;

          // Subtle organic floating jitter
          p.angle += 0.02;
          const jitterX = Math.sin(p.angle) * 1.5;
          const jitterY = Math.cos(p.angle) * 1.5;

          ctx.beginPath();
          ctx.arc(p.x + jitterX, p.y + jitterY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color.includes("224") ? "#E05263" : "#E8D5B5";
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, revealStep]);

  return (
    <section
      id="section-9"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 text-center select-none overflow-hidden"
    >
      {/* Pre-reveal Initial Prompt */}
      {!isOpen ? (
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-[#A7A5AE]/70 font-mono block mb-4"
          >
            Chapter 09 — A Final Secret
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-serif-cinematic text-4xl sm:text-6xl text-[#F8F7F4] font-light mb-10"
          >
            There's one more thing.
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={handleOpenSurprise}
            type="button"
            className="group relative px-9 py-3.5 rounded-full glass-panel border border-[#E8D5B5]/40 text-sm font-serif-cinematic tracking-widest text-[#E8D5B5] hover:text-[#F8F7F4] hover:border-[#E8D5B5] transition-all duration-500 cursor-pointer shadow-[0_0_35px_rgba(232,213,181,0.15)] hover:shadow-[0_0_50px_rgba(232,213,181,0.3)]"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E8D5B5]" />
              <span>Open it</span>
            </span>
          </motion.button>
        </div>
      ) : (
        /* Fullscreen Cinematic Particles Heart & Climax Reveal */
        <div className="fixed inset-0 z-50 bg-[#050508] flex items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          <AnimatePresence>
            {revealStep === "textReveal" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-lg px-6 text-center select-none"
              >
                <p className="font-serif-cinematic text-xl sm:text-2xl text-[#A7A5AE] font-light mb-4">
                  Thank you for still being here.
                </p>

                <p className="font-serif-cinematic text-4xl sm:text-6xl text-[#F8F7F4] font-medium tracking-tight mb-4 text-glow-rose">
                  I love you.
                </p>

                <p className="font-serif-cinematic text-lg sm:text-xl text-[#E8D5B5] font-light italic">
                  More than this little website could ever explain.
                </p>

                <div className="mt-10">
                  <button
                    onClick={() => {
                      const el = document.getElementById("section-10");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                      setIsOpen(false);
                    }}
                    className="px-6 py-2 rounded-full glass-pill text-xs uppercase tracking-widest text-[#A7A5AE] hover:text-[#F8F7F4] transition-all cursor-pointer"
                  >
                    Continue to the end ↓
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
