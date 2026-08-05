import SectionHeading from "../SectionHeading";

export default function Education({ items }) {
  return (
    <section id="education" className="border-t border-gray-100 bg-gray-50 py-20 dark:border-gray-900 dark:bg-gray-900/40">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Academics" title="Education" />

        <div className="space-y-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
                {item.logo ? (
                  <img src={item.logo} alt={item.institution} className="h-full w-full object-contain p-1" />
                ) : (
                  <span className="text-base font-semibold text-gray-400">{item.institution?.[0]}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.degree}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.duration}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.institution}</p>
                {item.grade && (
                  <p className="mt-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    Grade: {item.grade}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
