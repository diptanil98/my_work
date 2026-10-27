"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Palette: soft champagne, faint rose, ivory
    const colors = [
      "rgba(232, 213, 181, ", // champagne
      "rgba(224, 82, 99, ",   // rose
      "rgba(248, 247, 244, ",  // ivory
    ];

    // Number of particles adapted to screen size
    const particleCount = Math.min(55, Math.floor((width * height) / 25000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const maxOp = Math.random() * 0.4 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1, // gently rising
        opacity: Math.random() * maxOp,
        maxOpacity: maxOp,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let isDocumentVisible = true;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = () => {
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Subtle shimmer / breathing
        p.opacity += p.pulseSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.05) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Wrap around borders
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color === colors[1] ? "rgba(224, 82, 99, 0.5)" : "rgba(232, 213, 181, 0.4)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
