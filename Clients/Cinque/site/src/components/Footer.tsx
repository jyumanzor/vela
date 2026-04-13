export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--patent-soft)" }}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-3 text-center">
        <p className="font-display text-lg tracking-[0.15em] text-parchment font-light">
          CINQUE
        </p>
        <p className="font-script text-sm text-dust">
          Shot on 35mm film
        </p>
        <p className="font-body text-xs text-whisper mt-2">
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
