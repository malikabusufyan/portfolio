import SectionHeading from "../SectionHeading";

export default function CertsAchievements({ certifications, achievements }) {
  return (
    <section className="border-t border-gray-100 bg-gray-50 py-20 dark:border-gray-900 dark:bg-gray-900/40">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Learning" title="Certifications" />
          <div className="space-y-5">
            {certifications.map((cert) => (
              <div
                key={cert._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                {cert.issuer && <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>}
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
                  {cert.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Recognition" title="Achievements" />
          <ul className="space-y-3">
            {achievements.map((a) => (
              <li
                key={a._id}
                className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
              >
                <span className="mt-0.5 text-indigo-600 dark:text-indigo-400">★</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
