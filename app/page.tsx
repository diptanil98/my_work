"use client";

import { useState, useEffect } from "react";
import IntroExperience from "@/components/IntroExperience";
import CursorGlow from "@/components/CursorGlow";
import ParticleBackground from "@/components/ParticleBackground";
import AudioToggle from "@/components/AudioToggle";
import FloatingProgress from "@/components/FloatingProgress";
import SecretEasterEgg from "@/components/SecretEasterEgg";
import CinematicHero from "@/components/CinematicHero";
import RealizationSection from "@/components/RealizationSection";
import ExcuseSection from "@/components/ExcuseSection";
import MemoryGallery from "@/components/MemoryGallery";
import ApologySection from "@/components/ApologySection";
import LoveConstellation from "@/components/LoveConstellation";
import LoveLetter from "@/components/LoveLetter";
import PromiseSection from "@/components/PromiseSection";
import SurpriseReveal from "@/components/SurpriseReveal";
import FinalQuestion from "@/components/FinalQuestion";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY - 25 && currentScrollY > 400) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY + 15) {
        setIsScrollingUp(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#08080D] text-[#F8F7F4] selection:bg-[#E05263]/30 overflow-x-hidden">
      {/* Film Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Floating Particles Atmosphere */}
      <ParticleBackground />

      {/* Smooth Cursor Glow */}
      <CursorGlow />

      {/* Step 0: The Entry / Unexpected Beginning Gate */}
      <IntroExperience
        onEnter={() => {
          setIsEntered(true);
          setIsAudioPlaying(true);
        }}
      />

      {/* Audio Toggle in Header */}
      <AudioToggle
        isPlaying={isAudioPlaying}
        onToggle={(playing) => setIsAudioPlaying(playing)}
      />

      {/* Floating Chapter Progress Indicator */}
      <FloatingProgress isExperienceEntered={isEntered} />

      {/* Micro-interaction Easter Eggs */}
      <SecretEasterEgg />

      {/* Subtle Scroll Direction Whisper */}
      {isScrollingUp && (
        <div
          role="status"
          className="fixed top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4 py-1.5 rounded-full glass-pill border border-[#E8D5B5]/20 text-[11px] font-serif-cinematic italic text-[#E8D5B5] animate-fade-in"
        >
          Looking back won't change what I said, but it reminds me why I must do better.
        </div>
      )}

      {/* Main Cinematic Emotional Story Flow */}
      <div className={`transition-opacity duration-1000 ${isEntered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {/* Section 01: I Know */}
        <CinematicHero />

        {/* Section 02: The Realization */}
        <RealizationSection />

        {/* Section 03: This Isn't An Excuse */}
        <ExcuseSection />

        {/* Section 04: Our Memories */}
        <MemoryGallery />

        {/* Section 05: The Apology */}
        <ApologySection />

        {/* Section 06: Things I Love About You (Constellation) */}
        <LoveConstellation />

        {/* Section 07: A Letter */}
        <LoveLetter />

        {/* Section 08: The Promise */}
        <PromiseSection />

        {/* Section 09: The Unexpected Surprise */}
        <SurpriseReveal />

        {/* Section 10: Final Question */}
        <FinalQuestion />
      </div>
    </main>
  );
}
