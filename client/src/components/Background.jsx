const CIRCUIT_SVG = `
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <g fill='none' stroke='#6366f1' stroke-width='1.5'>
    <path d='M0 40 H60 V100 H140 V40 H200' />
    <path d='M20 0 V30 H90 V200' />
    <path d='M160 0 V70 H200' />
    <path d='M0 150 H50 V200' />
    <path d='M120 120 H200' />
    <path d='M0 180 H30' />
  </g>
  <g fill='#6366f1'>
    <circle cx='60' cy='40' r='3' />
    <circle cx='60' cy='100' r='3' />
    <circle cx='140' cy='100' r='3' />
    <circle cx='140' cy='40' r='3' />
    <circle cx='20' cy='30' r='3' />
    <circle cx='90' cy='30' r='3' />
    <circle cx='160' cy='70' r='3' />
    <circle cx='50' cy='150' r='3' />
    <circle cx='120' cy='120' r='3' />
  </g>
  <rect x='85' y='150' width='24' height='24' rx='3' fill='none' stroke='#6366f1' stroke-width='1.5' />
  <g fill='#6366f1'>
    <rect x='90' y='144' width='3' height='6' />
    <rect x='101' y='144' width='3' height='6' />
    <rect x='90' y='180' width='3' height='6' />
    <rect x='101' y='180' width='3' height='6' />
  </g>
</svg>
`.trim();

const CIRCUIT_URL = `url("data:image/svg+xml,${encodeURIComponent(CIRCUIT_SVG)}")`;

const PULSES = [
  { top: "14%", left: "22%", delay: "0s", color: "bg-indigo-500" },
  { top: "38%", left: "78%", delay: "0.6s", color: "bg-emerald-500" },
  { top: "68%", left: "12%", delay: "1.1s", color: "bg-indigo-500" },
  { top: "82%", left: "62%", delay: "1.7s", color: "bg-emerald-500" },
];

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* circuit-board trace pattern, tiled and faded toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.14]"
        style={{
          backgroundImage: CIRCUIT_URL,
          backgroundSize: "200px 200px",
          maskImage: "radial-gradient(ellipse 85% 65% at 50% 0%, black 35%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 0%, black 35%, transparent 90%)",
        }}
      />

      {/* blinking "signal" nodes for a live-circuit feel */}
      {PULSES.map((p, i) => (
        <span
          key={i}
          className={`absolute h-1.5 w-1.5 animate-pulse rounded-full ${p.color} opacity-70`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay, animationDuration: "2.5s" }}
        />
      ))}

      {/* soft, muted color wash for depth */}
      <div className="animate-drift absolute -left-40 -top-40 h-136 w-136 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-600/10" />
      <div className="animate-drift-slow absolute -right-40 top-1/3 h-120 w-120 rounded-full bg-slate-300/25 blur-3xl dark:bg-slate-600/10" />
    </div>
  );
}
