"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Soft elastic spring for smooth cinematic trailing
  const springX = useSpring(mouseX, { damping: 28, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 200 });

  useEffect(() => {
    // Detect touch-only devices to avoid rendering cursor on phones
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.dataset.interactive === "true";
        setIsPointer(!!isClickable);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary Soft Glow Ambient Orb */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.4 : 1,
          opacity: isPointer ? 0.25 : 0.15,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#E05263] via-[#E8D5B5] to-transparent blur-[90px]"
      />

      {/* Tiny Core Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.8 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-2 h-2 rounded-full bg-[#F8F7F4]/80 shadow-[0_0_12px_#E8D5B5]"
      />
    </div>
  );
}
