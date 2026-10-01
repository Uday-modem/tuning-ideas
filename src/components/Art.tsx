import React from 'react';

interface Props {
  seed: number;
}

/**
 * Generative dot-matrix artwork for work cards (no stock photos needed, tinted by --accent).
 * Each seed gives a different wave pattern.
 */
const Art: React.FC<Props> = ({ seed }) => {
  const cols = 30, rows = 20;
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = 0.5 + 0.5 * Math.sin(c * (0.28 + seed * 0.02) + r * (0.34 - seed * 0.01) + seed * 1.7);
      const w = 0.5 + 0.5 * Math.cos(c * 0.15 - r * 0.22 + seed);
      const rad = 0.6 + 3.6 * v * w;
      dots.push(
        <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 20 + 10} r={rad} fill="rgb(var(--dot))" opacity={0.15 + 0.8 * v * w} />
      );
    }
  }
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
      <defs>
        <radialGradient id={`g${seed}`} cx="65%" cy="45%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </radialGradient>
      </defs>
      {dots}
      <rect width="600" height="400" fill={`url(#g${seed})`} />
    </svg>
  );
};

export default Art;
