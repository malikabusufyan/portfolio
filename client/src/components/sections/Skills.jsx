import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

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
        <Reveal>
          <SectionHeading eyebrow="What I Work With" title="Skills" />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {Object.entries(grouped).map(([category, skills], i) => (
            <Reveal key={category} delay={Math.min(i, 4) * 0.08}>
              <div className="rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/90">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  {CATEGORY_LABELS[category] || category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill._id}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition hover:bg-indigo-100 hover:text-indigo-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
