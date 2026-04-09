export function Footer() {
  return (
    <footer
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        paddingBottom: 80,
        gap: 8,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: 'var(--constellation)',
          textTransform: 'uppercase',
        }}
      >
        VELA
      </span>
      <span
        style={{
          fontFamily: 'var(--font-instrument), serif',
          fontSize: 14,
          fontStyle: 'italic',
          color: 'var(--dusk)',
        }}
      >
        Charted, not guessed.
      </span>
    </footer>
  );
}
