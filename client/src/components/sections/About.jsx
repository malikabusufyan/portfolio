import SectionHeading from "../SectionHeading";

export default function About() {
  return (
    <section id="about" className="border-t border-gray-100 bg-gray-50 py-20 dark:border-gray-900 dark:bg-gray-900/40">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="About Me" title="Profile Summary" />
        <p className="text-center text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          I have worked as a web developer, possessing 2 years of experience as an Assistant System
          Engineer and ML Data Associate. Proficient in HTML, CSS, JavaScript, Python, DBMS (SQL, MySQL,
          MongoDB), Node.js, and React.js. I also have a year of experience in Computer Aided Design.
          I'm a strong advocate of Agile principles, adept at problem-solving, meticulous documentation,
          and continuous learning — and skilled at fostering cross-functional collaboration for enhanced
          project cohesion.
        </p>
      </div>
    </section>
  );
}
