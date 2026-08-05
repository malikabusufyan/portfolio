import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const HIGHLIGHTS = [
  { label: "Full-stack (MERN)", detail: "React, Node.js, Express, MongoDB" },
  { label: "2 yrs in production", detail: "APIs, data pipelines, real users" },
  { label: "Engineering roots", detail: "CAD/CAE before code" },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-gray-100 bg-gray-50/80 py-20 backdrop-blur-sm dark:border-gray-900 dark:bg-gray-900/50"
    >
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionHeading eyebrow="About Me" title="From CAD Models to Production Code" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            <p>
              My path here wasn't a straight line. It started in mechanical engineering, designing
              patient-specific implants from CT scans at Conformis, then wound through a year training
              Amazon's Alexa AI as a Machine Learning Data Associate — work that meant getting comfortable
              with data at scale long before I wrote my first API.
            </p>
            <p>
              That combination turned out to be a good foundation for software: at Tata Consultancy
              Services I built and optimized the Node.js APIs behind live insurance policy workflows,
              working across teams to ship things that held up under real usage. These days I build with
              React, Node.js, Express, and MongoDB — the same stack this site runs on — and I'm rounding
              it out with a Master's in Information Systems Management. I like problems that reward both
              precision and curiosity, and I document my work the way I'd want to inherit it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className="rounded-xl border border-gray-200 bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80"
              >
                <p className="font-heading text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {h.label}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{h.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
