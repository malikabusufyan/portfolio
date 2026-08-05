import SectionHeading from "../SectionHeading";

const CATEGORY_LABELS = {
  Languages: "Languages",
  "Frameworks/Libraries": "Frameworks & Libraries",
  Tools: "Tools",
  CAD: "Computer Aided Design",
  CAE: "Computer Aided Engineering",
  Interpersonal: "Interpersonal",
};

export default function Skills({ items }) {
  const grouped = items.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="What I Work With" title="Skills" />

        <div className="grid gap-6 sm:grid-cols-2">
          {Object.entries(grouped).map(([category, skills]) => (
            <div
              key={category}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                {CATEGORY_LABELS[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill._id}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
