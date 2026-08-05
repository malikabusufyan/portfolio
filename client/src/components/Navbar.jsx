import { useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur dark:border-gray-800/80 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          Abu Sufyan Malik
        </a>

        <ul className="hidden gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-600 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 md:hidden dark:border-gray-700 dark:text-gray-200"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-gray-200 px-6 pb-4 md:hidden dark:border-gray-800">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
