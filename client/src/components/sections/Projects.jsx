import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

export default function Projects({ items }) {
  const [tab, setTab] = useState("software");
  const filtered = items.filter((p) => p.category === tab);

  return (
    <section
      id="projects"
      className="border-t border-gray-100 bg-gray-50/80 py-20 backdrop-blur-sm dark:border-gray-900 dark:bg-gray-900/50"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="What I've Built" title="Projects" />
        </Reveal>

        <div className="mb-8 flex justify-center gap-2">
          {["software", "academic"].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition ${
                tab === key
                  ? "text-white"
                  : "bg-white/90 text-gray-600 hover:text-indigo-600 dark:bg-gray-900/90 dark:text-gray-300"
              }`}
            >
              {tab === key && (
                <motion.span
                  layoutId="project-tab-pill"
                  className="absolute inset-0 rounded-full bg-indigo-600 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">{key === "software" ? "Software Projects" : "Academic Projects"}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <Reveal key={project._id} delay={Math.min(i, 5) * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/90">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

                  {project.techStack?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex gap-4">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        {project.category === "academic" ? "View report ↗" : "View code ↗"}
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        Live demo ↗
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No projects in this category yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
