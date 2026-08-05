import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const CARDS = [
  { key: "experience", label: "Experience entries", to: "/admin/experience" },
  { key: "education", label: "Education entries", to: "/admin/education" },
  { key: "skills", label: "Skills", to: "/admin/skills" },
  { key: "projects", label: "Projects", to: "/admin/projects" },
  { key: "messages", label: "Unread messages", to: "/admin/messages" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    async function load() {
      const [experience, education, skills, projects, messages] = await Promise.all([
        api.get("/experience"),
        api.get("/education"),
        api.get("/skills"),
        api.get("/projects"),
        api.get("/messages"),
      ]);
      setCounts({
        experience: experience.data.length,
        education: education.data.length,
        skills: skills.data.length,
        projects: projects.data.length,
        messages: messages.data.filter((m) => !m.read).length,
      });
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {CARDS.map((card) => (
          <Link
            key={card.key}
            to={card.to}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {counts[card.key] ?? "…"}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
