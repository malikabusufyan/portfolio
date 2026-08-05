export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 text-center dark:border-gray-900">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Abu Sufyan Malik. Built with the MERN stack.
      </p>
      <div className="mt-2 flex justify-center gap-4 text-sm">
        <a href="mailto:malikabusufyan@gmail.com" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
          malikabusufyan@gmail.com
        </a>
        <a href="tel:+17737546406" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
          +1 773 754 6406
        </a>
      </div>
    </footer>
  );
}
