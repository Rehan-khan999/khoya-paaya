import React, { useEffect, useState, useMemo } from "react";

/**
 * GenieLampEnvironment - Magical cosmic effects around the genie lamp.
 * Pure CSS/HTML overlay. Does NOT touch the lamp in any way.
 * pointer-events: none on everything.
 */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  opacity: number;
}

const PARTICLE_COLORS = ["#ffffff", "#22d3ee", "#2dd4bf", "#fef3c7"];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // Cone shape: narrower at bottom (spout area), wider at top
    x: 30 + Math.random() * 220,
    y: 20 + Math.random() * 200,
    size: 1.5 + Math.random() * 3.5,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 6,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    opacity: 0.4 + Math.random() * 0.6,
  }));
}

export const GenieLampEnvironment: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const particles = useMemo(() => generateParticles(45), []);

  useEffect(() => {
    const handleEmerged = () => setVisible(false);
    const handleHidden = () => setVisible(true);
    window.addEventListener("genie-emerged", handleEmerged);
    window.addEventListener("genie-hidden", handleHidden);
    return () => {
      window.removeEventListener("genie-emerged", handleEmerged);
      window.removeEventListener("genie-hidden", handleHidden);
    };
  }, []);

  return (
    <div
      className="genie-env-container"
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "340px",
        height: "360px",
        pointerEvents: "none",
        zIndex: 4,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* EFFECT 4 — Background Aura */}
      <div className="genie-env-bg-aura" />

      {/* EFFECT 2 — Floating Cosmic Sparkles */}
      <div className="genie-env-sparkle-field">
        {particles.map((p) => (
          <div
            key={p.id}
            className="genie-env-sparkle"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--sparkle-opacity": p.opacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* EFFECT 3 — Spout Mist Glow */}
      <div className="genie-env-spout-mist" />

      {/* EFFECT 1 — Magic Ground Ring */}
      <div className="genie-env-ground-ring">
        <div className="genie-env-ring-inner" />
        <div className="genie-env-ring-outer" />
      </div>
    </div>
  );
};
