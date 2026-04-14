export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--patent-soft)" }}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-3 text-center">
        <p
          className="text-lg"
          style={{ fontFamily: "var(--font-logo), serif", color: "var(--maroon)", letterSpacing: "-0.02em" }}
        >
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
