export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-drift absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-600/20" />
      <div className="animate-drift-slow absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-300/30 blur-3xl dark:bg-fuchsia-600/15" />
      <div className="animate-drift absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-300/30 blur-3xl dark:bg-sky-600/15" />
    </div>
  );
}
