import SectionHeading from "../SectionHeading";

export default function Publications({ items }) {
  if (items.length === 0) return null;

  return (
    <section id="publications" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Research" title="Publications" />

        <div className="space-y-5">
          {items.map((pub) => (
            <div
              key={pub._id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{pub.title}</h3>
              {pub.journal && (
                <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">{pub.journal}</p>
              )}
              {pub.description && (
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{pub.description}</p>
              )}
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Read paper ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
