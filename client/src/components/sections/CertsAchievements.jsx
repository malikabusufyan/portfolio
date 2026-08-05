import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

export default function CertsAchievements({ certifications, achievements }) {
  return (
    <section className="border-t border-gray-100 bg-gray-50/80 py-20 backdrop-blur-sm dark:border-gray-900 dark:bg-gray-900/50">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading eyebrow="Learning" title="Certifications" />
          </Reveal>
          <div className="space-y-5">
            {certifications.map((cert, i) => (
              <Reveal key={cert._id} delay={Math.min(i, 4) * 0.08}>
                <div className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/90">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                  {cert.issuer && <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>}
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
                    {cert.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <SectionHeading eyebrow="Recognition" title="Achievements" />
          </Reveal>
          <ul className="space-y-3">
            {achievements.map((a, i) => (
              <Reveal key={a._id} delay={Math.min(i, 6) * 0.05}>
                <li className="flex gap-3 rounded-xl border border-gray-200 bg-white/90 p-4 text-sm text-gray-700 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/90 dark:text-gray-200">
                  <span className="mt-0.5 text-indigo-600 dark:text-indigo-400">★</span>
                  <span>{a.text}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
