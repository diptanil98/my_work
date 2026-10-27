"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/sound";
import { siteConfig } from "@/data/config";

interface AudioToggleProps {
  isPlaying?: boolean;
  onToggle?: (playing: boolean) => void;
}

export default function AudioToggle({ isPlaying: controlledPlaying, onToggle }: AudioToggleProps) {
  const [internalPlaying, setInternalPlaying] = useState(false);
  const isPlaying = controlledPlaying !== undefined ? controlledPlaying : internalPlaying;

  const handleToggle = () => {
    const nextState = !isPlaying;
    setInternalPlaying(nextState);
    soundManager.setMuted(!nextState, siteConfig.audio.src);
    if (onToggle) onToggle(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
      className="fixed top-6 right-6 z-40 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill text-xs text-[#F8F7F4]/70 hover:text-[#F8F7F4] hover:border-[#E8D5B5]/30 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#E8D5B5]/50"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E05263] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E05263]" />
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A7A5AE]/40" />
        )}
      </span>

      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#E8D5B5] transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-[#A7A5AE] transition-transform duration-300 group-hover:scale-110" />
      )}

      <span className="tracking-widest uppercase text-[10px] font-medium hidden sm:inline">
        {isPlaying ? "Sound On" : "Sound"}
      </span>
    </button>
  );
}
