import React, { useEffect, useState } from "react";

// Sparkles scattered around upper area of the environment
const SPARKLES = [
  { top: '15%', left: '55%', tx: '10px',  ty: '-45px', duration: '2.8s', delay: '0s',   size: '4px', color: '#fff' },
  { top: '25%', left: '70%', tx: '20px',  ty: '-40px', duration: '3.2s', delay: '0.5s', size: '3px', color: '#ffe066' },
  { top: '40%', left: '80%', tx: '25px',  ty: '-35px', duration: '2.5s', delay: '1s',   size: '5px', color: '#fff' },
  { top: '20%', left: '40%', tx: '-15px', ty: '-50px', duration: '3.5s', delay: '1.5s', size: '3px', color: '#ffe066' },
  { top: '35%', left: '25%', tx: '-20px', ty: '-40px', duration: '2.9s', delay: '0.8s', size: '4px', color: '#aff' },
  { top: '10%', left: '60%', tx: '15px',  ty: '-55px', duration: '3.1s', delay: '0.3s', size: '3px', color: '#fff' },
  { top: '30%', left: '85%', tx: '20px',  ty: '-30px', duration: '2.6s', delay: '2s',   size: '5px', color: '#ffe066' },
  { top: '45%', left: '45%', tx: '-10px', ty: '-45px', duration: '3.4s', delay: '1.2s', size: '3px', color: '#fff' },
  // Extra sparkles rising from ring area (bottom of container)
  { top: '80%', left: '30%', tx: '-8px',  ty: '-60px', duration: '2.4s', delay: '0.2s', size: '4px', color: '#00f0dc' },
  { top: '82%', left: '38%', tx: '12px',  ty: '-70px', duration: '2.7s', delay: '0.7s', size: '3px', color: '#fff' },
  { top: '85%', left: '22%', tx: '-15px', ty: '-65px', duration: '3.0s', delay: '1.1s', size: '3px', color: '#ffe066' },
  { top: '78%', left: '45%', tx: '8px',   ty: '-55px', duration: '2.3s', delay: '1.8s', size: '4px', color: '#00f0dc' },
  { top: '83%', left: '15%', tx: '-10px', ty: '-50px', duration: '2.9s', delay: '0.4s', size: '3px', color: '#fff' },
  { top: '80%', left: '52%', tx: '18px',  ty: '-60px', duration: '3.3s', delay: '0.9s', size: '3px', color: '#aff' },
];

export const GenieLampEnvironment: React.FC = () => {
  const [visible, setVisible] = useState(true);

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
    <>
      <style>{`
        @keyframes ringPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scaleX(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scaleX(1.06); }
        }
        @keyframes centerGlowPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes sparkleFloat {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.4); }
          25%  { opacity: 1; }
          75%  { opacity: 0.7; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1.3); }
        }
        .lamp-sparkle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: sparkleFloat var(--duration, 3s) ease-in-out infinite var(--delay, 0s);
          opacity: 0;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          width: "420px",
          height: "420px",
          pointerEvents: "none",
          zIndex: 4,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
          overflow: "visible",
        }}
      >
        {/* GROUND PORTAL RINGS — restored to working position */}
        <div
          style={{
            position: "absolute",
            left: "35%",
            top: "95%",
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        >
          {/* Outer ring */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "220px",
            height: "55px",
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 1)",
            boxShadow: `
              0 0 8px 3px rgba(255, 255, 255, 1),
              0 0 20px 8px rgba(220, 240, 255, 0.85),
              0 0 40px 14px rgba(200, 230, 255, 0.5),
              inset 0 0 14px 5px rgba(255, 255, 255, 0.3)
            `,
            animation: "ringPulse 3s ease-in-out infinite 0s",
          }} />

          {/* Middle ring */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "150px",
            height: "37px",
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 1)",
            boxShadow: `
              0 0 8px 3px rgba(255, 255, 255, 1),
              0 0 22px 8px rgba(220, 240, 255, 0.9),
              0 0 42px 14px rgba(200, 230, 255, 0.55),
              inset 0 0 12px 4px rgba(255, 255, 255, 0.3)
            `,
            animation: "ringPulse 3s ease-in-out infinite 0.6s",
          }} />

          {/* Inner ring */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80px",
            height: "20px",
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 1)",
            boxShadow: `
              0 0 10px 4px rgba(255, 255, 255, 1),
              0 0 25px 10px rgba(220, 240, 255, 0.95),
              0 0 50px 16px rgba(200, 230, 255, 0.6),
              inset 0 0 10px 4px rgba(255, 255, 255, 0.35)
            `,
            animation: "ringPulse 3s ease-in-out infinite 1.2s",
          }} />

          {/* Center glow fill */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "140px",
            height: "35px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(220,240,255,0.5) 45%, transparent 75%)",
            animation: "centerGlowPulse 2.5s ease-in-out infinite alternate",
          }} />
        </div>

        {/* Sparkles — scattered + rising from ring area */}
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="lamp-sparkle"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              background: s.color,
              boxShadow: `0 0 8px 3px ${s.color}`,
              '--tx': s.tx,
              '--ty': s.ty,
              '--duration': s.duration,
              '--delay': s.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
};
