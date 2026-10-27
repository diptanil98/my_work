"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { soundManager } from "@/lib/sound";

interface SectionMeta {
  id: string;
  number: string;
  label: string;
}

const sections: SectionMeta[] = [
  { id: "section-1", number: "01", label: "I Know" },
  { id: "section-2", number: "02", label: "Realization" },
  { id: "section-3", number: "03", label: "No Excuses" },
  { id: "section-4", number: "04", label: "Memories" },
  { id: "section-5", number: "05", label: "The Apology" },
  { id: "section-6", number: "06", label: "What I Love" },
  { id: "section-7", number: "07", label: "A Letter" },
  { id: "section-8", number: "08", label: "Promises" },
  { id: "section-9", number: "09", label: "Surprise" },
  { id: "section-10", number: "10", label: "One Question" },
];

export default function FloatingProgress({ isExperienceEntered }: { isExperienceEntered: boolean }) {
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isExperienceEntered) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
      }

      // Determine active section based on viewport position
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExperienceEntered]);

  if (!isExperienceEntered) return null;

  const scrollTo = (id: string) => {
    soundManager.playChime(640);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Vertical Strip */}
      <nav
        aria-label="Story chapter progression"
        className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3.5 select-none"
      >
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center gap-3 text-left focus:outline-none"
              aria-label={`Jump to chapter ${sec.number}: ${sec.label}`}
            >
              <div className="relative flex items-center justify-center w-6">
                <span
                  className={`text-[11px] font-mono tracking-widest transition-all duration-300 ${
                    isActive
                      ? "text-[#E8D5B5] scale-110 font-semibold"
                      : "text-[#A7A5AE]/40 group-hover:text-[#F8F7F4]/80"
                  }`}
                >
                  {sec.number}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeGlowDot"
                    className="absolute -left-2 w-1.5 h-1.5 rounded-full bg-[#E05263] shadow-[0_0_8px_#E05263]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </div>

              {/* Hover Chapter Name Tooltip */}
              <span
                className={`text-[11px] tracking-wider uppercase transition-all duration-300 pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                  isActive ? "text-[#E8D5B5]" : "text-[#A7A5AE]"
                }`}
              >
                {sec.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Subtle Vertical Line & Glowing Bead */}
      <div
        className="fixed right-3 top-1/2 -translate-y-1/2 z-40 md:hidden flex flex-col items-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[1.5px] h-32 bg-white/10 rounded-full relative overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-[#E05263] to-[#E8D5B5] rounded-full"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
