export function Marquee() {
  const items = [
    "N8N AUTOMATION",
    "OPENAI API",
    "CLAUDE 3.5",
    "MAKE.COM",
    "ZAPIER GOLD",
    "PYTHON SCRIPTS"
  ];
  return (
    <div className="py-12 border-y border-outline-variant/5 bg-background-elevated/50 overflow-hidden marquee-container">
      <div className="marquee-content flex gap-24 items-center">
        {[...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="font-label-mono text-label-mono text-on-surface-variant/30 flex items-center gap-3">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
