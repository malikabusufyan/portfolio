export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
    </div>
  );
}
