'use client';

interface ConstellationDividerProps {
  brightIndices?: number[];
}

export function ConstellationDivider({ brightIndices = [] }: ConstellationDividerProps) {
  const dotCount = 5;
  const dotSpacing = 24;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        padding: '32px 0',
        width: '100%',
      }}
    >
      {/* Left gradient line */}
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(to right, transparent, var(--stardust))',
        }}
      />

      {/* Dots with connectors */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {Array.from({ length: dotCount }).map((_, i) => {
          const isBright = brightIndices.includes(i);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: isBright ? 6 : 4,
                  height: isBright ? 6 : 4,
                  borderRadius: '50%',
                  background: isBright ? 'var(--star-gold)' : 'var(--constellation)',
                  boxShadow: isBright
                    ? '0 0 8px rgba(212, 168, 67, 0.6)'
                    : 'none',
                  flexShrink: 0,
                }}
              />
              {i < dotCount - 1 && (
                <div
                  style={{
                    width: dotSpacing,
                    height: 1,
                    background: 'var(--stardust)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Right gradient line */}
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(to left, transparent, var(--stardust))',
        }}
      />
    </div>
  );
}
