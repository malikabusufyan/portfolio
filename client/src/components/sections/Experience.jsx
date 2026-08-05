import SectionHeading from "../SectionHeading";

export default function Experience({ items }) {
  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Career" title="Work Experience" />

        <div className="space-y-8">
          {items.map((item) => (
            <article
              key={item._id}
              className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
                {item.logo ? (
                  <img src={item.logo} alt={item.company} className="h-full w-full object-contain p-1.5" />
                ) : (
                  <span className="text-lg font-semibold text-gray-400">
                    {item.company?.[0] ?? "?"}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.role}</h3>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {item.startDate} &ndash; {item.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                {item.bullets?.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
