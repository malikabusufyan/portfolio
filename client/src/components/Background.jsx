export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* subtle dot-grid texture for a technical, professional feel */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(rgb(99 102 241 / 0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%)",
        }}
      />

      {/* soft, muted color wash — restrained rather than playful */}
      <div className="animate-drift absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-indigo-200/35 blur-3xl dark:bg-indigo-600/10" />
      <div className="animate-drift-slow absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-slate-300/30 blur-3xl dark:bg-slate-600/10" />
      <div className="animate-drift absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-indigo-100/40 blur-3xl dark:bg-indigo-900/10" />
    </div>
  );
}
