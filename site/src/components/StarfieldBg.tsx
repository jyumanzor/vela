'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  peakOpacity: number;
  hasGlow: boolean;
}

export function StarfieldBg() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = [];
    for (let i = 0; i < 80; i++) {
      const isLarge = Math.random() < 0.15;
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: isLarge ? 3 : 2,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 8,
        peakOpacity: 0.2 + Math.random() * 0.5,
        hasGlow: isLarge,
      });
    }
    setStars(generated);
  }, []);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: '50%',
              background: 'var(--star-gold)',
              boxShadow: star.hasGlow
                ? '0 0 4px rgba(212, 168, 67, 0.6)'
                : 'none',
              animation: `starTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              opacity: 0,
              '--peak-opacity': star.peakOpacity,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: var(--peak-opacity, 0.4); }
        }
      `}</style>
    </>
  );
}
