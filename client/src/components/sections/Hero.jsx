const SOCIALS = [
  { label: "GitHub", href: "https://github.com/malikabusufyan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abusufyanmalik/" },
  { label: "GrabCAD", href: "https://grabcad.com/abu.sufyan.malik-1" },
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 pb-20 pt-16 md:flex-row md:pt-24">
      <div className="flex-1 text-center md:text-left">
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Full Stack (MERN) Developer
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Hi, I&apos;m Abu Sufyan Malik
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-600 md:mx-0 dark:text-gray-300">
          Web developer with experience as an Assistant System Engineer and ML Data Associate, building
          with HTML, CSS, JavaScript, Python, Node.js, React, and MongoDB. I also bring a year of
          Computer Aided Design experience and a strong habit of clean, well-documented, Agile work.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
          <a
            href="#contact"
            className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
          >
            View projects
          </a>
        </div>

        <div className="mt-6 flex justify-center gap-5 md:justify-start">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-gray-500 underline-offset-4 hover:text-indigo-600 hover:underline dark:text-gray-400 dark:hover:text-indigo-400"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="shrink-0">
        <img
          src="/images/profile.jpg"
          alt="Abu Sufyan Malik"
          className="h-48 w-48 rounded-full object-cover ring-4 ring-white shadow-xl sm:h-60 sm:w-60 dark:ring-gray-800"
        />
      </div>
    </section>
  );
}
