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
    <div
      className="genie-env-container"
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
      }}
    >
      {/* Background Aura */}
      <div className="genie-env-bg-aura" />

      {/* Spout Mist Glow */}
      <div className="genie-env-spout-mist" />

      {/* Ground ripple rings */}
      <div className="lamp-ground-rings">
        <span className="ring-inner" />
      </div>

      {/* Central ground glow */}
      <div className="lamp-ground-glow" />

      {/* Sparkles overlay */}
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
  );
};
