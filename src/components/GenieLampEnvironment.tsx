import React, { useEffect, useState } from "react";

const SPARKLES = [
  { top: '20%', left: '60%', tx: '15px', ty: '-50px', duration: '2.8s', delay: '0s',   size: '4px', color: '#fff' },
  { top: '35%', left: '75%', tx: '25px', ty: '-40px', duration: '3.2s', delay: '0.5s', size: '3px', color: '#ffe066' },
  { top: '50%', left: '30%', tx: '-20px',ty: '-55px', duration: '2.5s', delay: '1s',   size: '5px', color: '#fff' },
  { top: '25%', left: '45%', tx: '10px', ty: '-45px', duration: '3.5s', delay: '1.5s', size: '3px', color: '#ffe066' },
  { top: '60%', left: '65%', tx: '30px', ty: '-35px', duration: '2.9s', delay: '0.8s', size: '4px', color: '#aff' },
  { top: '40%', left: '20%', tx: '-15px',ty: '-60px', duration: '3.1s', delay: '0.3s', size: '3px', color: '#fff' },
  { top: '15%', left: '80%', tx: '20px', ty: '-30px', duration: '2.6s', delay: '2s',   size: '5px', color: '#ffe066' },
  { top: '55%', left: '50%', tx: '-10px',ty: '-50px', duration: '3.4s', delay: '1.2s', size: '3px', color: '#fff' },
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
          0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scaleX(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scaleX(1.05); }
        }
        @keyframes centerGlowPulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes sparkleFloat {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.5); }
          30%  { opacity: 1; }
          70%  { opacity: 0.8; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1.2); }
        }
        .lamp-sparkle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: sparkleFloat var(--duration, 3s) ease-in-out infinite var(--delay, 0s);
          opacity: 0;
        }
      `}</style>

      {/* 
        This wrapper is fixed, same as before — DO NOT change bottom/right/width/height.
        All ring positioning is relative to this container.
        The lamp 3D model sits at roughly bottom-left of this container.
        Rings are anchored to where the lamp base sits: ~35% from left, ~88% from top.
      */}
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
        {/* 
          GROUND PORTAL RINGS
          left: center of lamp base horizontally
          top: bottom feet of lamp
        */}
        <div
          style={{
            position: "absolute",
            left: "35%",   /* ← tweak if rings are left/right of lamp base */
            top: "95%",    /* ← tweak if rings are above/below lamp feet */
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
            border: "1.5px solid rgba(0, 230, 210, 0.7)",
            boxShadow: "0 0 12px 4px rgba(0, 230, 210, 0.35), inset 0 0 8px 2px rgba(0, 230, 210, 0.1)",
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
            border: "1.5px solid rgba(0, 230, 210, 0.8)",
            boxShadow: "0 0 10px 3px rgba(0, 230, 210, 0.4), inset 0 0 6px 2px rgba(0, 230, 210, 0.15)",
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
            border: "1.5px solid rgba(0, 230, 210, 0.9)",
            boxShadow: "0 0 10px 4px rgba(0, 230, 210, 0.5), inset 0 0 5px 1px rgba(0, 230, 210, 0.2)",
            animation: "ringPulse 3s ease-in-out infinite 1.2s",
          }} />

          {/* Center glow fill */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "130px",
            height: "32px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0,230,210,0.45) 0%, rgba(0,200,185,0.2) 50%, transparent 75%)",
            animation: "centerGlowPulse 2.5s ease-in-out infinite alternate",
          }} />
        </div>

        {/* Sparkles */}
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
              boxShadow: `0 0 6px 2px ${s.color}`,
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
